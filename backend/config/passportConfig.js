const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://localhost:8077/auth/google/callback",
      scope: ["profile", "email", "openid"],
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;