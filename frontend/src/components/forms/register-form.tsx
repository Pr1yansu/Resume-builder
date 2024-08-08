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
import { useCreateUserMutation, useLoginMutation } from "@/services/user";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const registerFormSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  address: z.string().min(4),
});

const RegisterForm = ({
  holding,
  setTab,
}: {
  holding: boolean;
  setTab: React.Dispatch<React.SetStateAction<"login" | "register">>;
}) => {
  const [createUser] = useCreateUserMutation();
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      setLoading(true);
      const response = await createUser(values).unwrap();
      if (response.status === 201) {
        const { data } = await login({
          password: values.password,
          username: values.email,
        });
        if (data?.status === 200) {
          console.log("Login Success");
          return;
        }
        throw new Error(data?.message);
      }
      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-8">
        <FormField
          control={form.control}
          name="name"
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
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="address"
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
            disabled={loading}
          >
            Register
          </Button>
          <Button
            type="button"
            className="w-full bg-black text-white hover:bg-black/90"
            onClick={() => setTab("login")}
            disabled={loading}
          >
            Already have an account?
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
