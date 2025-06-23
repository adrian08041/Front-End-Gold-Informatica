import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return <div className="pl-5 font-bold uppercase text-white" {...props}>{children}</div>;
};

export default SectionTitle;
