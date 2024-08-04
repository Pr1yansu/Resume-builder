import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { PlusIcon, UpdateIcon, DownloadIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ResumeSelectCard = ({
  type,
  className,
  duration,
  list = false,
  resume,
}: {
  type: "create" | "import" | "update";
  className: string;
  duration: number;
  list?: boolean;
  resume?: {
    name: string;
  };
}) => {
  if (type === "update" && !resume) {
    return null;
  }

  const CardContent = () => (
    <div className="flex items-center justify-center">
      {
        {
          create: (
            <PlusIcon
              className={cn("w-12 h-12 text-zinc-800", list && "w-6 h-6")}
            />
          ),
          import: (
            <DownloadIcon
              className={cn("w-12 h-12 text-zinc-800", list && "w-6 h-6")}
            />
          ),
          update: (
            <UpdateIcon
              className={cn("w-12 h-12 text-zinc-800", list && "w-6 h-6")}
            />
          ),
        }[type]
      }
      <div
        className={cn(
          "absolute bottom-0 left-0 m-4",
          list && "relative mx-4 my-0"
        )}
      >
        <h4 className="text-lg font-semibold text-zinc-800">
          {
            {
              create: "Create New",
              import: "Import Resume",
              update: "Update Resume",
            }[type]
          }
        </h4>
        <p className={cn("text-sm text-zinc-600")}>
          {
            {
              create: "Create a new resume from scratch",
              import: "Import a resume from a file",
              update: `Update ${resume?.name}'s resume`,
            }[type]
          }
        </p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%", scale: list ? 1 : 0.5, opacity: 0 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: duration * 0.5 }}
      >
        {type === "import" ? (
          <Dialog>
            <DialogTrigger asChild>
              <div
                className={cn(
                  className,
                  "flex",
                  "items-center",
                  list ? "" : "justify-center",
                  "cursor-pointer",
                  "hover:shadow-md",
                  "transition-all",
                  "duration-200",
                  "ease-in-out",
                  list ? "" : "h-96",
                  "relative"
                )}
              >
                <CardContent />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Resume</DialogTitle>
                <DialogDescription>
                  Select a file to import your resume.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            to={(type === "create" && "/builder/create") || "/builder/update"}
            className={cn(
              className,
              "flex",
              "items-center",
              list ? "" : "justify-center",
              "cursor-pointer",
              "hover:shadow-md",
              "transition-all",
              "duration-200",
              "ease-in-out",
              list ? "" : "h-96",
              "relative"
            )}
          >
            <CardContent />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeSelectCard;
