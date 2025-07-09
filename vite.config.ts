import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "./templates",
  server: {
    port: 5000,
    open: "http://localhost:5000/homepage",
  },

  plugins: [tailwindcss()],
});
