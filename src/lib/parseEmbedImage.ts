import {
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyFeedDefs,
} from "@atproto/api";

export function parseEmbedImage(post: AppBskyFeedDefs.PostView) {
  if (AppBskyEmbedRecord.isView(post.embed)) {
    const { success: isView } = AppBskyEmbedRecord.validateView(post.embed);
    if (isView && AppBskyEmbedRecord.isViewRecord(post.embed.record)) {
      const { success: isViewRecord } = AppBskyEmbedRecord.validateViewRecord(
        post.embed.record
      );
      if (
        isViewRecord &&
        post.embed.record.embeds &&
        AppBskyEmbedImages.isView(post.embed.record.embeds[0])
      ) {
        const { success: isImageView } = AppBskyEmbedImages.validateView(
          post.embed.record.embeds[0]
        );
        if (isImageView) {
          return post.embed.record.embeds[0].images[0].fullsize;
        }
      }
    }
  }
  if (AppBskyEmbedRecordWithMedia.isView(post.embed)) {
    const { success: isView } = AppBskyEmbedRecordWithMedia.validateView(
      post.embed
    );
    if (isView && AppBskyEmbedImages.isView(post.embed.media)) {
      const { success: isImageView } = AppBskyEmbedImages.validateView(
        post.embed.media
      );
      if (isImageView) {
        return post.embed.media.images[0].fullsize;
      }
    }
  }
  if (AppBskyEmbedImages.isView(post.embed)) {
    const { success: isImageView } = AppBskyEmbedImages.validateView(
      post.embed
    );
    if (isImageView) {
      return post.embed.images[0].fullsize;
    }
  }
  return post.author.avatar ?? "";
}
