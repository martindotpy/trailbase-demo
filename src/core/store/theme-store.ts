import { persistentAtom } from "@nanostores/persistent"

// Type
export type Theme = "light" | "dark"

// Store
export const themeStore = persistentAtom<Theme>("theme", "dark")

// Startup and listen
const root = document.documentElement

root.classList.toggle("dark", themeStore.get() === "dark")

themeStore.listen((theme) => {
  root.classList.toggle("dark", theme === "dark")
})
