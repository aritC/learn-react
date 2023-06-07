import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function usein then() catch() chain
  // function fetchMoviehandler() {
  //   fetch("https://swapi.dev/api/films")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       const transFormedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseData: movieData.release_date,
  //         };
  //       });
  //       setMovieList(transFormedMovies);
  //     });
  // }

  const fetchMoviehandler = useCallback(async () => {
    setisLoading(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      const transFormedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovieList(transFormedMovies);
    } catch (err) {
      setError(err.message);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviehandler();
  }, [fetchMoviehandler]);

  let content = <p>Found No Movies</p>;
  if (movieList.length > 0) {
    content = <MoviesList movies={movieList} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
