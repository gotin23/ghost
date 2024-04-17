import Title from "../Title/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import playIcon from "../../../public/assets/icons/play-icon.svg";
import plusIcon from "../../../public/assets/icons/plus-icon.svg";
const MoreInfo = ({ id, videoId, title, genres, average, overview, style, closeModal }) => {
  const [release, setRelease] = useState();
  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const release = await tdmbApiAction("get", `3/movie/${id}/release_dates`);
        // initPlayer();

        const resultWithUS = release.results.filter((el) => {
          return el.iso_3166_1 === "US";
        });
        console.log(resultWithUS[0].release_dates[0].certification);
        setRelease(resultWithUS[0].release_dates[0].certification);
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchRelease();
  }, []);
  console.log(release, "release");
  return (
    <div className="modal-overlay z-[101]" onClick={() => closeModal("0")}>
      {/* <div className=" absolute inset-0 z-[101] flex items-center justify-center  bg-blackTransparent" onClick={() => closeModal("0")}> */}

      <div className={`w-[50vw] transition-all ${style} bg-black  shadow-md shadow-[#03020b] transition-all rounded-xl overflow-hidden`}>
        <div className="w-full h-[450px]">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&controls=0&iv_load_policy=3&autohide=1`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; autohide"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-10">
          <div className="flex justify-between items-center mt-5">
            <div className="flex  items-center ">
              <button className="bg-white mr-3 min-w-[180px] py-2  flex justify-center items-center rounded-md hover:bg-grey">
                <Image src={playIcon} width={30} height={30} className="mr-2" alt={"featured media image"} />
                <p className="text-lg">Play</p>
              </button>
              <div className="rounded-[50%] cursor-pointer w-[46px]  h-[46px] border-[2px] border-grey flex justify-center items-center hover:border-white">
                <Image src={plusIcon} width={14} height={14} alt="plus icon" />
              </div>
            </div>
            {/* <p className={`text-lg  ${average >= 5 ? "text-primary " : "text-[red]"} `}> Recommended at {average?.length > 1 ? average + "%" : average + "0%"}</p> */}
          </div>

          <Title lvl={3} text={title} style={"text-white text-2xl mt-10"} />
          <p className={`text-md  ${average >= 5 ? "text-primary " : "text-[red]"} `}> Recommended at {average?.length > 1 ? average + "%" : average + "0%"}</p>
          <p className="text-white text-base mt-5">{overview}</p>
          <div className="flex justify-between items-center mt-10">
            <p className="text-white text-base ">{genres()}</p>

            <p className="text-grey text-sm  border-2 border-grey p-1 px-2">{release ? release : "PG"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
