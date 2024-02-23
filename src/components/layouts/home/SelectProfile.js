"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { performApiAction } from "@/Services/Api/Api";
import { setProfiles } from "@/redux/Reducers/ProfilesReducer";
import Title from "@/components/Title/Title";
import ProfileIcon from "@/components/ProfileIcon/ProfileIcon";
import Image from "next/image";
import Button from "@/components/Button/Button";

const SelectProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [newProfile, setNewProfile] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.log.token);
  const profiles = useSelector((state) => state.profiles);
  const addNewUserButton = profiles.length <= 5 ? true : false;
  console.log(addNewUserButton, profiles.profiles);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await performApiAction("getProfile", token, {});

        dispatch(setProfiles({ data }));
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  return (
    <section className="text-center min-h-[400px]">
      <Title text={"Who it is?"} level={2} style={"text-6xl text-primary"} />

      <ul className="flex items-center justify-center mt-10 gap-3">
        {/* {profiles && (
          <li>
            <ProfileIcon src={profiles.admin.avatar} username={profiles.admin.username} />
          </li>
        )} */}
        {profiles &&
          profiles.profiles.map((user, idx) => {
            if (user.avatar) {
              return (
                <li key={idx}>
                  <ProfileIcon src={user.avatar} username={user.username} />
                </li>
              );
            }
          })}
        {!addNewUserButton && (
          <li>
            {" "}
            <div className="flex flex-col items-center justify-center cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className={`w-[200px] h-[200px] flex  justify-center border-primary rounded-lg ${isHovered && "border-4"}`} onClick={() => setNewProfile(true)}>
                {!isHovered && profiles ? (
                  <Image src={"/assets/icons/addIcon-grey.svg"} width={140} height={140} alt={"ad icon grey"} className=" w-auto" />
                ) : (
                  <Image src={"/assets/icons/addIcon-color.svg"} width={140} height={140} alt={"add icon colored"} className=" w-auto" />
                )}
              </div>
              <Title text={"Add new profile"} level={3} style={`mt-5 text-xl ${!isHovered ? "text-grey" : "text-primary"}`} />
            </div>
          </li>
        )}
      </ul>

      <Button text={"Manage profiles"} style={"mt-20 px-3 py-2"} />
      {newProfile && (
        <div className="inset-0 absolute bg-black flex justify-center items-center" onClick={() => setNewProfile(false)}>
          <section className="min-h-[400px]">
            <Title text={"Add new profile"} level={2} style={"text-6xl text-primary"} />
          </section>
        </div>
      )}
    </section>
  );
};

export default SelectProfile;
