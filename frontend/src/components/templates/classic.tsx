import { Resume } from "@/types";
import { Link, PhoneCall } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { IconPickerItem } from "react-icons-picker";

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
      <div className="flex justify-between">
        {resume.profiles && resume.profiles.length > 0 && (
          <>
            <div className="w-1/3">
              <h3 className="text-lg font-semibold text-start">Profiles</h3>
              <ul className="text-sm text-zinc-700 mt-2 text-center flex justify-between flex-wrap gap-4">
                {resume.profiles.map((profile, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(profile.url && "text-blue-500")}
                    >
                      <IconPickerItem
                        value={profile.icon}
                        size={14}
                        color="#000000"
                      />
                    </a>
                    <span>{profile.network}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {resume.experiences && resume.experiences.length > 0 && (
          <>
            <div>
              <h3 className="text-lg font-semibold text-end">Experience</h3>
              <ul className="text-sm text-zinc-700 text-end">
                {resume.experiences.map((experience, index) => (
                  <li key={index}>
                    <div className="text-zinc-700">
                      <h4 className="text-base font-semibold text-zinc-800">
                        {experience.title}
                      </h4>
                      <p className="text-sm text-zinc-700">
                        {experience.company} | {experience.location}
                      </p>
                      <p className="text-sm text-zinc-700">
                        {new Date(experience.startDate).toLocaleDateString()} -
                        {experience.endDate
                          ? new Date(experience.endDate).toLocaleDateString()
                          : "Present"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-700">
                        {experience.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ClassicTemplate;
