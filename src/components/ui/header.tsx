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
import {
  SheetContent,
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetClose,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";

import logo from "/public/assets/logo.png";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <Card className="flex items-center justify-between border-preto2 bg-black p-[1.875rem]">
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

          {status === "authenticated" && data?.user && (
            <div className="mt-4 flex flex-col">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium text-white">{data.user.name}</p>
                    <p className="text-sm text-white opacity-85">
                      Boas compras!
                    </p>
                  </div>
                </div>
              </div>

              <Separator />
            </div>
          )}

          <div className="mt-2 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant={"outline"}
                className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
              >
                <LogInIcon />
                Fazer Login
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant={"outline"}
                className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
              >
                <LogOutIcon />
                Fazer Logout
              </Button>
            )}
            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant={"outline"}
                  className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                >
                  <HomeIcon size={16} />
                  Inicio
                </Button>
              </Link>
            </SheetClose>
            <Button
              variant={"outline"}
              className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
            >
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant={"outline"}
                  className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                >
                  <ListOrderedIcon size={16} />
                  Catàlago
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <Image src={logo} alt="Gold Informàtica" width={150} height={150} />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-preto text-white">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
