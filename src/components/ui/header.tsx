import { HomeIcon, ListOrderedIcon, LogInIcon, MenuIcon, Percent, PercentIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { SheetContent, Sheet, SheetTrigger, SheetHeader } from "./sheet";

const Header = () => {
  return (
    <Card className="flex items-center justify-between p-5 p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
        <Button size="icon" variant="outline">
        <MenuIcon />
      </Button>
        </SheetTrigger>
        
        
        <SheetContent side={"left"}>
            <SheetHeader className="text-lg font-semibold">Menu</SheetHeader>
            
            <div className="mt-2 flex gap-2 flex-col">
                
                <Button variant={"outline"} className="w-full justify-start gap-2">
                    <LogInIcon />
                    Fazer Login
                </Button>
                <Button variant={"outline"} className="w-full justify-start gap-2">
                    <HomeIcon size={16}/>
                    Inicio
                </Button>
                <Button variant={"outline"} className="w-full justify-start gap-2">
                    <PercentIcon size={16}/>
                    Ofertas
                </Button>
                <Button variant={"outline"} className="w-full justify-start gap-2">
                    <ListOrderedIcon size={16}/>
                    Catàlago
                </Button>
                
            </div>

            
        
        
        </SheetContent>
      </Sheet>

      
      
      
      <h1 className="text-2xl font-bold">Gold Informàtica</h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
