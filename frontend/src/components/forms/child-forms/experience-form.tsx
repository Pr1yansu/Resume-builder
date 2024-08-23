import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { experienceSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  useAddExperienceMutation,
  useUpdateExperienceMutation,
} from "@/services/resume";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Experience, Resume } from "@/types";
import React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";

const AddExperienceForm = ({
  resumeId,
  onUpdate,
  setOpen,
}: {
  resumeId: string;
  onUpdate: () => void;
  setOpen: (value: boolean) => void;
}) => {
  const [addExperience] = useAddExperienceMutation();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      description: "",
      endDate: new Date(),
      hidden: false,
      location: "",
      startDate: new Date(),
      title: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof experienceSchema>) => {
    try {
      const { data, error } = await addExperience({
        resumeId,
        experience: {
          _id: "",
          company: values.company,
          description: values.description,
          startDate: values.startDate,
          location: values.location,
          endDate: values.endDate,
          title: values.title,
          hidden: false,
        },
      });

      if (data) {
        toast({
          title: "Success",
          description: "Experience added successfully",
        });
        onUpdate();
      } else if (error) {
        toast({
          title: "Error",
          description: "Failed to add experience",
        });
      }

      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit experience",
      });
    } finally {
      setTimeout(dismiss, 5000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const EditExperienceForm = ({
  experience,
  resumeId,
  onUpdate,
  setOpen,
}: {
  experience: Experience;
  resumeId: string;
  onUpdate: () => void;
  setOpen: (value: boolean) => void;
}) => {
  const [updateExperience] = useUpdateExperienceMutation();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: experience.company,
      startDate: new Date(experience.startDate),
      endDate: new Date(experience.endDate || new Date()),
      hidden: experience.hidden,
      location: experience.location,
      title: experience.title,
      description: experience.description,
    },
  });

  const handleSubmit = async (values: z.infer<typeof experienceSchema>) => {
    try {
      const { data, error } = await updateExperience({
        resumeId,
        experienceId: experience._id,
        experience: {
          _id: experience._id,
          company: values.company,
          description: values.description,
          startDate: values.startDate,
          endDate: values.endDate,
          hidden: experience.hidden,
          location: values.location,
          title: values.title,
        },
      });

      if (data) {
        toast({
          title: "Success",
          description: "Experience updated successfully",
        });
        onUpdate();
        setOpen(false);
      } else if (error) {
        toast({
          title: "Error",
          description: "Failed to update experience",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit experience",
      });
    } finally {
      setTimeout(dismiss, 5000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const ExperienceForm = ({
  resume,
  onUpdate,
}: {
  resume?: Resume;
  onUpdate: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const params = useParams<{ id: string }>();
  const resumeId = params.id || "";

  if (!resumeId) return null;

  return (
    <>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Experience
      </h4>
      {resume?.experiences?.map((experience, index) => (
        <Dialog key={index} open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 p-3 flex justify-center items-center gap-2 text-muted-foreground rounded-md cursor-pointer">
              <Pencil size={16} />
              {experience.company}
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Experience</DialogTitle>
              <DialogDescription>
                Update your experience details below.
              </DialogDescription>
              <EditExperienceForm
                experience={experience}
                resumeId={resumeId}
                onUpdate={onUpdate}
                setOpen={setOpen}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}

      {/* Section for Adding a New Experience */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="border-dashed border-2 p-3 flex justify-center items-center gap-2 text-muted-foreground rounded-md cursor-pointer">
            <Plus size={24} /> Add Experience
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>
              Add a new experience to your resume.
            </DialogDescription>
            <AddExperienceForm
              resumeId={resumeId}
              onUpdate={onUpdate}
              setOpen={setOpen}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceForm;
