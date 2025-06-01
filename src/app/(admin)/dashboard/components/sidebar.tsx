"use client";

import { Button } from "@/components/ui/button";
import logo from "/public/assets/logo.png";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="flex min-w-[300px] flex-col items-center gap-8 border-r border-solid border-backgroundItems bg-black p-8 text-white">
      <Link href="/">
        <Image src={logo} alt="Gold Informàtica" width={150} height={150} />
      </Link>

      <div className="flex w-full flex-col gap-3">
        <Button variant="secondary" className="flex w-full justify-start gap-2">
          <LayoutDashboardIcon size={16} />
          Dashboard
        </Button>

        <Link href="/dashboard/products">
          <Button
            variant="secondary"
            className={`flex w-full justify-start gap-2 ${
              path.includes("/products") &&
              "bg-primary text-white hover:bg-primary"
            } `}
          >
            <PackageIcon size={16} />
            Produtos
          </Button>
        </Link>

        <Link href="/dashboard/categories">
          <Button
            variant="secondary"
            className={`flex w-full justify-start gap-2 ${
              path.includes("/categories") &&
              "bg-primary text-white hover:bg-primary"
            }`}
          >
            <ListOrderedIcon size={16} />
            Categorias
          </Button>
        </Link>

        <Link href="/dashboard/orders">
          <Button
            variant="secondary"
            className={`flex w-full justify-start gap-2 ${
              path.includes("/orders") &&
              "bg-primary text-white hover:bg-primary"
            }`}
          >
            <PackageSearchIcon size={16} />
            Pedidos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
