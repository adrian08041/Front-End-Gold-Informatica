"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { SheetContent, Sheet, SheetTrigger, SheetHeader } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Header = () => {
  const { status } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <Card className="border-preto2 flex items-center justify-between bg-black p-5 p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="bg-backgroundItems" side={"left"}>
          <SheetHeader className="text-lg font-semibold text-white">
            Menu
          </SheetHeader>

          <div className="mt-2 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant={"outline"}
                className="w-full justify-start  border-backgroundItems bg-backgroundItems text-white"
              >
                <LogInIcon />
                Fazer Login
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant={"outline"}
                className="w-full justify-start  border-backgroundItems bg-backgroundItems text-white"
              >
                <LogOutIcon />
                Fazer Logout
              </Button>
            )}

            <Button
              variant={"outline"}
              className="w-full justify-start  border-backgroundItems bg-backgroundItems text-white"
            >
              <HomeIcon size={16} />
              Inicio
            </Button>
            <Button
              variant={"outline"}
              className="w-full justify-start  border-backgroundItems bg-backgroundItems text-white"
            >
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <Button variant={"outline"}
              className="bg-backgroundItems border-backgroundItems  text-white w-full  justify-start ">
              <ListOrderedIcon size={16} />
              Catàlago
            </Button>
          </div>
        </SheetContent>
      </Sheet>
            <Image
            src={logo}
            alt="Gold Informàtica"
            width={150}
            height={150}
            />
      

      <Button size="icon">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
