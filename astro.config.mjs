import { defineConfig } from "astro/config";

import embeds from "astro-embed/integration";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://thelonevoice.in",
  build: {
    assets: "_assets",
  },
  integrations: [embeds(), mdx(), sitemap(), pagefind()],
});
