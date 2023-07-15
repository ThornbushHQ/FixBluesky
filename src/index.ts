import { Hono } from "hono";
import { BskyAgent } from "@atproto/api";
import { getPost } from "./lib/getPost";
import { getPostData } from "./lib/getPostData";
import { getPostOEmbed } from "./lib/getPostOEmbed";

const app = new Hono<Env>();

app.use("*", async (c, next) => {
  const agent = new BskyAgent({ service: c.env.BSKY_SERVICE_URL });
  await agent.login({
    identifier: c.env.BSKY_AUTH_USERNAME,
    password: c.env.BSKY_AUTH_PASSWORD,
  });
  c.set("Agent", agent);
  return next();
});

app.get("/", async (c) => {
  return c.redirect("https://github.com/ThornbushHQ/FixBluesky");
});

app.get("/profile/:user/post/:post", getPost);
app.get("/https://bsky.app/profile/:user/post/:post", getPost);

app.get("/profile/:user/post/:post/json", getPostData);
app.get("/https://bsky.app/profile/:user/post/:post/json", getPostData);

app.get("/oembed", getPostOEmbed);

export default app;
