import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Toolbar from "@/components/ui/tool-bar";
import ResumeForm from "@/components/forms/resume-form";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useGetResumeByIdQuery } from "@/services/resume";
import Preview from "@/components/preview/preview";
import Loader from "@/components/loader/loader";

import React from "react";
import VariantSelector from "@/components/ui/variant-selector";

const Builder = () => {
  const { id } = useParams<{
    id: string | undefined;
  }>();

  const { data, isLoading, refetch } = useGetResumeByIdQuery(id || "");

  const handleUpdate = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Build Your Own Resume</title>
      </Helmet>
      <section className="relative z-50 min-h-screen">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          <ResizablePanel defaultSize={30} className="flex">
            <Toolbar />
            <ResumeForm resume={data?.data.resume} onUpdate={handleUpdate} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={55}
            className="h-screen w-full min-w-[650px]"
          >
            <div className="flex justify-center items-center p-2 h-full w-full relative">
              <Preview resume={data?.data.resume} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={15} className="h-screen w-full">
            <VariantSelector
              variant={data?.data.resume.variant || "blank"}
              onUpdate={handleUpdate}
              resumeId={id || ""}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </>
  );
};

export default Builder;
