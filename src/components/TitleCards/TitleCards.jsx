import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTFhNjUxMTQ3ZjJjNDZjNTA2MTgyNWJmMjRmNjQyYSIsIm5iZiI6MTcxOTE0NDg4Mi43MTM5NzYsInN1YiI6IjY2NzgxMTA3MzdjZGFmMTQ4MDNiMjQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o3EF9mxZC6XFc4MZIpA7Lx9RQcKg5G4ZuKCxwwj6X7M'
    }
  };
  


  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    const refCurrent = cardsRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("wheel", handleWheel);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="titlecards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.name} />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
