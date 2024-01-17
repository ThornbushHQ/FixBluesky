import { BskyAgent } from "@atproto/api";
import { KVNamespace } from "@cloudflare/workers-types";

declare global {
  interface Env {
    Bindings: {
      BSKY_SERVICE_URL: string;
      BSKY_AUTH_USERNAME: string;
      BSKY_AUTH_PASSWORD: string;
      FIXBLUESKY_APP_DOMAIN: string;
      KV: KVNamespace;
    };
    Variables: {
      Agent: BskyAgent;
    };
  }
}
