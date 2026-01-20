import { qsUtils } from "@/core/lib/qs"

// Store
export const todoQStore = qsUtils.createSearchParamStore("q", (def) =>
  def({ defaultValue: "" }),
)
