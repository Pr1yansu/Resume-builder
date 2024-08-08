import Image from "@/components/image/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";

const Login = () => {
  const [holding, setHolding] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");

  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
  };

  const handleGithubSignIn = () => {
    console.log("Github Sign In");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setHolding(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setHolding(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <section>
      <div className="flex min-h-screen">
        <div className="min-w-96 bg-black flex justify-center items-center p-6 text-white">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between mb-16">
              <Image src="/dark-logo.png" alt="logo" className="w-48" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-semibold">
                {tab === "login" ? "Welcome Back!" : "Create an Account"}
              </h4>
              <span className="flex gap-2 items-center text-sm text-zinc-400">
                {tab === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <div
                  onClick={() => {
                    if (tab === "login") {
                      setTab("register");
                    } else {
                      setTab("login");
                    }
                  }}
                  className="flex items-center text-white font-semibold cursor-pointer"
                >
                  {tab === "login" ? "Create one now" : "Sign in"}
                  <ArrowRight className="h-4" />
                </div>
              </span>
              {tab === "login" ? (
                <LoginForm holding={holding} />
              ) : (
                <RegisterForm holding={holding} setTab={setTab} />
              )}
              <div
                className="flex items-center justify-center space-x-2 text-white"
                style={{ userSelect: "none" }}
              >
                <div className="h-[1px] w-1/2 bg-zinc-500" />
                <span className="text-zinc-500 text-xs font-semibold uppercase text-nowrap">
                  or continue with
                </span>
                <div className="h-[1px] w-1/2 bg-zinc-500" />
              </div>
              <div className="flex justify-center items-center gap-2 pt-6">
                <Button
                  className="w-full bg-blue-400 flex justify-center gap-4 items-center hover:bg-blue-500 hover:text-white"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  <Image src="/google.png" alt="google" className="w-5" />
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={handleGithubSignIn}
                  className="w-full bg-zinc-100 flex justify-center gap-4 items-center text-black
                hover:bg-zinc-200 hover:text-black"
                >
                  <Image src="/github.png" alt="github" className="w-5" />
                  Github
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white">
          <Image
            src="/login.jpg"
            alt="login"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
