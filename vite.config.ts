/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import {defineConfig} from "vite";
import {defaultExclude} from "vitest/config";
import path from "path";

export default defineConfig({
    plugins: [],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
    test: {
        exclude: [...defaultExclude, "build/**"],
        restoreMocks: true,
        testTimeout: 1000,
    },
});
