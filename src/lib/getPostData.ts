import { Handler } from "hono";

export const getPostData: Handler<
  Env,
  | "/profile/:user/post/:post/json"
  | "/https://bsky.app/profile/:user/post/:post/json"
> = async (c) => {
  const { user, post } = c.req.param();
  const agent = c.get("Agent");
  const { data: userData } = await agent.getProfile({
    actor: user,
  });
  const { data } = await agent.getPosts({
    uris: [`at://${userData.did}/app.bsky.feed.post/${post}`],
  });
  return c.json(data);
};
