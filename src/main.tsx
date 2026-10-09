import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { ApolloProvider } from '@apollo/client/react'
import App from './App'
import client from './apollo-client'
import { Provider } from "./components/ui/provider"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")

if (!container) {
  throw new Error("Cannot find root element")
}

createRoot(container).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
)
