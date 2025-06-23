"use client";

import {
  HomeIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "./button";
import { Card } from "./card";
import {
  SheetContent,
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetClose,
} from "./sheet";
import Cookie from "js-cookie";
import { signIn, signOut, useSession } from "next-auth/react";

import logo from "/public/assets/logo.png";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import { useEffect, useState } from "react";
import { getUserRoleFromToken } from "@/utils/token";
import { RoleEnum } from "@/@types/enums/role";
import { useRouter } from "next/navigation";

const dataHeader = [
  {
    name: "Inicio",
    href: "/",
    role: [RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.GUEST],
    icon: <HomeIcon size={16} />,
  },
  {
    name: "Meus Pedidos",
    href: "/orders",
    role: [RoleEnum.ADMIN, RoleEnum.USER],
    icon: <PackageSearchIcon size={16} />,
  },
  {
    name: "Ofertas",
    href: "/deals",
    role: [RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.GUEST],
    icon: <PercentIcon size={16} />,
  },
  {
    name: "Catalogo",
    href: "/catalog",
    role: [RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.GUEST],
    icon: <ListOrderedIcon size={16} />,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    role: [RoleEnum.ADMIN],
    icon: <LayoutDashboardIcon size={16} />,
  },
];

const Header = () => {
  const [role, setRole] = useState<RoleEnum>(RoleEnum.GUEST);
  const router = useRouter();

  useEffect(() => {
    const roleToken = getUserRoleFromToken();
    if (
      roleToken &&
      Object.values(RoleEnum).includes(roleToken as unknown as RoleEnum)
    ) {
      setRole(roleToken as unknown as RoleEnum);
    } else {
      setRole(RoleEnum.GUEST);
    }
  }, []);

  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    Cookie.remove("auth_token");
    setRole(RoleEnum.GUEST);
  };

  const handleLoginClick = async () => {
    // await signIn();
    router.push("/login");
  };

  const filteredMenu = dataHeader.filter(
    (item) => !item.role || item.role.includes(role),
  );

  return (
    <Card className="flex items-center justify-between border-preto2 bg-black p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="bg-backgroundItems" side={"left"}>
          <SheetHeader className="text-lg font-semibold text-white">
            Menu
          </SheetHeader>

          {/* {status === "authenticated" && data?.user && (
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
          )} */}

          <div className="mt-2 flex flex-col gap-2">
            {filteredMenu.map((item) => (
              <SheetClose asChild key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              </SheetClose>
            ))}

            {/* <SheetClose asChild>
              <Link href="/">
                <Button
                  variant={"outline"}
                  className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                >
                  <HomeIcon size={16} />
                  Inicio
                </Button>
              </Link>
            </SheetClose> */}
            {/* <SheetClose asChild>
              <Link href="/orders">
                <Button
                  variant={"outline"}
                  className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                >
                  <PackageSearchIcon size={16} />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/deals"}>
                <Button
                  variant={"outline"}
                  className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>
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

            <SheetClose asChild>
              <Link href="/dashboard">
                <Button
                  variant={"outline"}
                  className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
                >
                  <LayoutDashboardIcon size={16} />
                  Dashboard
                </Button>
              </Link>
            </SheetClose> */}
            {/* {status === "authenticated" && ( */}
            {role !== RoleEnum.GUEST && (
              <Button
                onClick={handleLogoutClick}
                variant={"outline"}
                className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
              >
                <LogOutIcon />
                Fazer Logout
              </Button>
            )}
            {/* )} */}

            {/* {status === "unauthenticated" && (
            )} */}
            {role === RoleEnum.GUEST && (
              <Button
                onClick={handleLoginClick}
                variant={"outline"}
                className="w-full justify-start border-backgroundItems bg-backgroundItems text-white"
              >
                <LogInIcon />
                Fazer Login
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <Image src={logo} alt="Gold Informàtica" width={150} height={150} />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
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
