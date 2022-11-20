import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const actualPagePosts = postsPagination.results;

  return (
    <div className={styles.content}>
      {actualPagePosts.map(post => {
        return (
          <a href={`/posts/${post.uid}`} key={post.uid}>
            <strong>{post.data.title}</strong>
            <p>{post.data.subtitle}</p>
            <div className={styles.metaData}>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
          </a>
        );
      })}

      <button type="button" className={styles.loadMore}>
        Carregar mais posts
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsPagination = await prismic.getByType('posts', {
    fetch: ['posts.title', 'posts.author', 'posts.subtitle'],
    pageSize: 5,
  });

  const formattedResults = postsPagination.results.map(post => {
    const formattedDate = new Date(
      post.first_publication_date
    ).toLocaleDateString('pt-BR', {
      dateStyle: 'medium',
    });
    return {
      ...post,
      first_publication_date: formattedDate,
    };
  });

  const formattedPostsPagination = {
    ...postsPagination,
    results: formattedResults,
  };

  return {
    props: {
      postsPagination: formattedPostsPagination,
    },
  };
};
