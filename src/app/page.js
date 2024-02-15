"use client";
import { useSelector } from "react-redux";
import UserLoggedOut from "@/components/layouts/home/UserLoggedOut";
import SelectProfile from "@/components/layouts/home/SelectProfile";
export default function Home() {
  const token = useSelector((state) => state.log.token);
  console.log(token, "ici");
  return <main className="flex min-h-screen  justify-center mt-[30vh] poppins">{token ? <SelectProfile /> : <UserLoggedOut />}</main>;
}
