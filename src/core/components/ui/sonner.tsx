import { useTheme } from "@/core/hook/use-theme"
import {
  TbAlertOctagon,
  TbAlertTriangle,
  TbCircleCheck,
  TbInfoCircle,
  TbLoader,
} from "react-icons/tb"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import "sonner/dist/styles.css"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <TbCircleCheck className="size-4" />,
        info: <TbInfoCircle className="size-4" />,
        warning: <TbAlertTriangle className="size-4" />,
        error: <TbAlertOctagon className="size-4" />,
        loading: <TbLoader className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
        style: {
          fontFamily: "var(--default-font-family)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
