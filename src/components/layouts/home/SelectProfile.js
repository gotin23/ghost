"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { performApiAction } from "@/Services/Api/Api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setProfiles } from "@/redux/Reducers/ProfilesReducer";
import { setProfileSelected } from "@/redux/Reducers/ProfileSelectedReducer";
import Title from "@/components/Title/Title";
import ProfileIcon from "@/components/ProfileIcon/ProfileIcon";
import Image from "next/image";
import Button from "@/components/Button/Button";
import AddNewProfile from "../addNewProfile/AddNewProfile";
import ModifyProfile from "../modifyProfile/ModifyProfile";
import kidIcon from "../../../../public/assets/icons/kid-icon.png";
import penIcon from "../../../../public/assets/icons/pen-icon.svg";
import trashIcon from "../../../../public/assets/icons/trash-icon.svg";

const SelectProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [newProfile, setNewProfile] = useState(false);
  const [manageProfile, setManageProfile] = useState(false);
  const [profileToUpdate, setProfileToUpdate] = useState({ username: "", id: "", avatar: "", role: "" });
  const [modalManageProfile, setModalManageProfile] = useState(false);
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.log.token);
  const profiles = useSelector((state) => state.profiles);
  const router = useRouter();
  const profileSelected = useSelector((state) => state.profiles);
  const addNewUserButton = profiles.profiles.length;

  const fetchData = async () => {
    try {
      const data = await performApiAction("getProfile", token, {});

      dispatch(setProfiles({ data }));
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProfile = async (id, username) => {
    if (modalDeleteConfirmation) {
      try {
        await performApiAction("deleteProfile", token, { id });
        fetchData();
        setModalDeleteConfirmation(false);
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      setManageProfile({ username: username, id: id });
      setModalDeleteConfirmation(true);
    }
  };
  const openModalManageProfile = async (username, id, role, avatar) => {
    setProfileToUpdate({ username: username, avatar: avatar, id: id, role: role });
    setModalManageProfile(true);
  };

  const redirectToBrowse = (profile) => {
    if (!manageProfile) {
      dispatch(setProfileSelected({ profile }));
      router.push("/browse");
    }
  };

  return (
    <section className="text-center min-h-[400px]">
      <Title text={`${!manageProfile ? "Who is it?" : "Select a profile"}`} level={2} style={"text-6xl text-primary"} />

      <ul className="flex items-center justify-center mt-10 gap-3">
        {profiles &&
          profiles.profiles.map((user, idx) => {
            if (user.avatar) {
              return (
                // <Link href={"/browse"}>
                <li key={idx} className="relative" onClick={() => redirectToBrowse(user)}>
                  {manageProfile && (
                    <div
                      className="absolute top-3 right-3 cursor-pointer transition hover:scale-[1.3] w-[20px] h-[20px] z-50"
                      onClick={() => deleteProfile(user._id, user.username)}
                    >
                      <Image src={trashIcon} width={20} height={20} alt={"trash icon"} className="w-[100%] " />
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    {user.role === "child" && (
                      <Image src={kidIcon} width={30} height={150} alt={"kid icon"} className="absolute left-[50%] translate-x-[-50%] bottom-[28px] rotate-90 rounded-xl" />
                    )}
                    <ProfileIcon src={user.avatar} username={user.username} />
                    {manageProfile && (
                      <div
                        className="absolute h-[200px] w-[200px] top-0 bg-[#00000087] flex justify-center items-center cursor-pointer z-40"
                        onClick={() => openModalManageProfile(user.username, user._id, user.role, user.avatar)}
                      >
                        <Image src={penIcon} width={60} height={60} alt={"pen icon"} />
                        <div className=" absolute w-[200px] h-[50px]  bottom-[-50px]"></div>
                      </div>
                    )}
                  </div>
                </li>
                // </Link>
              );
            }
          })}
        {addNewUserButton < 5 && !manageProfile && (
          <li>
            {" "}
            <div className="flex flex-col items-center justify-center cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className={`w-[200px] h-[200px] flex  justify-center border-primary rounded-lg ${isHovered && "border-4"}`} onClick={() => setNewProfile(true)}>
                {!isHovered && profiles ? (
                  <Image src={"/assets/icons/addIcon-grey.svg"} width={100} height={100} alt={"add icon grey"} className="" />
                ) : (
                  <Image src={"/assets/icons/addIcon-color.svg"} width={100} height={100} alt={"add icon colored"} />
                )}
              </div>
              <Title text={"Add new profile"} level={3} style={`mt-5 text-xl ${!isHovered ? "text-grey" : "text-primary"}`} />
            </div>
          </li>
        )}
      </ul>

      {/* <Button text={manageProfile ? "Cancel" : "Manage profiles"} style={"mt-20 px-3 py-2"} onClick={() => setManageProfile(!manageProfile)} /> */}
      <button className="bg-black text-grey min-w-[160px]  border-2 mt-20 py-2 px-5 text-xl hover:text-white hover:border-white" onClick={() => setManageProfile(!manageProfile)}>
        {manageProfile ? "Back" : "Manage profiles"}
      </button>
      {newProfile && (
        <div className="inset-0 absolute bg-black flex justify-center items-center">
          <AddNewProfile props={token} modal={setNewProfile} updateData={fetchData} />
        </div>
      )}
      {modalManageProfile && (
        <div className="inset-0 absolute bg-black flex justify-center items-center z-50">
          <ModifyProfile
            props={token}
            username={profileToUpdate.username}
            id={profileToUpdate.id}
            role={profileToUpdate.role}
            avatar={profileToUpdate.avatar}
            updateData={fetchData}
            modal={setModalManageProfile}
          />
        </div>
      )}
      {modalDeleteConfirmation && (
        <div className="inset-0 absolute bg-black flex flex-col justify-center items-center z-50">
          <Title text={`Are you sure to delete ${manageProfile.username} profile?`} level={3} style={"text-3xl text-primary"} />
          <div className="min-w-[400px] flex justify-between">
            <Button text={"no"} style={"mt-20 px-3 py-2"} onClick={() => setModalDeleteConfirmation(false)} />
            <Button text={"yes"} style={"mt-20 px-3 py-2"} onClick={() => deleteProfile(manageProfile.id)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectProfile;
