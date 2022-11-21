import { PrismicRichText } from '@prismicio/react';
import { RTNode } from '@prismicio/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

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
  return (
    <>
      {post ? (
        <div className={styles.content}>
          <img src={post.data.banner.url} alt={post.data.title} />
          <div className={styles.main}>
            <h1>{post.data.title}</h1>
            <div className={styles.info}>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
              <FiUser /> <span>{post.data.author}</span>
              <FiClock /> <span>10 min</span>
            </div>
            <article>
              {post.data.content.map(content => {
                return (
                  <>
                    <strong>{content.heading}</strong>
                    <PrismicRichText
                      field={[content.body as unknown as RTNode]}
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
  // const prismic = getPrismicClient({});
  // const posts = await prismic.getByType('posts');

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const post = await prismic.getByUID('posts', slug.toString());

  return {
    props: { post },
  };
};
