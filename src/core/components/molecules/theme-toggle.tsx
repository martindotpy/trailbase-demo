import { Button } from "@/core/components/ui/button"
import { useTheme } from "@/core/hook/use-theme"
import { cn } from "@/core/lib/tailwind"
import type { ClassValue } from "clsx"
import { TbMoon, TbSun } from "react-icons/tb"

// Component
interface ThemeToggleProps {
  className?: ClassValue
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // Theme
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(className)}
    >
      {isDark ? <TbSun className="h-4 w-4" /> : <TbMoon className="h-4 w-4" />}
    </Button>
  )
}
