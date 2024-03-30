"use client";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import Navigation from "@/components/Navigation/Navigation";

const Browse = () => {
  const token = useSelector((state) => state.log.token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {token && (
        <main className="flex min-h-screen justify-center items-center w-full relative">
          <Navigation />
          <p className="text-primary ">ok c'est le browse</p>
        </main>
      )}
    </>
  );
};

export default Browse;
