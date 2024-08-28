import { Resume } from "@/types";
import { Button } from "../ui/button";
import { Copy, Download, Share } from "lucide-react";
import ClassicTemplate from "../templates/classic";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";

const Preview = ({ resume }: { resume?: Resume }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const downloadResume = async () => {
    navigate(`${pathname}/preview`);
  };

  if (!resume)
    return (
      <div className="w-[650px] h-[830px] bg-white shadow-md rounded-lg"></div>
    );

  return (
    <div className=" flex justify-center items-center">
      {resume.variant === "blank" && (
        <div className="w-[650px] h-[830px] bg-white shadow-md p-8" />
      )}
      {resume.variant === "classic" && (
        <ScrollArea
          id="resume-preview"
          className="w-[650px] h-[830px] bg-white shadow-md p-6 rounded-md"
        >
          <ClassicTemplate resume={resume} />
        </ScrollArea>
      )}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button size="icon" onClick={downloadResume}>
          <Download className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            navigator.share({
              title: "Resume",
              text: "Check out my resume",
              url: pathname + "/preview",
            });
          }}
          size="icon"
        >
          <Share className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(pathname + "/preview");
          }}
          size="icon"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Preview;
