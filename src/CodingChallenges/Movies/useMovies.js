import { useState, useEffect } from "react";

const KEY = "f84fc31d"; // OMDB API Key

export function useMovies(query,callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.()
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true); // Start loading
      setError(""); // Clear previous error

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error); // If OMDB returns an error message
        }

        setMovies(data.Search || []);
        setError(""); // Clear any previous error messages
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message); // Set the error message
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (query.length<3) {
      setMovies([]); // Clear movies if query is too short
      setError(""); // Reset any error
      setIsLoading(false); // Stop loading if query is short
      return;
    }

    fetchMovies();

    return () => {
      controller.abort(); // Cleanup abort controller on unmount or query change
    };
  }, [query]); // Runs when query changes

  return { movies, isLoading, error };
}
