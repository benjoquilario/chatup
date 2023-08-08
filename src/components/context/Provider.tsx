"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"

type ProviderProps = {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Provider
