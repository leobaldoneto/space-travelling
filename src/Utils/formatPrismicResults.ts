export default function formatPrismicResults ( prismicResults ) {
  return prismicResults.results.map(post => {
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
}
