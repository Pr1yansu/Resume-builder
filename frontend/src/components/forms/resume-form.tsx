import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { AvatarSettings } from "./avatar-settings";
import ProfileForm from "./child-forms/profile-form";
import ExperienceForm from "./child-forms/experience-form";
import SkillForm from "./child-forms/skill-form";
import LanguageForm from "./child-forms/language-form";
import ProjectForm from "./child-forms/project-form";
import CustomFieldForm from "./child-forms/custom-field-form";
import CustomSectionForm from "./child-forms/custom-section-form";
import EducationForm from "./child-forms/education-form";
import { resumeSchema } from "./schemas";

export type FormValues = z.infer<typeof resumeSchema>;

const ResumeForm = ({ resume }: { resume?: Partial<FormValues> }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume || {
      name: "",
      headline: "",
      email: "",
      website: "",
      phone: "",
      location: "",
      avatar: {
        url: "",
        alt: "",
        size: 100,
        aspectRatio: "SQUARE",
        borderRadius: "NONE",
        effects: "HIDDEN",
      },
      summary: "",
      customFields: [],
      customSections: [],
      education: [],
      experiences: [],
      languages: [],
      profiles: [],
      projects: [],
      skills: [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <ScrollArea className="h-screen rounded-md border p-4">
      <div className="p-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-2xl font-bold text-zinc-900 capitalize flex gap-2 items-center">
              <User2 /> Basics
            </h3>
            <div className="flex justify-between items-baseline w-full">
              <div className="flex gap-2 items-center w-full">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={form.watch("avatar.url")} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="avatar.url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AvatarSettings control={form.control} />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Headline"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid-cols-2 grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://yourwebsite.com"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Country"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary about yourself"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="mt-2 space-y-2">
          <ProfileForm />
          <ExperienceForm />
          <SkillForm />
          <LanguageForm />
          <ProjectForm />
          <CustomFieldForm />
          <CustomSectionForm />
          <EducationForm />
        </div>
      </div>
    </ScrollArea>
  );
};

export default ResumeForm;
