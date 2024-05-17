import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import oauthserver from "koa-oauth-server";
import cors from "@koa/cors";

const app: Koa & { oauth?: any } = new Koa();

// Oauth
// @see https://oauth2-server.readthedocs.io/en/latest/index.html
app.oauth = oauthserver({});

app.use(bodyParser());
app.use(cors());
app.use(app.oauth.authorize());

// Initial route
app.use(async (ctx: Context) => {
  ctx.body = "Hello world";
});

// Application error logging.
app.on("error", console.error);

export default app;
