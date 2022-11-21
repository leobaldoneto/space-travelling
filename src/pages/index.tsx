import { GetStaticProps } from 'next';
import { useState } from 'react';

import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import formatPrismicResults from '../Utils/formatPrismicResults';
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
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPageUrl, setNextPageUrl] = useState(postsPagination.next_page);

  const handleLoadMore = async event => {
    const nextPage = event.target.getAttribute('data-nextpage');
    const responseData = await (await fetch(nextPage)).json();
    const formattedResponseData = formatPrismicResults(responseData);
    const updatedPosts = [...posts, ...formattedResponseData];
    setPosts(updatedPosts);
    setNextPageUrl(formattedResponseData.next_page);
  };

  return (
    <div className={styles.content}>
      {posts.map(post => {
        return (
          <Link href={`/post/${post.uid}`} key={post.uid}>
            <a>
            <strong>{post.data.title}</strong>
            <p>{post.data.subtitle}</p>
            <div className={styles.metaData}>
              <FiCalendar />
                <time>{formatDateString(post.first_publication_date)}</time>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
          </a>
          </Link>
        );
      })}

      {nextPageUrl ? (
        <button
          type="button"
          className={styles.loadMore}
          onClick={e => handleLoadMore(e)}
          data-nextpage={nextPageUrl}
        >
          Carregar mais posts
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsPagination = await prismic.getByType('posts', {
    fetch: ['posts.title', 'posts.author', 'posts.subtitle'],
    pageSize: 5,
  });

  const formattedResults = formatPrismicResults(postsPagination);

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
