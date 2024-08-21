import Loader from "@/components/loader/loader";
import { useGetResumeByIdQuery } from "@/services/resume";
import React from "react";
import { useParams } from "react-router-dom";

const Preview = () => {
  const params = useParams<{ resumeId: string }>();
  const { data, isError, isLoading } = useGetResumeByIdQuery(
    params.resumeId || ""
  );
  if (isLoading) return <Loader />;
  if (!params.resumeId || isError)
    return (
      <div>
        <h1>Preview</h1>
        <p>Resume Id not found</p>
      </div>
    );
  return <div>{data?.data.resume.fullName}</div>;
};

export default Preview;
