"use client";
import Image from "next/image";
import Title from "../Title/Title";
import { useState } from "react";

const ProfileIcon = ({ src, username }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center cursor-pointer`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Image
        src={`/assets/avatar/${src}.png`}
        width={200}
        height={200}
        className={`w-[200px]   rounded-lg border-4  ${isHovered && "border-primary"}`}
        alt={src + " of " + username}
      />

      <Title text={username} level={3} style={`text-xl mt-5 ${!isHovered ? "text-grey" : "text-primary"}`} />
    </div>
  );
};

export default ProfileIcon;
