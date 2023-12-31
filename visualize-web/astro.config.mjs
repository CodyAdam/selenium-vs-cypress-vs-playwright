import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://CodyAdam.github.io",
  base: "/selenium-vs-cypress-vs-playwright",
  integrations: [mdx(), tailwind(), react()]
});