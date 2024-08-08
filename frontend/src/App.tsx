import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/loader/loader";
import AuthGuard from "@/guard/auth-guard";
import LoginGuard from "@/guard/login-guard";
const Home = React.lazy(() => import("@/pages/home"));
const Builder = React.lazy(() => import("@/pages/builder"));
const Login = React.lazy(() => import("@/pages/login"));
const Dashboard = React.lazy(() => import("@/pages/dashboard"));

const App = () => {
  useEffect(() => {
    const shadow = document.createElement("div");
    shadow.classList.add("shadow-top");
    shadow.style.position = "fixed";
    shadow.style.top = "0";
    shadow.style.left = "0";
    shadow.style.right = "0";
    shadow.style.height = "10vh";
    shadow.classList.add(
      "bg-gradient-to-b",
      "from-slate-200",
      "to-transparent"
    );
    shadow.style.pointerEvents = "none";
    shadow.style.opacity = "0";
    shadow.style.transition = "opacity 0.3s";

    document.body.appendChild(shadow);

    const handleScroll = () => {
      shadow.style.opacity = window.scrollY > 0 ? "1" : "0";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.removeChild(shadow);
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <LoginGuard>
                <Login />
              </LoginGuard>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <LoginGuard>
                <Login />
              </LoginGuard>
            }
          />
          <Route
            path="/builder/create"
            element={
              <AuthGuard>
                <Builder />
              </AuthGuard>
            }
          />
          <Route
            path="/builder/update"
            element={
              <AuthGuard>
                <Builder />
              </AuthGuard>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
