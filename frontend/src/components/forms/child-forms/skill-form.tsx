import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { skillSchema } from "../schemas";
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
import { useAddSkillMutation, useUpdateSkillMutation } from "@/services/resume";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Skill, Resume } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const AddSkillForm = ({
  resumeId,
  onUpdate,
  setOpen,
}: {
  resumeId: string;
  onUpdate: () => void;
  setOpen: (value: boolean) => void;
}) => {
  const [addSkill] = useAddSkillMutation();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      level: undefined,
      description: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof skillSchema>) => {
    try {
      const { data, error } = await addSkill({
        resumeId,
        skill: {
          _id: "",
          name: values.name,
          level: values.level,
          description: values.description,
          hidden: false,
        },
      });

      if (data) {
        toast({
          title: "Success",
          description: "Skill added successfully",
        });
        onUpdate();
        setOpen(false);
      } else if (error) {
        toast({
          title: "Error",
          description: "Failed to add skill",
        });
      }

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit skill",
      });
    } finally {
      setTimeout(dismiss, 5000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input placeholder="JavaScript" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="3 years of experience..." {...field} />
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

const EditSkillForm = ({
  skill,
  resumeId,
  onUpdate,
  setOpen,
}: {
  skill: Skill;
  resumeId: string;
  onUpdate: () => void;
  setOpen: (value: boolean) => void;
}) => {
  const [updateSkill] = useUpdateSkillMutation();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: skill.name,
      level: skill.level,
      description: skill.description,
    },
  });

  const handleSubmit = async (values: z.infer<typeof skillSchema>) => {
    try {
      const { data, error } = await updateSkill({
        resumeId,
        skillId: skill._id,
        skill: {
          _id: skill._id,
          name: values.name,
          level: values.level,
          description: values.description,
          hidden: skill.hidden,
        },
      });

      if (data) {
        toast({
          title: "Success",
          description: "Skill updated successfully",
        });
        onUpdate();
        setOpen(false);
      } else if (error) {
        toast({
          title: "Error",
          description: "Failed to update skill",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit skill",
      });
    } finally {
      setTimeout(dismiss, 5000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input placeholder="JavaScript" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="3 years of experience..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Skill</Button>
      </form>
    </Form>
  );
};

const SkillForm = ({
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
        Skills
      </h4>
      {resume?.skills?.map((skill, index) => (
        <Dialog key={index} open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 p-3 flex justify-center items-center gap-2 text-muted-foreground rounded-md cursor-pointer">
              <Pencil size={16} />
              {skill.name}
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
              <EditSkillForm
                skill={skill}
                resumeId={resumeId}
                onUpdate={onUpdate}
                setOpen={setOpen}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <div className="border-dashed border-2 p-3 flex justify-center items-center gap-2 text-muted-foreground rounded-md cursor-pointer">
            <Plus size={24} /> Add Skill
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <AddSkillForm
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

export default SkillForm;
