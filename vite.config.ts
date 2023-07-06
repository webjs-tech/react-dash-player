import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginFonts } from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          {
            name: "icomoon",

            local: "icomoon",

            src: "./fonts/icomoon.ttf",
          },
          {
            name: "Roboto",
            local: "Roboto",
            src: "./fonts/Roboto-Regular.ttf",
          },
        ],

        display: "auto",

        preload: true,

        prefetch: false,

        injectTo: "head-prepend",
      },
    }),
  ],
});
