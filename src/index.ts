import { Hono } from "hono";
import { BskyAgent } from "@atproto/api";
import { getPost } from "./routes/getPost";
import { getPostData } from "./routes/getPostData";
import { getOEmbed } from "./routes/getOEmbed";
import { getProfileData } from "./routes/getProfileData";
import { getProfile } from "./routes/getProfile";
import { HTTPException } from "hono/http-exception";

const app = new Hono<Env>();

app.get("/", async (c) => {
  return c.redirect("https://github.com/ThornbushHQ/FixBluesky");
});

app.use("*", async (c, next) => {
  console.log("hi");
  const agent = new BskyAgent({
    service: c.env.BSKY_SERVICE_URL,
    persistSession: async (_evt, session) => {
      if (session) {
        await c.env.KV.put("session", JSON.stringify(session));
      }
    },
  });
  try {
    const rawSession = await c.env.KV.get("session");
    if (rawSession) {
      const session = JSON.parse(rawSession);
      const login = await agent.resumeSession(session);
      if (!login.success) {
        await agent.login({
          identifier: c.env.BSKY_AUTH_USERNAME,
          password: c.env.BSKY_AUTH_PASSWORD,
        });
      }
    } else {
      await agent.login({
        identifier: c.env.BSKY_AUTH_USERNAME,
        password: c.env.BSKY_AUTH_PASSWORD,
      });
    }
    c.set("Agent", agent);
  } catch (error) {
    const err = new Error("Failed to login to Bluesky!", {
      cause: error,
    });
    throw new HTTPException(500, {
      message: `${err.message} \n\n ${err.cause} \n\n ${err.stack}`,
    });
  }
  return next();
});

app.get("/profile/:user/post/:post", getPost);
app.get("/https://bsky.app/profile/:user/post/:post", getPost);

app.get("/profile/:user/post/:post/json", getPostData);
app.get("/https://bsky.app/profile/:user/post/:post/json", getPostData);

app.get("/profile/:user", getProfile);
app.get("/https://bsky.app/profile/:user", getProfile);

app.get("/profile/:user/json", getProfileData);
app.get("/https://bsky.app/profile/:user/json", getProfileData);

app.get("/oembed", getOEmbed);

export default app;
