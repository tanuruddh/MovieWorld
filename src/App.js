import './App.css';
import Navbar from './Componentes/Navbar';
import Search from './Componentes/Search';
import NumResults from './Componentes/NumResults';
import Box from './Componentes/Box';
import Main from './Componentes/Main';
import MovieList from './Componentes/MovieList';
import MovieDetail from './Componentes/MovieDetail';
import { useState } from 'react';
import WatchedSummary from './Componentes/WatchedSummary';
import WatchedMoviesList from './Componentes/WatchedMoviesList';
import Loder from './Componentes/Loder';
import ErrorMessage from './Componentes/ErrorMessage';
import { useMovies } from './Componentes/useMovies';

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
