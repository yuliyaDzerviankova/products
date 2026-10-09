import { InMemoryCache } from "@apollo/client"
import { ApolloClient } from "@apollo/client"
import { RestLink } from "apollo-link-rest"

const restLink = new RestLink({
  uri: "https://dummyjson.com/"
})

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({
    typePolicies: {
      ProductResponse: {
        keyFields: ["id"]
      },
      Query: {
        fields: {
          productsData: {
            keyArgs: ["skip"]
          }
        }
      }
    }
  })
})

export default client