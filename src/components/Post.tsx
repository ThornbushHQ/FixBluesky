import { AppBskyFeedDefs } from "@atproto/api";

import { Layout } from "./Layout";
import { OEmbedTypes } from "../routes/getOEmbed";
import { parseEmbedImage } from "../lib/parseEmbedImage";
import { parseEmbedDescription } from "../lib/parseEmbedDescription";

interface PostProps {
  post: AppBskyFeedDefs.PostView;
  url: string;
  appDomain: string;
}

export const Post = ({ post, url, appDomain }: PostProps) => (
  <Layout url={url}>
    <meta name="twitter:creator" content={`@${post.author.handle}`} />
    <meta property="og:description" content={parseEmbedDescription(post)} />
    <meta
      property="og:title"
      content={`${post.author.displayName} (@${post.author.handle})`}
    />

    {!(parseEmbedImage(post) === post.author.avatar) && (
      <meta name="twitter:card" content="summary_large_image" />
    )}

    <meta property="og:image" content={parseEmbedImage(post)} />

    <link
      type="application/json+oembed"
      href={`https:/${appDomain}/oembed?type=${OEmbedTypes.Post}&replies=${
        post.replyCount
      }&reposts=${post.repostCount}&likes=${
        post.likeCount
      }&avatar=${encodeURIComponent(post.author.avatar ?? "")}`}
    />
  </Layout>
);
