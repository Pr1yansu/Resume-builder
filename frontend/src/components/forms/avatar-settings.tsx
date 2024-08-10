import { FormValues } from "./resume-form";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { SettingsIcon } from "lucide-react";
import { FormField } from "../ui/form";
import React from "react";
import { cn } from "@/lib/utils";

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
                            onClick={() =>
                              field.onChange(field.value === value ? "" : value)
                            }
                            onDoubleClick={() => field.onChange("")}
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

export { AvatarSettings };
