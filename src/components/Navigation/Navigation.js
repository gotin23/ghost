"use client";
import Image from "next/image";
import Title from "../Title/Title";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setProfileSelected } from "@/redux/Reducers/ProfileSelectedReducer";
import { setLogout } from "@/redux/Reducers/LogReducer";
import { setReset } from "@/redux/Reducers/FeaturedMediaReducer";
import triangleIcon from "../../../public/assets/icons/triangle-icon.svg";
import triangleColorIcon from "../../../public/assets/icons/triangle-color-icon.svg";
import logoutIcon from "../../../public/assets/icons/logout-icon.svg";
import penIcon from "../../../public/assets/icons/pen-icon.svg";
import helpIcon from "../../../public/assets/icons/help-icon.svg";
import accountIcon from "../../../public/assets/icons/account-icon.svg";
import searchIcon from "../../../public/assets/icons/search-icon.svg";
import SearchResult from "../layouts/searchResult/SearchResult";
// import { search } from "../../../backend/app";

const Navigation = ({ style }) => {
  const [profilePictureIsHovered, setProfilePictureIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [accountIsHovered, setAccountIsHovered] = useState(false);
  const [helpIsHovered, setHelpIsHovered] = useState(false);
  const [changeProfileIsHovered, setChangeProfileIsHovered] = useState(false);
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const profiles = useSelector((state) => state.profiles.profiles);

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
  // const toggleSeachBar = () => {

  //     setSearchBarIsOpen(false);
  //   }
  // }
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchBarIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    console.log("ok");
  };
  const resetFeaturedMediaDisplayed = () => {
    dispatch(setReset());
  };

  return (
    <>
      <nav className={`h-[60px] w-full ${style} fixed top-0 flex justify-between py-0 px-8 z-50`}>
        {/* Navigation */}
        <div className="flex">
          <Link href={"/browse"} onClick={resetFeaturedMediaDisplayed} className={"h-full flex items-center"}>
            <Title style=" text-primary cursor-pointer text-3xl" level={2} text={"Ghost"} />
          </Link>
          <ul className="flex ml-20">
            <li>
              <Link href={"/browse"} onClick={resetFeaturedMediaDisplayed} className={"h-full flex items-center text-white hover:text-grey"}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/browse/series"} onClick={resetFeaturedMediaDisplayed} className={"h-full flex items-center text-white ml-5 hover:text-grey"}>
                Series
              </Link>
            </li>
            <li>
              <Link href={"/browse/movies"} onClick={resetFeaturedMediaDisplayed} className={"h-full flex items-center  text-white ml-5 hover:text-grey"}>
                Movies
              </Link>
            </li>
            <li>
              <Link href={"/browse/watchlist"} onClick={resetFeaturedMediaDisplayed} className={"h-full flex items-center  text-white ml-5 hover:text-grey"}>
                My watchlist
              </Link>
            </li>
          </ul>
        </div>

        <div className={"h-full flex items-center "}>
          {/* Search Bar*/}
          <div
            ref={searchInputRef}
            className={`overflow-hidden p-1 flex mr-8  transition-all rounded-sm  ${searchBarIsOpen ? "w-[300px]   bg-black border border-white" : "w-[40px]"}`}
          >
            <Image src={searchIcon} width={28} height={28} alt="search icon" className={`cursor-pointer`} onClick={() => setSearchBarIsOpen(!searchBarIsOpen)} />
            {searchBarIsOpen && (
              <input
                type="search"
                style={{ border: "none", outline: "none" }}
                placeholder="Movies, series, style..."
                autoFocus
                className={`text-white text-sm bg-black ml-2 w-full`}
                value={searchValue}
                onChange={handleSearch}
              />
            )}
          </div>
          {/* Modal profile */}
          <div className="flex items-center relative cursor-pointer" onMouseEnter={toggleModalProfilePicture} onMouseLeave={() => toggleModalProfilePicture()}>
            <Image src={`/assets/avatar/${profileSelected.avatar}.png`} width={36} height={36} alt="profile picture" className="rounded-sm mr-2" />
            <Image src={triangleIcon} width={10} height={10} alt="triangle icon" className={`transition ${profilePictureIsHovered ? "" : "rotate-180"}`} />
            {profilePictureIsHovered && (
              <div className="min-w-[240px]  absolute top-[50px] right-0  border-[1px] border-primary rounded-sm flex flex-col bg-blackTransparent ">
                <Image src={triangleColorIcon} width={14} height={14} alt="triangle color icon" className={`absolute top-[-12px] right-[24px]`} />
                <div className="p-4 ">
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
                    <p className={`text-white text-sm ml-3 ${changeProfileIsHovered && "underline underline-offset-4"}`}>Manage profiles</p>
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

                <div className="w-full h-[40px] p-5 flex items-center justify-center border-t-2 border-primary border-opacity-40 cursor-pointer" onClick={logout}>
                  <Image src={logoutIcon} width={16} height={16} alt="logout icon" />
                  <p className="text-white ml-3 ">Logout</p>
                </div>
                <div className="w-[60px] h-[40px] bg-transparent absolute right-[-10px] top-[-40px] cursor-pointer"></div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {searchValue && (
        <div className="bg-black w-full fixed inset-0 z-[49]">
          <SearchResult value={searchValue} />
        </div>
      )}
    </>
  );
};

export default Navigation;
