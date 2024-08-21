import { Resume } from "@/types";
import { Link, PhoneCall } from "lucide-react";
import { Separator } from "../ui/separator";

const ClassicTemplate = ({ resume }: { resume: Resume }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-start py-2 uppercase">
        {resume.fullName}
      </h1>
      <h2 className="text-xl font-semibold text-start text-zinc-900">
        {resume.headline}
      </h2>
      <div className="grid grid-cols-2">
        {resume.email && (
          <p className="text-sm text-zinc-700 flex gap-2 items-center py-1">
            @ {resume.email}
          </p>
        )}
        {resume.website && (
          <p className="text-sm text-zinc-700 flex gap-2 items-center py-1">
            <Link size={14} /> {resume.website}
          </p>
        )}
        {resume.phone && (
          <p className="text-sm text-zinc-700 flex gap-2 items-center py-1">
            <PhoneCall size={14} /> {resume.phone}
          </p>
        )}
        {resume.location && (
          <p className="text-sm text-zinc-700 flex gap-2 items-center py-1">
            <PhoneCall size={14} /> {resume.location}
          </p>
        )}
      </div>
      <Separator className="my-2" />
      {resume.summary && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-center">Summary</h3>
            <p className="text-sm text-zinc-700 mt-2 text-center">
              {resume.summary}
            </p>
          </div>
          <Separator className="my-2" />
        </>
      )}
    </>
  );
};

export default ClassicTemplate;
