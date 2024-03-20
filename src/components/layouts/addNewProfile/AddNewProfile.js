"use client";
import InputText from "@/components/InputText/InputText";
import Button from "@/components/Button/Button";
import Image from "next/image";
import Title from "@/components/Title/Title";
import { performApiAction } from "@/Services/Api/Api";
import { useState } from "react";

const AddNewProfile = ({ props, modal, updateData }) => {
  const [profile, setProfile] = useState({ username: "", avatar: "avatar2", role: "normal", passwordConfirmation: "" });
  const [selectAvatarOpen, setSelectAvatarOpen] = useState(false);
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
  console.log(profile.role);
  const addNewProfile = () => {
    const fetchData = async () => {
      try {
        await performApiAction("addNewProfile", token, { username: profile.username, avatar: profile.avatar, role: profile.role });

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
    console.log(avatar, "hello");
    setProfile((state) => ({ ...state, avatar: "avatar" + avatar }));
    setSelectAvatarOpen(false);
  };

  return (
    <>
      <Title text={"Add new profile?"} level={2} style={"text-6xl text-primary"} />
      <div className="p-10">
        <InputText id="Choose a username" placeholder="Your username here" onInputChange={handleUsername} style={"mt-5"} />
        <div className="flex justify-between items-center mt-10 relative">
          <p className="text-lg text-primary">Select your avatar:</p>
          <Image
            src={`/assets/avatar/${profile.avatar}.png`}
            width={80}
            height={80}
            className={`w-[80px] rounded-lg border-4 cursor-pointer`}
            alt={"profile-image"}
            onClick={() => setSelectAvatarOpen(true)}
          />
          {selectAvatarOpen && (
            <div className="flex justify-center flex-wrap absolute right-[-330px] w-[300px] h-[400px] bg-black border-2 border-primary rounded-xl p-5 gap-2">
              {avatarList.map((el) => {
                return (
                  <div className="h-[80px] cursor-pointer transition hover:scale-[1.1] bg-primary rounded-lg overflow-hidden" onClick={() => avatarSelected(el)} key={el}>
                    <Image src={`/assets/avatar/avatar${el}.png`} width={80} height={80} alt={"profile image"} />
                  </div>
                );
              })}
              <div className="w-[20px] h-[20px] bg-primary absolute left-[-10px] top-48 rotate-45 z-0"></div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-10 text-lg text-primary">
          <label htmlFor="roleCheckbox" id="roleCheckBox">
            you are a kid? :
          </label>
          <input type="checkbox" id="roleCheckbox" onChange={handleRoleChange} className="ml-10 w-10 cursor-pointer" />
        </div>
        <p className="mt-10 h-[30px] text-primary w-[100%]">{errorMessage}</p>
        <div className="flex justify-around">
          <Button text={"Cancel"} style={"mt-10 px-3 py-2"} onClick={() => modal(false)} />
          <Button text={"Add profile"} style={"mt-10 px-3 py-2"} onClick={addNewProfile} />
        </div>
      </div>
    </>
  );
};

export default AddNewProfile;
