import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/services/user";
import { useState } from "react";

const loginFormSchema = z.object({
  search: z.string().min(2).max(255),
  password: z.string().min(4),
});

const LoginForm = ({ holding }: { holding: boolean }) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      search: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true);
      const { message, status, redirect } = await login({
        password: values.password,
        username: values.search,
      }).unwrap();
      if (status === 200) {
        console.log("Login Success");
        return;
      }
      navigate(redirect);
      console.log(message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-8">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
                <span className="mx-1 text-zinc-500">or</span>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="user@user.com or username"
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
        <div className="pt-8 flex gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/90"
          >
            Sign in
          </Button>
          <Link to="/forgot-password" className="w-full">
            <Button
              type="button"
              disabled={loading}
              className=" bg-black text-white hover:bg-black/90"
            >
              Forgot Password?
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
