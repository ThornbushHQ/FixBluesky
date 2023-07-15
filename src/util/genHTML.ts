import {
  AppBskyFeedDefs,
  AppBskyEmbedImages,
  AppBskyFeedPost,
} from "@atproto/api";
import { html } from "hono/html";

export function genHTML(post: AppBskyFeedDefs.PostView, url: string) {
  const removeLeadingSlash = url.substring(1);
  const redirectUrl = removeLeadingSlash.startsWith("https://")
    ? removeLeadingSlash
    : `https://bsky.app/${removeLeadingSlash}`;
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="canonical" href="${url.substring(1)}" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta content="#0085ff" name="theme-color" />
        <meta property="og:site_name" content="FixBluesky" />
        <meta name="twitter:creator" content="@${post.author.handle}" />
        <meta
          property="og:description"
          content="${AppBskyFeedPost.isRecord(post.record) && post.record.text}"
        />

        ${AppBskyEmbedImages.isView(post.embed) &&
        html`<meta name="twitter:card" content="summary_large_image" />`}
        <meta
          property="og:image"
          content="${AppBskyEmbedImages.isView(post.embed)
            ? post.embed.images[0].fullsize
            : post.author.avatar}"
        />

        <meta http-equiv="refresh" content="0;url=${redirectUrl}" />

        <link
          type="application/json+oembed"
          href="https://bsyy.app/oembed?display_name=${encodeURIComponent(
            post.author.displayName ?? ""
          )}&handle=${encodeURIComponent(
            post.author.handle
          )}&avatar=${encodeURIComponent(post.author.avatar ?? "")}"
        />
      </head>
    </html>
  `;
}
