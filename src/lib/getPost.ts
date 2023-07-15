import { Handler } from "hono";
import { genHTML } from "../util/genHTML";

export const getPost: Handler<
  Env,
  "/profile/:user/post/:post" | "/https://bsky.app/profile/:user/post/:post"
> = async (c) => {
  const { user, post } = c.req.param();
  const agent = c.get("Agent");
  const { data: userData } = await agent.getProfile({
    actor: user,
  });
  const { data: postData } = await agent.getPosts({
    uris: [`at://${userData.did}/app.bsky.feed.post/${post}`],
  });
  return c.html(genHTML(postData.posts[0], c.req.path));
};
