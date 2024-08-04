import React from "react";
import * as z from "zod";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsIcon, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2).max(255),
  avatar: z
    .object({
      url: z.string().url(),
      alt: z.string().min(2).max(255),
      size: z.number().int().min(0).max(100),
      aspectRatio: z.enum(["SQUARE", "PORTRAIT", "LANDSCAPE"]),
      borderRadius: z.enum(["NONE", "SM", "MD", "LG", "FULL"]),
      effects: z.enum(["HIDDEN", "BORDER", "SHADOW", "RING"]),
    })
    .nullable(),
});

type FormValues = z.infer<typeof schema>;

const avatarSettings = {
  size: "Size (px)",
  aspectRatio: ["SQUARE", "PORTRAIT", "LANDSCAPE"],
  borderRadius: ["NONE", "SM", "MD", "LG", "FULL"],
  effects: ["HIDDEN", "BORDER", "SHADOW", "RING"],
} as const;

const AvatarSettings = ({ control }: { control: Control<FormValues> }) => (
  <Menubar className="bg-transparent border-none">
    <MenubarMenu>
      <MenubarTrigger>
        <SettingsIcon className="w-6 h-6" />
      </MenubarTrigger>
      <MenubarContent className="p-2">
        <h4 className="text-sm font-semibold text-zinc-800">Avatar Settings</h4>
        <div className="my-2 space-y-2">
          <div className="flex items-center gap-2 text-sm text-nowrap">
            {avatarSettings.size}
            <FormField
              control={control}
              name="avatar.size"
              render={({ field }) => (
                <Input placeholder="100" {...field} className="w-full h-8" />
              )}
            />
          </div>
          <MenubarSeparator />
          {Object.entries(avatarSettings)
            .slice(1)
            .map(([key, values]) => (
              <React.Fragment key={key}>
                <div className="flex items-center gap-2 text-sm text-nowrap">
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                  <FormField
                    control={control}
                    name={`avatar.${key}` as keyof FormValues}
                    render={({ field }) => (
                      <div className="flex gap-2 items-center">
                        {(values as readonly string[]).map((value) => (
                          <div
                            key={value}
                            className={cn(
                              "rounded-md cursor-pointer bg-slate-500 w-6 h-6 border border-slate-300",
                              value === "PORTRAIT" && "w-6 h-8",
                              value === "LANDSCAPE" && "w-8 h-6",
                              value === "SQUARE" && "w-6 h-6",
                              value === "SM" && "rounded-sm",
                              value === "MD" && "rounded-md",
                              value === "LG" && "rounded-lg",
                              value === "FULL" && "rounded-full",
                              value === "HIDDEN" && "border-none",
                              value === "BORDER" && "border",
                              value === "SHADOW" && "shadow",
                              value === "RING" && "ring-1 border-none",
                              field.value === value
                                ? "bg-slate-300"
                                : "bg-accent"
                            )}
                            onClick={() => field.onChange(value)}
                          />
                        ))}
                      </div>
                    )}
                  />
                </div>
                {key === "effects" ? null : <MenubarSeparator />}
              </React.Fragment>
            ))}
        </div>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
);

const ResumeForm = ({
  resume,
}: {
  resume?: {
    name: string;
  };
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: resume || {
      name: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="p-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <h3 className="text-2xl font-bold text-zinc-900 capitalize flex gap-2 items-center">
            <User2 /> Basics
          </h3>
          <div className="flex justify-between items-baseline w-full">
            <div className="flex gap-2 items-center w-full">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="avatar.url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
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
                  <Input placeholder="shadcn" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ResumeForm;
