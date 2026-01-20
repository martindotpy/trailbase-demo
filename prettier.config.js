//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  semi: false,
  trailingComma: "es5",
  tailwindFunctions: ["tw", "cn", "clsx", "twMerge"],
}

export default config
