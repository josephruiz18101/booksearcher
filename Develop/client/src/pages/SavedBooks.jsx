import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Saved Books</h2>
      {data?.me?.savedBooks?.map((book) => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default SavedBooks;
