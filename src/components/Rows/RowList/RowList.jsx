import React from "react";
import Row from "../Row/Row";
import requests from "../../utils/requests";

function RowList() {
  const rows = [
    {
      title: "Popular Movies",
      url: requests.fetchNetflixOriginals,
      isLargeRow: true,
    },
    { title: "Trending Now", url: requests.fetchTrending },
    { title: "Action Movies", url: requests.fetchActionMovies },
    { title: "Top Rated", url: requests.fetchTopRated },
    { title: "Comedy Movies", url: requests.fetchComedyMovies },
    { title: "Horror Movies", url: requests.fetchHorrorMovies },
    { title: "Romance Movies", url: requests.fetchRomanceMovies },
    { title: "Documentaries", url: requests.fetchDocumentaries },
    { title: "TV Shows", url: requests.fetchTvShows },
  ];

  return (
    <div className="rowList">
      {rows.map((row, index) => (
        <Row
          key={index}
          title={row.title}
          fetchUrl={row.url}
          isLargeRow={row.isLargeRow || false}
        />
      ))}
    </div>
  );
}

export default RowList;
