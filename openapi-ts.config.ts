import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./traildepot/openapi.json",
  watch: true,
  output: {
    path: "src/api/client",
    postProcess: ["prettier"],
  },

  plugins: [
    {
      name: "@hey-api/client-fetch",
      baseUrl: false,
    },
    "zod",
  ],
})
