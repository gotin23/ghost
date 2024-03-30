"use client";
import InputText from "@/components/InputText/InputText";
import Button from "@/components/Button/Button";
import Image from "next/image";
import Title from "@/components/Title/Title";
import { performApiAction } from "@/Services/Api/Api";
import { useState } from "react";
import HoverCard from "@/components/HoverCard/HoverCard";
import penIcon from "../../../../public/assets/icons/pen-icon.svg";

const AddNewProfile = ({ props, modal, username, id, role, avatar, updateData }) => {
  const [profile, setProfile] = useState({ username: username, avatar: avatar, role: role });
  console.log(profile);
  const [selectAvatarOpen, setSelectAvatarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const avatarList = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const token = props;

  const handleUsername = (value) => {
    setProfile((state) => ({
      ...state,
      username: value,
    }));
  };

  const handleRoleChange = (e) => {
    const isChecked = e.target.checked;
    setProfile((state) => ({
      ...state,
      role: isChecked ? "child" : "normal",
    }));
  };

  const modifyProfile = () => {
    const fetchData = async () => {
      try {
        await performApiAction("modifyProfile", token, { id: id, username: profile.username, avatar: profile.avatar, role: profile.role });

        updateData();
        modal(false);
      } catch (error) {
        console.log(error, "error");
        setErrorMessage(error.response.data.message);
      }
    };
    fetchData();
  };

  const avatarSelected = (avatar) => {
    setProfile((state) => ({ ...state, avatar: "avatar" + avatar }));
    setSelectAvatarOpen(false);
  };

  return (
    <section className="flex items-center justify-center flex-col ">
      <Title text={"Modify your profile?"} level={2} style={"text-6xl text-primary whitespace-nowrap text-center"} />
      <div className="p-10 w-[500px]">
        <InputText id="username" value={profile.username} placeholder="Your username here" onInputChange={handleUsername} style={"mt-5"} />
        <div className="flex justify-between items-center mt-10 relative">
          <p className="text-lg text-primary">Select your avatar:</p>
          <div className="relative">
            <Image src={`/assets/avatar/${profile.avatar}.png`} width={80} height={80} className={`w-[80px] rounded-lg`} alt={"profile-image"} />
            <div className="absolute inset-0 flex justify-center items-center  bg-[#00000087] cursor-pointer" onClick={() => setSelectAvatarOpen(true)}>
              <Image src={penIcon} width={30} height={30} className={`w-[30px]`} alt={"pen icon"} />
            </div>
          </div>

          {selectAvatarOpen && (
            <div className="flex justify-center flex-wrap absolute right-[-330px] w-[300px] h-[400px] bg-black border-2 border-primary rounded-xl p-5 gap-2">
              {avatarList.map((el) => {
                return (
                  <div className="h-[80px] cursor-pointer transition hover:scale-[1.1] bg-primary rounded-lg overflow-hidden" onClick={() => avatarSelected(el)} key={el}>
                    <Image src={`/assets/avatar/avatar${el}.png`} width={80} height={80} alt={"profile image"} />
                  </div>
                );
              })}
              <div className="w-[20px] h-[20px] bg-primary absolute left-[-10px] top-48 rotate-45 z-20"></div>
            </div>
          )}
        </div>
        <div className="flex flex-start mt-10 text-lg text-primary">
          <label htmlFor="roleCheckbox" id="roleCheckBox">
            Kid? :
          </label>
          <div className="relative">
            {isHovered && <HoverCard text={"Select it if you are under 12 years old"} />}
            <input
              type="checkbox"
              id="roleCheckbox"
              checked={profile.role === "child" ? true : false}
              onChange={handleRoleChange}
              className="ml-5 w-[25px] h-[25px]  cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>
        <p className="mt-5 h-[30px] text-primary w-[100%]">{errorMessage}</p>
        <div className="flex justify-between">
          <Button text={"Cancel"} style={"mt-10 px-3 py-2"} onClick={() => modal(false)} />
          <Button text={"Modify profile"} style={"mt-10 px-3 py-2"} onClick={modifyProfile} />
        </div>
      </div>
    </section>
  );
};

export default AddNewProfile;
