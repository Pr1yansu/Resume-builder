import { Resume } from "@/types";
import { Button } from "../ui/button";
import { Copy, Download, Share } from "lucide-react";
import ClassicTemplate from "../templates/classic";
// @ts-expect-error - no types available
import html2pdf from "html2pdf.js";

const Preview = ({ resume }: { resume?: Resume }) => {
  const downloadResume = async () => {
    try {
      const element = document.getElementById("resume-preview");
      element?.style.setProperty("width", "21cm", "important");
      if (element) {
        await html2pdf()
          .from(element)
          .set({
            filename: `${resume?.fullName || "resume"}.pdf`,
            image: { quality: 0.98, type: "png" },
            html2canvas: { scale: 2 },
            jsPDF: { format: "letter", orientation: "portrait" },
          })
          .save();
      }
    } catch (error) {
      console.error(error);
    } finally {
      const element = document.getElementById("resume-preview");
      element?.style.setProperty("width", "650px", "important");
    }
  };

  if (!resume)
    return (
      <div className="w-[650px] h-[830px] bg-white shadow-md rounded-lg"></div>
    );

  return (
    <div className=" flex justify-center items-center">
      {resume.variant === "blank" && (
        <div
          id="resume-preview"
          className="w-[650px] h-[830px] bg-white shadow-md p-8"
        />
      )}
      {resume.variant === "classic" && (
        <div
          id="resume-preview"
          className="w-[650px] h-[830px] bg-white shadow-md p-6"
        >
          <ClassicTemplate resume={resume} />
        </div>
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
              url: window.location.href + "/preview",
            });
          }}
          size="icon"
        >
          <Share className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href + "/preview");
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
