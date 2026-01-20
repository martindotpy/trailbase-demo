import { themeStore } from "@/core/store/theme-store"
import { useStore } from "@nanostores/react"

// Hook
export function useTheme() {
  const theme = useStore(themeStore)

  return {
    theme,
    setTheme: themeStore.set,
  }
}
