import { PrismicRichText } from '@prismicio/react';
import { RTNode } from '@prismicio/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';
import { formatDateString } from '../../Utils/formatDateString';

// import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const countWords = (string: string): number => {
    return string.split(' ').filter(word => word !== '').length;
  };

  const wordsCount = post.data.content.reduce((acc, content) => {
    const headingWordCount = countWords(content.heading);
    const bodyWordCount = content.body.reduce((wordCount, { text }) => {
      return wordCount + countWords(text);
    }, 0);
    const contentWordCount = headingWordCount + bodyWordCount;
    return acc + contentWordCount;
  }, 0);
  const humanReadingSpeedInWordsPerMinute = 200;
  const readTime = Math.ceil(wordsCount / humanReadingSpeedInWordsPerMinute);

  return (
    <>
      {post ? (
        <div className={styles.content}>
          <img src={post.data.banner.url} alt={post.data.title} />
          <div className={styles.main}>
            <h1>{post.data.title}</h1>
            <div className={styles.info}>
              <FiCalendar />
              <time>{formatDateString(post.first_publication_date)}</time>
              <FiUser /> <span>{post.data.author}</span>
              <FiClock /> <span>{readTime} min</span>
            </div>
            <article>
              {post.data.content.map(content => {
                return (
                  <>
                    <strong>{content.heading}</strong>
                    <PrismicRichText
                      field={content.body as unknown as RTNode}
                    />
                  </>
                );
              })}
            </article>
          </div>
        </div>
      ) : (
        <span>Carregando...</span>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getAllByType('posts');
  const paths = posts.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', slug.toString());
  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
  };

  return {
    props: { post },
  };
};
