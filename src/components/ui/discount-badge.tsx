import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { twMerge } from "tailwind-merge";

const DiscountBadge = ({children, className, ...props}: BadgeProps) => {
    return ( 
        <Badge   variant={"secondary"} className={twMerge("px-2 py-[2] ", className)} {...props}>
            <ArrowDownIcon  size={14}/> {children}%
          </Badge>
     );
}
 
export default DiscountBadge;