import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";
import Section from "@/components/ui/section";
import ResumeSelectCard from "@/components/ui/resume-select-card";
import { Helmet } from "react-helmet";

const resume = {
  name: "John Doe",
};

const ResumeSelectCardType = [
  {
    type: "create",
    className: "bg-gray-200 p-4 rounded-md",
  },
  {
    type: "import",
    className: "bg-gray-200 p-4 rounded-md",
  },
  {
    type: "update",
    resume: resume,
    className: "bg-gray-200 p-4 rounded-md",
  },
];

const Dashboard = () => {
  const [columnType, setColumnType] = React.useState<"grid" | "list">("grid");

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Section>
        <div className="w-full flex">
          <div className="w-full my-2">
            <div className="flex items-center justify-between my-2">
              <h4 className="text-3xl font-bold uppercase">Resumes</h4>
              <div>
                <Select
                  onValueChange={(value) =>
                    setColumnType(value as "grid" | "list")
                  }
                  value={columnType}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">
                      <div className="flex items-center text-zinc-700">
                        <DashboardIcon className="mr-2" />
                        Grid
                      </div>
                    </SelectItem>
                    <SelectItem value="list">
                      <div className="flex items-center text-zinc-700">
                        <ListBulletIcon className="mr-2" />
                        List
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {columnType === "grid" && (
              <div className={cn("grid", "grid-cols-4", "gap-2")}>
                {ResumeSelectCardType.map((card, index) => (
                  <ResumeSelectCard
                    key={index}
                    type={card.type as "create" | "import" | "update"}
                    resume={card.resume}
                    duration={index}
                    className={card.className}
                  />
                ))}
              </div>
            )}
            {columnType === "list" && (
              <div className={cn("grid", "grid-cols-1", "gap-2")}>
                {ResumeSelectCardType.map((card, index) => (
                  <ResumeSelectCard
                    key={index}
                    type={card.type as "create" | "import" | "update"}
                    resume={card.resume}
                    list
                    duration={index}
                    className={card.className}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Dashboard;
