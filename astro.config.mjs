import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";
import { vitePreprocess } from "@astrojs/svelte";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://PawelGawlikDev.github.io",
  integrations: [
    tailwind(),
    icon(),
    react(),
    svelte({
      preprocess: [vitePreprocess()],
    }),
    sitemap(),
    partytown(),
  ],
});
