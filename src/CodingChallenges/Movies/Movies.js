import React, { useEffect, useRef } from "react";
import StarRating from "./StarRating";
import "./Movies.css";
import { useState } from "react";
// import useMovies from ".";
import { useMovies } from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";
import { useKey } from "./usekey";
// import usekey from "./usekey";
// import usekey from "./usekey";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const average = (arr) => {
  let validValues = 0;
  let total = 0;
  let previousValidValue = 0;

  for (let value of arr) {
    if (!isNaN(value) && value > 0) {
      // If value is valid and greater than 0, use it as a valid value
      previousValidValue = value;
      total += value;
      validValues++;
    } else if (validValues > 0) {
      // If value is NaN or 0, treat it as the last valid runtime
      total += previousValidValue;
      validValues++;
    }
  }

  return validValues > 0 ? total / validValues : 0;
};

const KEY = "54cf619f";
const Movies = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(false);

  const { movies, isLoading, error } = useMovies(query, handleClose);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  function handleSelect(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleClose() {
    setSelectedId(null);
  }
  function handleWatch(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem('watched',JSON.stringify([...watched,movie]))
  }
  function handleDeleteWatchMovie(id) {
    setWatched((watched) => watched.filter((el) => el.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />} {/* Show loader while fetching */}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MoviesList onSelectMovie={handleSelect}>
              {movies?.map((movie) => (
                <MoviesDetails
                  onSelectMovie={handleSelect}
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}
            </MoviesList>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <SelectMovie
              selectedId={selectedId}
              onClose={handleClose}
              onAddWatch={handleWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummry watched={watched} />
              <WatchMoviesList
                watched={watched}
                onDelete={handleDeleteWatchMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

function SearchBar({ query, setQuery }) {
  const myRef = useRef(null);

    useKey('Enter',()=>{
      if (document.activeElement === myRef.current) return;
      myRef.current.focus();
        setQuery(" ");
    })

    // const el=document.querySelector('.search')

    // return el.focus()
   
  return (
    <input
      ref={myRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Loader() {
  return <p className="loader">Loading....</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚨</span>
      {message}
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResult() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MoviesList({ children }) {
  return <ul className="list list-movies">{children}</ul>;
}
function MoviesDetails({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {" "}
      {/* onSelectMovie with imdbID */}
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
          <button
            className="btn-delete"
            onClick={() => onDelete(movie.imdbID)} // Trigger the delete function when clicked
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

function SelectMovie({ selectedId, onClose, onAddWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.find((movie) => movie.imdbID === selectedId);
  const UserRatingWatched = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating; // Check if the movie is already in the watched list
  const CountRef = useRef(0);
  useEffect(() => {
    if (userRating) CountRef.current++;
  }, [userRating]);
  // Check if the movie is already in the watched list
  // const watchUserRating=watched.
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

  useEffect(() => {
    async function getSelectMovie() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setMovie(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    getSelectMovie();
  }, [selectedId]);

  function handleAdd() {
    const runtimeInMinutes = Number(runtime.split(" ").at(0));
    const convertedRuntime =
      !isNaN(runtimeInMinutes) && runtimeInMinutes > 0 ? runtimeInMinutes : 0;
    const validImdbRating = isNaN(imdbRating) ? 0 : Number(imdbRating);

    // New movie object to be added to the watched list
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: validImdbRating,
      runtime: convertedRuntime,
      userRating,
      countRating: CountRef.current,
    };

    onAddWatch(newMovie); // Add to watched list
    onClose(); // Close the modal
  }
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       onClose();
  //     }
  //   }

  //   // Add the event listener for the 'keydown' event
  //   document.addEventListener("keydown", callback);

  //   // Clean up the event listener when the component unmounts or onClose changes
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onClose]); // Dependency array ensures the effect runs when onClose changes
useKey("Escape",onClose)
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "Usepopcone ";
    };
  }, [title]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`poster of movie ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
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
                    <button onClick={handleAdd} className="btn-add">
                      +Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You have already rated this movie {UserRatingWatched} ⭐</p> // Message when the movie is already rated
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchSummry({ watched }) {
  // Ensure watched is always an array
  const safeWatched = Array.isArray(watched) ? watched : [];

  const avgImdbRating = average(
    safeWatched.map((movie) => movie?.imdbRating || 0)
  ).toFixed(2);
  const avgUserRating = average(
    safeWatched.map((movie) => movie?.userRating || 0)
  ).toFixed(2);
  const avgRuntime = average(
    safeWatched.map((movie) => movie?.runtime || 0)
  ).toFixed(0);

  const runtimeInHours = Math.floor(avgRuntime / 60);
  const runtimeInMinutes = avgRuntime % 60;
  const runtimeFormatted = `${
    runtimeInHours > 0 ? runtimeInHours + " hr " : ""
  }${runtimeInMinutes} min`;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        {/* Example: Display the poster of the first movie in the watched list */}
        {safeWatched.length > 0 && (
          <img src={safeWatched[0]?.Poster} alt={safeWatched[0]?.Title} />
        )}
        <p>{safeWatched.length > 0 ? safeWatched[0]?.Title : "No movies watched"}</p>
        <p>
          <span>#️⃣</span>
          <span>{safeWatched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtimeFormatted}</span>
        </p>
      </div>
    </div>
  );
}

export default Movies;
