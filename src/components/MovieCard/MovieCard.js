import Title from "../Title/Title";
import { useState, useEffect } from "react";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import Image from "next/image";
import playIcon from "../../../public/assets/icons/play-icon.svg";
import plusIcon from "../../../public/assets/icons/plus-icon.svg";
import chevronIcon from "../../../public/assets/icons/chevron-icon.svg";

const MovieCard = ({ title, image, average, genres, id }) => {
  const [cardIsHovered, setCardIsHovered] = useState(false);
  const [videoId, setVideoId] = useState("");
  console.log(genres);

  const genresArray = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science-Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await tdmbApiAction("get", `/3/movie/${id}/videos?language=en-US`);
        console.log(response.results[0], "response id");
        setVideoId(response.results[0].key);
        // dispatch(setPopularMoviesList(response.results));

        // dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchVideoId();
  }, []);
  const displayGenre = () => {
    let genreList = "";
    genres.forEach((element) => {
      const genre = genresArray.filter((el) => el.id === element);

      genreList += genre[0].name + " ";
    });
    return genreList;
  };
  //   useEffect(() => {
  //     const fetchGenres = async () => {
  //       try {
  //         //   const response = await tdmbApiAction("get", `3/movie/popular?language=en-US&page=${page}`);
  //         //   console.log(response.results, "response popular");
  //         //   dispatch(setPopularMoviesList(response.results));
  //         genres.forEach(async (el) => {
  //           const response = await tdmbApiAction("get", `3/movie/popular?language=en-US&page=${page}`);
  //         });
  //         // dispatch(setReleaseDate(resultWithUS));
  //       } catch (error) {
  //         // Gérer les erreurs de la requête API
  //         console.log(error);
  //       }
  //     };
  //     fetchGenres();
  //   }, []);

  const voteAverage = average?.toString().replace(".", "").substring(0, 2);
  return (
    <div className="relative  ">
      {cardIsHovered && <div className="w-[280px]"></div>}
      <div
        className={`] bg-black  transition-all w-[280px] ${
          cardIsHovered && "scale-[1.3] h-[320px] absolute  bottom-[-5rem] left-5 z-50 rounded-lg overflow-hidden shadow-xl shadow-[#03020b] "
        }`}
        onMouseEnter={() => setCardIsHovered(true)}
        onMouseLeave={() => setCardIsHovered(false)}
      >
        <div className="h-[158px] relative">
          {cardIsHovered ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&controls=0&iv_load_policy=3&autohide=1`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; autohide"
              allowFullScreen
            ></iframe>
          ) : (
            <Image src={`https://image.tmdb.org/t/p/original/${image}`} width={1920} height={1080} alt={"movie image"} className="w-[100%] h-[100%] object-cover" />
          )}
        </div>
        {cardIsHovered && (
          <div className="h-[200px] w-full p-3">
            <div className="flex w-full justify-between">
              <div className="flex">
                <div className="rounded-[50%] cursor-pointer w-[25px]  h-[25px] bg-white flex justify-center items-center mr-2 hover:bg-grey">
                  <Image src={playIcon} width={16} height={16} className="ml-[2px]" alt="play icon" />
                </div>
                <div className="rounded-[50%] cursor-pointer w-[25px]  h-[25px] border-[1px] border-white flex justify-center items-center">
                  <Image src={plusIcon} width={12} height={12} alt="play icon" />
                </div>
              </div>
              <div className="rounded-[50%] cursor-pointer w-[25px]  h-[25px] border-[1px] border-white flex justify-center items-center">
                <Image src={chevronIcon} width={14} height={14} className="" alt="play icon" />
              </div>
            </div>
            <Title lvl={3} text={title} style={"text-white mt-5 text-sm"} />
            <p className={`mt-2 text-sm ${average > 7 && "text-primary"} ${average <= 7 && average > 5 && "text-white"} ${average < 5 && "text-[red]"}`}>
              {" "}
              Recommended at {voteAverage?.length > 1 ? voteAverage + "%" : voteAverage + "0%"}
            </p>
            <p className="text-white text-xs mt-2">{displayGenre()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
