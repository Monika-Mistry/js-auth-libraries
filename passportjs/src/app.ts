import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import Router from "koa-router";

const app: Koa = new Koa();
const router = new Router();
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://www.example.com/oauth2/authorize",
      tokenURL: "https://www.example.com/oauth2/token",
      clientID: EXAMPLE_CLIENT_ID,
      clientSecret: EXAMPLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/example/callback",
    },
    function (_accessToken, _refreshToken, profile, cb) {
      User.findOrCreate({ exampleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use(bodyParser());

// Initial route
app.use(async (ctx: Context) => {
  ctx.body = "Hello world";
});

router.get("/auth/example", passport.authenticate("oauth2"));
router.get(
  "/auth/example/callback",
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
  function (_req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
app.use(router.routes()).use(router.allowedMethods());
// Application error logging.
app.on("error", console.error);

export default app;
