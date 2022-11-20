import { GetStaticProps } from 'next';

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

export default function Home() {
  return (
    <div className={styles.content}>
      <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.metaData}>
          <FiCalendar />
          <time>15 Mar 2021</time>
          <FiUser />
          <span>Joseph Oliveira</span>
        </div>
      </a>

      <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.metaData}>
          <FiCalendar />
          <time>15 Mar 2021</time>
          <FiUser />
          <span>Joseph Oliveira</span>
        </div>
      </a>

      <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.metaData}>
          <FiCalendar />
          <time>15 Mar 2021</time>
          <FiUser />
          <span>Joseph Oliveira</span>
        </div>
      </a>

      <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.metaData}>
          <FiCalendar />
          <time>15 Mar 2021</time>
          <FiUser />
          <span>Joseph Oliveira</span>
        </div>
      </a>

      <a>
        <strong>Como utilizar Hooks</strong>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.metaData}>
          <FiCalendar />
          <time>15 Mar 2021</time>
          <FiUser />
          <span>Joseph Oliveira</span>
        </div>
      </a>

      <button
        type="button"
        onClick={console.log('ok')}
        className={styles.loadMore}
      >
        Carregar mais posts
      </button>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
