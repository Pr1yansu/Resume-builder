import Loader from "@/components/loader/loader";
import ClassicTemplate from "@/components/templates/classic";
import { Button } from "@/components/ui/button";
import { useGetResumeByIdQuery } from "@/services/resume";
import { ArrowLeft, Download, Share } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ resumeId: string }>();
  const { data, isError, isLoading } = useGetResumeByIdQuery(
    params.resumeId || ""
  );
  const handleDownload = () => {
    window.print();
  };
  const handleShare = () => {
    navigator.share({
      title: "Resume",
      text: "Check out my resume",
      url: location.pathname,
    });
  };
  if (isLoading) return <Loader />;
  if (!params.resumeId || isError)
    return (
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-screen">
        <div>
          <h1 className="text-2xl font-bold text-center text-primary uppercase">
            Preview
          </h1>
          <p className="text-base font-semibold text-center text-muted-foreground">
            Resume not found
          </p>
        </div>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Go back
          <ArrowLeft className="h-4 w-4 ms-2" />
        </Button>
      </div>
    );
  if (data?.data.resume.variant === "blank")
    return <div>Can not preview a blank resume</div>;
  return (
    <div className="p-2">
      <Helmet>
        <title>{data?.data.resume.fullName} - Resume</title>
      </Helmet>
      <div
        id="no-print"
        className="max-w-screen-xl mx-auto py-6 border-b-2 border-primary px-6"
      >
        <h2 className="text-2xl uppercase font-bold text-center">
          {data?.data.resume.fullName} here is a preview of your resume
        </h2>
        <h2 className="text-2xl uppercase font-bold text-center">
          Click the download button to save or print it.
        </h2>
        <p className="text-center text-sm text-zinc-500 max-w-md mx-auto py-4">
          Note: The download button will open a print dialog. You can save the
          resume as a PDF file.
        </p>
        <div className="flex justify-between gap-4 mt-4">
          <Button onClick={handleDownload}>
            Download
            <Download className="h-4 w-4 ms-2" />
          </Button>
          <Button onClick={handleShare}>
            Share
            <Share className="h-4 w-4 ms-2" />
          </Button>
        </div>
      </div>
      <div
        className="max-w-screen-xl mx-auto shadow-md px-6 py-5 rounded-md my-6 border relative overflow-hidden"
        id="print-area"
      >
        <div className="bg-primary h-2 w-full absolute top-0 left-0 strip"></div>
        {data?.data.resume.variant === "classic" && (
          <ClassicTemplate resume={data?.data.resume} />
        )}
        <div className="bg-primary h-2 w-full absolute bottom-0 left-0 strip"></div>
      </div>
    </div>
  );
};

export default Preview;
