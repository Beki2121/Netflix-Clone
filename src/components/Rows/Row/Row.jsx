import React, { useState, useEffect, useCallback } from "react";
import axios from "../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const fetchData = useCallback(async () => {
    try {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load movies.");
      setMovies([]);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = useCallback(
    (movie) => {
      setError(null);

      if (trailerUrl) {
        setTrailerUrl(""); // close if open
      } else {
        movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
          .then((url) => {
            if (url) {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            } else {
              setError(
                `Trailer not found for ${
                  movie?.name || movie?.title || movie?.original_name
                }`
              );
            }
          })
          .catch((err) => {
            console.error("Error fetching trailer:", err);
            setError(
              `Error finding trailer for "${movie?.title || "this movie"}"`
            );
          });
      }
    },
    [trailerUrl]
  );

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <div className={`row ${trailerUrl ? "blurred" : ""}`}>
        <h2>{title}</h2>

        {error && <div className="row__error">{error}</div>}

        <div className="row_posters">
          {movies?.map((movie) => {
            const imagePath = isLargeRow
              ? movie?.poster_path
              : movie?.backdrop_path;
            const imageUrl = imagePath
              ? `${base_url}${imagePath}`
              : "/fallback.jpg"; // optional fallback
            return (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={imageUrl}
                alt={movie?.title || movie?.name || "Untitled"}
              />
            );
          })}
        </div>
      </div>

      {/* Modal Trailer */}
      {trailerUrl && (
        <div className="modal">
          <div className="modal__content">
            <button className="modal__close" onClick={() => setTrailerUrl("")}>
              ✖
            </button>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </>
  );
};

export default Row;
