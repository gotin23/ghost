"use client";
import Navigation from "@/components/Navigation/Navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [color, setColor] = useState("");
  const token = useSelector((state) => state.log.token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    function handleScroll() {
      // Vérifiez si la position de défilement est supérieure à zéro
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setColor("bg-black");
      } else {
        setColor(""); // Remettre la couleur par défaut si la position de défilement est en haut
      }
    }

    // Ajouter un écouteur d'événement de défilement lorsque le composant est monté
    window.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Navigation style={color} />
      {children}
    </>
  );
}
