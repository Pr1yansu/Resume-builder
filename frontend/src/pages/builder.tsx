import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Toolbar from "@/components/ui/tool-bar";
import ResumeForm from "@/components/forms/resume-form";

const Builder = ({
  resume,
}: {
  resume?: {
    name: string;
  };
}) => {
  return (
    <section className="relative z-50 min-h-screen">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={25} className="flex min-w-96">
          <Toolbar />
          <ResumeForm resume={resume} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={75}
          className="h-full w-full"
        ></ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default Builder;
