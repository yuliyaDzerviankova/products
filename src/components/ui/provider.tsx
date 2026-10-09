import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

const Provider = (props: ColorModeProviderProps) => (
  <ChakraProvider value={defaultSystem}>
    <ColorModeProvider {...props} />
  </ChakraProvider>
)

export { Provider }