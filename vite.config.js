import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
                    return path.resolve(path.dirname(sourcemapPath), relativeSourcePath);
                },
            },
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.ts",
    },
});
