import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return <p className="pl-5 font-bold uppercase text-white" {...props}>{children}</p>;
};

export default SectionTitle;
