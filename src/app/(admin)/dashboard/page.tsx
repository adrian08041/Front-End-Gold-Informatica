import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./components/summary";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-8 p-5 text-white">
        <Badge className="w-fit gap-1 border-2 border-dourado px-3 py-[0.375rem] text-base uppercase">
          <LayoutDashboardIcon size={18} />
          Dashboard
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-4 p-5 text-white">
        {/* pedidos */}
        <Link href="/dashboard/orders">
          <SummaryCard>
            <div className="flex items-center justify-center gap-1">
              <SummaryCardIcon>
                <PackageSearchIcon size={24} />
              </SummaryCardIcon>
              <SummaryCardValue>600</SummaryCardValue>
            </div>
            <div className="flex items-center justify-center">
              <SummaryCardTitle>Total de pedidos</SummaryCardTitle>
            </div>
          </SummaryCard>
        </Link>

        {/* produtos */}
        <Link href="/dashboard/products">
          <SummaryCard>
            <div className="flex items-center justify-center">
              <SummaryCardIcon>
                <PackageIcon size={24} />
              </SummaryCardIcon>
              <SummaryCardValue>60</SummaryCardValue>
            </div>
            <div className="flex items-center justify-center">
              <SummaryCardTitle>Produtos</SummaryCardTitle>
            </div>
          </SummaryCard>
        </Link>

        {/* categorias */}
        <Link href="/dashboard/categories">
          <SummaryCard>
            <div className="flex items-center justify-center">
              <SummaryCardIcon>
                <ListOrderedIcon size={24} />
              </SummaryCardIcon>
              <SummaryCardValue>6</SummaryCardValue>
            </div>
            <div className="flex items-center justify-center">
              <SummaryCardTitle>Categorias</SummaryCardTitle>
            </div>
          </SummaryCard>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
