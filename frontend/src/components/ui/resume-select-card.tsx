import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import React from "react";

const ResumeSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name is too short"),
  slug: z
    .string({
      required_error: "Slug is required",
    })
    .min(3, "Slug is too short"),
});

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
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof ResumeSchema>>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResumeSchema>) {
    try {
      setLoading(true);
      console.log(values);
      navigate("/builder/create");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
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
        {type === "import" && (
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
        )}
        {type === "create" && (
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
                <DialogTitle>
                  <>
                    <Plus className="w-6 h-6 inline-flex mr-2" />
                    Create New Resume
                  </>
                </DialogTitle>
                <DialogDescription>
                  Start creating your resume from scratch.
                </DialogDescription>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resume Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Demo Resume" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your Resume's name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resume Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="Demon Slug" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your Resume's slug.(Anything unique)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-end">
                        <Button type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 className="w-6 h-6 inline-block animate-spin" />
                            </>
                          ) : (
                            "Create +"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {type === "update" && (
          <Link
            to={"/builder/update"}
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
