"use client";
import Image from "next/image";
import Title from "../Title/Title";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setProfileSelected } from "@/redux/Reducers/ProfileSelectedReducer";
import { setLogout } from "@/redux/Reducers/LogReducer";
import triangleIcon from "../../../public/assets/icons/triangle-icon.svg";
import logoutIcon from "../../../public/assets/icons/logout-icon.svg";
import penIcon from "../../../public/assets/icons/pen-icon.svg";
import helpIcon from "../../../public/assets/icons/help-icon.svg";
import accountIcon from "../../../public/assets/icons/account-icon.svg";

const Navigation = () => {
  const [profilePictureIsHovered, setProfilePictureIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [accountIsHovered, setAccountIsHovered] = useState(false);
  const [helpIsHovered, setHelpIsHovered] = useState(false);
  const [changeProfileIsHovered, setChangeProfileIsHovered] = useState(false);
  const profiles = useSelector((state) => state.profiles.profiles);
  console.log(profiles);
  const profileSelected = useSelector((state) => state.profileSelected.profile);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleModalProfilePicture = () => {
    if (!profilePictureIsHovered) {
      setTimeout(() => {
        setProfilePictureIsHovered(true);
      }, 200);
    } else {
      setTimeout(() => {
        setProfilePictureIsHovered(false);
      }, 200);
    }
  };
  const changeProfileSelected = (profile) => {
    dispatch(setProfileSelected({ profile }));
    router.push("/browse");
  };
  const logout = () => {
    const token = "";

    dispatch(setLogout({ token }));
    router.push("/");
  };

  return (
    <nav className={`h-[70px] w-full bg-black fixed top-0 flex justify-between py-0 px-8`}>
      <Link href={"/browse"} className={"h-full flex items-center"}>
        <Title style="text-xl text-primary cursor-pointer" level={2} text={"Ghost"} />
      </Link>
      <div className={"h-full flex items-center"}>
        <div className="flex items-center relative " onMouseEnter={toggleModalProfilePicture} onMouseLeave={() => toggleModalProfilePicture()}>
          <Image src={`/assets/avatar/${profileSelected.avatar}.png`} width={30} height={30} alt="profile picture" className="rounded-sm mr-2" />
          <Image src={triangleIcon} width={10} height={10} alt="triangle icon" className={`transition ${profilePictureIsHovered ? "" : "rotate-180"}`} />
          {profilePictureIsHovered && (
            <div className="w-[260px]  absolute top-[40px] right-0  border-[1px] border-primary rounded-xl flex flex-col p">
              {/* <div className="w-full h-[40px]"></div> */}

              <div className="p-4">
                {profiles.map((user, idx) => {
                  if (user.username !== profileSelected.username) {
                    return (
                      <div
                        className="flex items-center mb-3 cursor-pointer w-fit"
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => changeProfileSelected(user)}
                      >
                        <Image src={`/assets/avatar/${user.avatar}.png`} width={30} height={30} alt={"profile icon"} className="rounded-sm mr-2" />
                        <p className={`text-white text-sm ${hoveredIndex === idx && "underline underline-offset-4"}`}>{user.username}</p>
                      </div>
                    );
                  }
                })}
                <Link
                  href={"/"}
                  className="flex items-center mt-5  w-fit"
                  onMouseEnter={() => setChangeProfileIsHovered(true)}
                  onMouseLeave={() => setChangeProfileIsHovered(false)}
                >
                  <Image src={penIcon} width={25} height={25} alt="pen icon" />
                  <p className={`text-white text-sm ml-3 ${changeProfileIsHovered && "underline underline-offset-4"}`}>Change profiles</p>
                </Link>
                <Link href={"/"} className="flex items-center mt-3 w-fit" onMouseEnter={() => setAccountIsHovered(true)} onMouseLeave={() => setAccountIsHovered(false)}>
                  <Image src={accountIcon} width={35} height={35} alt="pen icon" className="ml-[-5px]" />
                  <p className={`text-white text-sm ml-2 ${accountIsHovered && "underline underline-offset-4"}`}>Account</p>
                </Link>
                <Link href={"/"} className="flex items-center mt-3 w-fit" onMouseEnter={() => setHelpIsHovered(true)} onMouseLeave={() => setHelpIsHovered(false)}>
                  <Image src={helpIcon} width={30} height={30} alt="pen icon" className="ml-[-3px]" />
                  <p className={`text-white text-sm ml-3 ${helpIsHovered && "underline underline-offset-4"}`}>Help</p>
                </Link>
              </div>

              <div className="w-full h-[40px] p-5 flex items-center justify-center border-t-2 border-[white] border-opacity-40 cursor-pointer" onClick={logout}>
                <Image src={logoutIcon} width={16} height={16} alt="logout icon" />
                <p className="text-white ml-5 ">Logout</p>
              </div>
              <div className="w-[60px] h-[40px] bg-transparent absolute right-[-10px] top-[-40px] cursor-pointer"></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
