import passport from "passport";
import { Strategy as CasStrategy } from "passport-cas";


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

passport.use(
  new CasStrategy(
    {
      version: "CAS3.0",
      ssoBaseURL: "https://localhost:8443/cas", 
      serverBaseURL: "http://localhost:5000",  
      validateURL: "/serviceValidate",         
    },
    (profile, done) => {
      const user = { id: profile.user, username: profile.user };
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = { id, username: id };
  done(null, user);
});

export const casLogin = passport.authenticate("cas");

export const casCallback = (req, res, next) => {
  passport.authenticate("cas", { failureRedirect: "/" }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/");
    req.logIn(user, (err) => {
      if (err) return next(err);
      
      res.redirect("/dashboard");
    });
  })(req, res, next);
};

export const authStatus = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Non authentifié" });
  }
};

export const logout = (req, res) => {
  req.logout(() => res.redirect("/"));
};
