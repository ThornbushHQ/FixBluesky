import { Handler } from "hono";

export const getPostOEmbed: Handler<Env, "/oembed"> = async (c) => {
  const { handle, display_name, avatar } = c.req.query();
  return c.json({
    author_name: `${display_name} (@${handle})`,
    author_url: `https://bsky.app/profile/${handle}`,
    provider_name: "FixBluesky",
    provider_url: "https://bsyy.app/",
    thumbnail_url: avatar,
    thumbnail_width: 1000,
    thumbnail_height: 1000,
  });
};
