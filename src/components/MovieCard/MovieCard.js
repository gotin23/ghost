import Title from "../Title/Title";
import { useState, useEffect } from "react";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import Image from "next/image";
import playIcon from "../../../public/assets/icons/play-icon.svg";
import plusIcon from "../../../public/assets/icons/plus-icon.svg";
import chevronIcon from "../../../public/assets/icons/chevron-icon.svg";
import MoreInfo from "../MoreInfo/MoreInfo";
import loader from "../../../public/assets/icons/spinner.svg";

const MovieCard = ({ title, image, average, genres, id, overview, height, width }) => {
  const [cardIsHovered, setCardIsHovered] = useState(false);
  const [toggleMoreInfo, setToggleMoreInfo] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [styleMoreInfo, setStyleMoreInfo] = useState("scale-0");
  const [imageLoaded, setImageLoaded] = useState(false);

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
    genres.forEach((element, idx) => {
      const genre = genresArray.filter((el) => el.id === element);

      genreList += genre[0].name + (idx === genres.length - 1 || genres.length === 1 ? "" : " • ");
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
  const toggleModalMoreInfo = (value) => {
    setToggleMoreInfo(!toggleMoreInfo);
    setTimeout(() => {
      setStyleMoreInfo(`scale-${value}`);
    }, 20);
  };
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setCardIsHovered(true);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setCardIsHovered(false);
  };
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };
  return (
    <>
      <div className="relative">
        {cardIsHovered && <div style={{ width: width + "px" }}></div>}
        <div
          style={{ width: width + "px" }}
          className={`bg-blackLight transition-all cursor-pointer ${
            cardIsHovered && "scale-x-[1.4] scale-y-[1.4] z-[100] h-[330px] absolute  bottom-[-0rem] left-0  rounded-lg overflow-hidden shadow-lg shadow-[#03020b] "
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={{ height: height + "px" }} className="relative">
            {cardIsHovered ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0&showinfo=0&controls=0&iv_load_policy=3&autohide=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; autohide"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="overflow-hidden">
                <Title lvl={3} text={title} style={"text-white bg-blackTransparent px-1 z-50 absolute bottom-3 left-3 text-md text-nowrap text-ellipsis overflow-hidden"} />
                {!imageLoaded && (
                  <div className="w-[100%] h-[100%] flex justify-center align-middle">
                    <Image src={loader} height={64} width={64} alt="loader" />
                  </div>
                )}
                <Image
                  src={`https://image.tmdb.org/t/p/original/${image}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  width={1920}
                  height={1080}
                  alt={"movie image"}
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            )}
          </div>
          {cardIsHovered && (
            <div className=" w-full p-3 pb-10">
              <div className="flex w-full justify-between">
                <div className="flex mt-2">
                  <div className="rounded-[50%] cursor-pointer w-[32px]  h-[32px] bg-white flex justify-center items-center mr-2 hover:bg-grey">
                    <Image src={playIcon} width={16} height={16} className="ml-[2px]" alt="play icon" />
                  </div>
                  <div
                    className="rounded-[50%] cursor-pointer w-[32px]  h-[32px] border-[1px] border-grey flex justify-center items-center hover:border-white"
                    onClick={() => toggleModalMoreInfo("1")}
                  >
                    <Image src={plusIcon} width={12} height={12} alt="plus icon" />
                  </div>
                </div>
                <div className="rounded-[50%] cursor-pointer w-[32px]  h-[32px] mt-2 border-[1px] border-grey flex justify-center items-center hover:border-white">
                  <Image src={chevronIcon} width={14} height={14} className="" alt="chevron icon" />
                </div>
              </div>
              <Title lvl={3} text={title} style={"text-white mt-4 text-lg text-nowrap text-ellipsis overflow-hidden"} />
              <p className={`text-xs mt-2 ${average >= 5 ? "text-primary " : "text-[red]"} `}> Recommended at {voteAverage?.length > 1 ? voteAverage + "%" : voteAverage + "0%"}</p>
              <p className="text-white text-[10px] mt-1">{displayGenre()}</p>
            </div>
          )}
        </div>
      </div>
      {toggleMoreInfo && (
        <MoreInfo id={id} videoId={videoId} title={title} genres={displayGenre} average={voteAverage} overview={overview} style={styleMoreInfo} closeModal={toggleModalMoreInfo} />
      )}
    </>
  );
};

export default MovieCard;
