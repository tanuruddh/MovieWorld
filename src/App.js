import './App.css';
import Navbar from './Components/Navbar';
import Search from './Components/Search';
import NumResults from './Components/NumResults';
import Box from './Components/Box';
import Main from './Components/Main';
import MovieList from './Components/MovieList';
import MovieDetail from './Components/MovieDetail';
import { useState } from 'react';
import WatchedSummary from './Components/WatchedSummary';
import WatchedMoviesList from './Components/WatchedMoviesList';
import Loder from './Components/Loder';
import ErrorMessage from './Components/ErrorMessage';
import { useMovies } from './Components/useMovies';

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState('');
  const [watched, setWatched] = useState([]);
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => id === selectedId ? null : id);
  }

  function handleAddWatched(watchedMovie) {
    setWatched((watched) => [...watched, watchedMovie]);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  return (
    <>
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <NumResults query={movies.length} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loder />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ?
            <MovieDetail selectedId={selectedId} onAddWatched={handleAddWatched} onCloseMovie={handleCloseMovie} watched={watched} />
            : <>
              <WatchedSummary watched={watched} />
              {/* <WatchedMovie /> */}
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatchedMovie} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}

export default App;
