// vitest.config.ts
import { defineConfig } from "file:///Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/node_modules/vitest/dist/config.js";
import react from "file:///Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vitest_config_default = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.d.ts",
        "**/*.config.{js,ts,cjs}",
        "**/main.tsx",
        "**/vite-env.d.ts",
        "scripts/**",
        "netlify/**",
        ".nvmrc",
        "tailwind.config.cjs",
        "eslint.config.js",
        "vitest.config.ts",
        "vite.config.ts"
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      }
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9uYXpjYW1lZGlhL0RvY3VtZW50cy9HaXRIdWIvUFJJTEFCU0EtV0VCU0lURS0yMDI1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmF6Y2FtZWRpYS9Eb2N1bWVudHMvR2l0SHViL1BSSUxBQlNBLVdFQlNJVEUtMjAyNS92aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uYXpjYW1lZGlhL0RvY3VtZW50cy9HaXRIdWIvUFJJTEFCU0EtV0VCU0lURS0yMDI1L3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgc2V0dXBGaWxlczogWycuL3ZpdGVzdC5zZXR1cC50cyddLFxuICAgIGNvdmVyYWdlOiB7XG4gICAgICBwcm92aWRlcjogJ3Y4JyxcbiAgICAgIHJlcG9ydGVyOiBbJ3RleHQnLCAnanNvbicsICdodG1sJ10sXG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgICdub2RlX21vZHVsZXMvJyxcbiAgICAgICAgJ2Rpc3QvJyxcbiAgICAgICAgJ2NvdmVyYWdlLycsXG4gICAgICAgICcqKi8qLmQudHMnLFxuICAgICAgICAnKiovKi5jb25maWcue2pzLHRzLGNqc30nLFxuICAgICAgICAnKiovbWFpbi50c3gnLFxuICAgICAgICAnKiovdml0ZS1lbnYuZC50cycsXG4gICAgICAgICdzY3JpcHRzLyoqJyxcbiAgICAgICAgJ25ldGxpZnkvKionLFxuICAgICAgICAnLm52bXJjJyxcbiAgICAgICAgJ3RhaWx3aW5kLmNvbmZpZy5janMnLFxuICAgICAgICAnZXNsaW50LmNvbmZpZy5qcycsXG4gICAgICAgICd2aXRlc3QuY29uZmlnLnRzJyxcbiAgICAgICAgJ3ZpdGUuY29uZmlnLnRzJ1xuICAgICAgXSxcbiAgICAgIHRocmVzaG9sZHM6IHtcbiAgICAgICAgZ2xvYmFsOiB7XG4gICAgICAgICAgYnJhbmNoZXM6IDkwLFxuICAgICAgICAgIGZ1bmN0aW9uczogOTAsXG4gICAgICAgICAgbGluZXM6IDkwLFxuICAgICAgICAgIHN0YXRlbWVudHM6IDkwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyAiXSwKICAibWFwcGluZ3MiOiAiO0FBQThWLFNBQVMsb0JBQW9CO0FBQzNYLE9BQU8sV0FBVztBQUVsQixJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWSxDQUFDLG1CQUFtQjtBQUFBLElBQ2hDLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBLE1BQ2pDLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFFBQVE7QUFBQSxVQUNOLFVBQVU7QUFBQSxVQUNWLFdBQVc7QUFBQSxVQUNYLE9BQU87QUFBQSxVQUNQLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
