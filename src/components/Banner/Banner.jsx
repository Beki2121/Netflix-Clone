import { useState, useEffect } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState({}); // Initialize to null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const randomIndex = Math.floor(
          Math.random() * request.data.results.length
        );
        setMovie(request.data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setMovie({});
      }
    };

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.slice(0, n - 1) + "..." : string;
  };

  if (!movie) {
    return <div className="banner banner--loading">Loading banner...</div>;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center", 
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </div>
  );
}

export default Banner;