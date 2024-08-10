import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Toolbar from "@/components/ui/tool-bar";
import ResumeForm from "@/components/forms/resume-form";
import { Helmet } from "react-helmet";

const Builder = ({
  resume,
}: {
  resume?: {
    name: string;
  };
}) => {
  return (
    <>
      <Helmet>
        <title>Build Your Own Resume</title>
      </Helmet>
      <section className="relative z-50 min-h-screen">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          <ResizablePanel defaultSize={35} className="flex min-w-96">
            <Toolbar />
            <ResumeForm resume={resume} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={65}
            className="h-full w-full"
          ></ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </>
  );
};

export default Builder;
