import Image from "next/image";
import Title from "../Title/Title";

const PersonCard = ({ data }) => {
  console.log(data);
  const voteAverage = data.popularity?.toString().replace(".", "").substring(0, 2);
  return (
    <div className="h-[16vh] w-[18vw] bg-blackLight flex">
      {" "}
      <Image src={`https://image.tmdb.org/t/p/original${data.profile_path}`} width={1000} height={1080} className="w-[50%] h-[100%] object-cover" alt={"featured media image"} />
      <div className="w-[50%] h-[100%] py-2 px-3 flex flex-col justify-between">
        <Title level={2} text={data.name} style={"text-white text-xl mb-3"} />
        <p className="text-white">{data.known_for_department}</p>
        <p className={`text-xs mt-2 ${voteAverage >= 50 ? "text-primary " : "text-[red]"} `}> popularity {voteAverage?.length > 1 ? voteAverage + "%" : voteAverage + "0%"}</p>
      </div>
    </div>
  );
};

export default PersonCard;
