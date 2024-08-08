import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Profile } from "passport-github2";
import { Strategy as GithubStrategy } from "passport-github2";
import User from "../schema/user";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({
        $or: [{ email: username }, { name: username }],
      });

      if (!user) {
        return done(null, false, { message: "User not found or not exists" });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return done(null, false, { message: "Incorrect credentials." });
      }

      return done(null, user);
    } catch (error) {
      return done(null, false, { message: "Server Error" });
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      scope: ["email", "profile"],
      state: true,
    },
    async function (_accessToken, _refreshToken, profile, done) {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }
      const newUser = await User.create({
        email: profile.emails![0].value,
        name: profile.displayName,
        googleId: profile.id,
        avatar: profile.photos![0].value,
      });
      return done(null, newUser);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
    },
    async function (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) {
      const user = await User.findOne({ githubId: profile.id });
      if (user) {
        return done(null, user);
      }
      const newUser = await User.create({
        email: profile.emails![0].value,
        name: profile.username,
        githubId: profile.id,
        avatar: profile.photos![0].value,
      });
      return done(null, newUser);
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id: string, done) {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
