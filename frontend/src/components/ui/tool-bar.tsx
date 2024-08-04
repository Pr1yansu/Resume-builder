import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "@/components/image/image";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, Settings2 } from "lucide-react";
import { ResumeIcon } from "@radix-ui/react-icons";

const tools = [
  {
    icon: Home,
    link: "/",
    name: "Home",
  },
  {
    icon: ResumeIcon,
    link: "/dashboard",
    name: "Resume",
  },
  {
    icon: Settings2,
    link: "/settings",
    name: "Settings",
  },
];

const Toolbar = () => {
  return (
    <div className="px-2 bg-gray-200 flex flex-col items-center justify-between py-6">
      <Link to={"/"}>
        <Image
          src="/small-logo.png"
          alt="logo"
          width={40}
          height={40}
          className="bg-zinc-300 p-2 rounded-full"
        />
      </Link>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        {tools.map((tool, index) => (
          <TooltipProvider key={index} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={tool.link}
                  key={index}
                  className="p-2 rounded-full hover:bg-gray-300"
                >
                  <tool.icon className="text-gray-700 w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{tool.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Toolbar;
