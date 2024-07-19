import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.imooc-web.lgdsunday.club/",
        changeOrigin: true,
      },
    },
    hmr: true,
  },
});
