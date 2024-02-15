"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { performApiAction } from "@/Services/Api/Api";
import { setProfiles } from "@/redux/Reducers/ProfilesReducer";

const SelectProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.log.token);
  const profiles = useSelector((state) => state.profiles);
  console.log(profiles);
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
    <div>
      <h1 className="text-primary">Hello {profiles.admin.username}</h1>
    </div>
  );
};

export default SelectProfile;
