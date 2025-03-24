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

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";

const Header = () => {
  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <Card className="border-preto2 flex items-center justify-between bg-black  p-[1.875rem]">
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


            {status === "authenticated" &&  data?.user && (
            <div className=" mt-4 flex flex-col">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                <Avatar>
                <AvatarFallback>
                  {data.user.name?.[0].toUpperCase()}
                </AvatarFallback>

                {data.user.image && (
                  <AvatarImage src={data.user.image} />
                )}
              </Avatar>
              <div className="flex flex-col">
              <p className="font-medium text-white">{data.user.name}</p>
              <p className=" text-white text-sm opacity-85">Boas compras!</p>
              </div>
              
            </div>
              </div>


            <Separator  />
            </div>
            
            )}

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
