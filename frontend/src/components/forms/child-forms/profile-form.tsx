import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { profileSchema } from "../schemas";
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
  useAddProfileMutation,
  useUpdateProfileMutation,
} from "@/services/resume";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Profile, Resume } from "@/types";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

// Separate Add Profile Form Component
const AddProfileForm = ({
  resumeId,
  onUpdate,
}: {
  resumeId: string;
  onUpdate: () => void;
}) => {
  const [addProfile] = useAddProfileMutation();
  const { toast, dismiss } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      network: "",
      username: "",
      url: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const { data, error } = await addProfile({
        resumeId,
        profile: values,
      });

      if (data) {
        toast({
          title: "Success",
          description: "Profile added successfully",
        });
        navigate(`/resume/${resumeId}`);
        onUpdate();
      } else if (error) {
        toast({
          title: "Error",
          description: "Failed to add profile",
        });
      }

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit profile",
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
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <Input placeholder="Github" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-profile.com" {...field} />
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

// Separate Edit Profile Form Component
const EditProfileForm = ({
  profile,
  resumeId,
  onUpdate,
}: {
  profile: Profile;
  resumeId: string;
  onUpdate: () => void;
}) => {
  const [updateProfile] = useUpdateProfileMutation();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      network: profile.network,
      username: profile.username,
      url: profile.url,
    },
  });

  const handleSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const { data, error } = await updateProfile({
        resumeId,
        profile: values,
      });

      if (data) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        onUpdate();
      } else if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit profile",
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
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <Input placeholder="Github" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-profile.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
};

const ProfileForm = ({
  resume,
  onUpdate,
}: {
  resume?: Resume;
  onUpdate: () => void;
}) => {
  const params = useParams<{ id: string }>();
  const resumeId = params.id || "";

  if (!resumeId) return null;

  return (
    <>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Profiles
      </h4>
      {/* Section for Displaying and Updating Profiles */}
      {resume?.profiles?.map((profile, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 p-3 flex justify-center items-center gap-2 text-muted-foreground rounded-md cursor-pointer">
              <Pencil size={16} />
              {profile.network}
            </div>
          </DialogTrigger>
          <DialogContent>
            <AlertDialogHeader>
              <DialogTitle>Edit Social Profile</DialogTitle>
              <DialogDescription>
                Update your profile details below.
              </DialogDescription>
              <EditProfileForm
                profile={profile}
                resumeId={resumeId}
                onUpdate={onUpdate}
              />
            </AlertDialogHeader>
          </DialogContent>
        </Dialog>
      ))}

      {/* Section for Adding a New Profile */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="border-dashed border-2 p-3 flex justify-center items-center gap-2 text-muted-foreground rounded-md cursor-pointer">
            <Plus size={24} /> Add Profile
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Social Profile</DialogTitle>
            <DialogDescription>
              Add a new profile to your resume.
            </DialogDescription>
            <AddProfileForm resumeId={resumeId} onUpdate={onUpdate} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileForm;
