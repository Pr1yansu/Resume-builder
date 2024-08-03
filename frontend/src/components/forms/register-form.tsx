import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z.object({
  username: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const RegisterForm = ({
  holding,
  setTab,
}: {
  holding: boolean;
  setTab: React.Dispatch<React.SetStateAction<"login" | "register">>;
}) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  className="bg-black text-white border-zinc-700 placeholder:text-zinc-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@user.gmail"
                  {...field}
                  className="bg-black text-white border-zinc-700 placeholder:text-zinc-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={holding ? "text" : "password"}
                  placeholder="********"
                  {...field}
                  className="bg-black text-white border-zinc-700 placeholder:text-zinc-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type={holding ? "text" : "password"}
                  placeholder="********"
                  {...field}
                  className="bg-black text-white border-zinc-700 placeholder:text-zinc-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-8 flex gap-2">
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-white/90"
          >
            Register
          </Button>
          <Button
            type="button"
            className="w-full bg-black text-white hover:bg-black/90"
            onClick={() => setTab("login")}
          >
            Already have an account?
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
