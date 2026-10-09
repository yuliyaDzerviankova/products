import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Figtree', sans-serif" },
        body: { value: "'Figtree', sans-serif" }
      }
    }
  }
})

export { system }