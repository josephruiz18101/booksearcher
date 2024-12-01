import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_BOOKS } from '../utils/queries';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data } = useQuery(SEARCH_BOOKS, {
    variables: { searchTerm },
    skip: !searchTerm, // Don't run the query until searchTerm is provided
  });

  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.searchTerm.value);
  };

  const handleSaveBook = async (bookId) => {
    try {
      await saveBook({ variables: { bookId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="searchTerm" placeholder="Search for books..." />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data?.books?.map((book) => (
          <div key={book.bookId}>
            <h3>{book.title}</h3>
            <button onClick={() => handleSaveBook(book.bookId)}>Save</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchBooks;
