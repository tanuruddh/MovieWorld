import React, { useEffect, useState } from 'react'
import StarRating from './StarRating'
import Loder from './Loder';

const KEY = "f84fc31d";


const MovieDetail = ({ selectedId, onAddWatched, onCloseMovie, watched }) => {
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;



    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            // countRatingDecisions: countRef.current,
        };

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await res.json();
                // console.log(data);
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();



        },
        [selectedId]
    );
    useEffect(function () {
        if (!title) return;

        document.title = `Movie | ${title}`;

        return function () {
            document.title = `Movie World`;
        }
    }, [title])

    // console.log(movie);
    return (
        <div className="details">

            {
                isLoading ? <Loder /> :

                    <>
                        <header>
                            <button className="btn-back" onClick={onCloseMovie}>
                                &larr;
                            </button>
                            <img src={poster} alt={`Poster of ${movie} movie`} onClick={() => onAddWatched(movie)} />
                            <div className="details-overview">
                                <h2>{title}</h2>
                                <p>
                                    {released} &bull; {runtime}
                                </p>
                                <p>{genre}</p>
                                <p>
                                    <span>⭐️</span>
                                    {imdbRating} IMDb rating
                                </p>
                            </div>
                        </header>

                        {/* <p>{avgRating}</p> */}

                        <section>
                            <div className="rating">
                                {!isWatched ? (
                                    <>
                                        <StarRating
                                            maxRating={10}
                                            size={24}
                                            onSetRating={setUserRating}
                                        />
                                        {userRating > 0 && (
                                            <button className="btn-add" onClick={handleAdd}>
                                                + Add to list
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <p>
                                        You rated with movie {watchedUserRating} <span>⭐️</span>
                                    </p>
                                )}
                            </div>
                            <p>
                                <em>{plot}</em>
                            </p>
                            <p>Starring {actors}</p>
                            <p>Directed by {director}</p>
                        </section>
                    </>
            }
        </div>
    )
}

export default MovieDetail
