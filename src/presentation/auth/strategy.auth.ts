import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { envs } from "../../config/plugins/envs.plugin";
import { prisma } from "../../config/data/postgres";

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: envs.GOOGLE_CLIENT_ID || "",
      clientSecret: envs.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err: any, user?: any) => void
    ) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

// Middleware para verificar autenticación
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.redirect("/");
}

// Middleware para verificar si el correo está registrado
async function isEmailRegistered(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = (req.user as any)?.email;
  const user = await prisma.user.findFirst({
    where: {
      mail: email,
    },
  });
  if (user) {
    return next();
  }
  res.status(403).send("Access denied: Email not registered.");
}

app.get("/", (req: Request, res: Response) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/profile");
  }
);

// Ruta protegida
app.get(
  "/profile",
  isAuthenticated,
  isEmailRegistered,
  (req: Request, res: Response) => {
    res.send(`Welcome ${req.user ? (req.user as any).displayName : "Guest"}`);
  }
);

app.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log(`Server is running at port http://localhost:3000`);
});
