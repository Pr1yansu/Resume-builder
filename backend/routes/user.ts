import express from "express";
import passport from "passport";
import { checkAuthenticated } from "../middleware/auth";
import { create, profile, verifyMail } from "../controllers/user";

const router = express.Router();

router.get("/login/google", passport.authenticate("google"));

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    return res.redirect("/");
  }
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/login", function (req, res, next) {
  passport.authenticate(
    "local",
    function (
      err: Error | null,
      user: Express.User | null,
      info: { message: string }
    ) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Server Error", status: 500, redirect: "/login" });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info.message, status: 401, redirect: "/login" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Server Error", status: 500, redirect: "/login" });
        }
        return res
          .status(200)
          .json({ message: "Success", status: 200, redirect: "/dashboard" });
      });
    }
  )(req, res, next);
});

router.post("/register", create);

router.get("/profile", checkAuthenticated, profile);

router.get("/verify-mail", verifyMail);

router.get("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return res.status(500).json({ message: "Server Error", status: 500 });
    }
  });
  return res.redirect(process.env.CLIENT_URL!);
});

export default router;
