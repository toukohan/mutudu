const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) return done(null, false);
        if (!(await bcrypt.compare(password, user.password)))
          return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
