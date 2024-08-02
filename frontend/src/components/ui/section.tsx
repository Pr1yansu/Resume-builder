import { cn } from "@/lib/utils";
import React from "react";

const Section = ({
  children,
  fullBackground = "transparent",
  noContainer,
}: {
  children: React.ReactNode;
  fullBackground?: string;
  noContainer?: boolean;
}) => {
  return (
    <section className={cn("py-4 my-4", fullBackground)}>
      <div className={cn("mx-auto px-4", noContainer ? "w-full" : "container")}>
        {children}
      </div>
    </section>
  );
};

export default Section;
