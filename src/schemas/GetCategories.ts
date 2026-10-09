import { gql } from "@apollo/client"

const GET_CATEGORIES = gql`
  query GetCategories {
    categories @rest(type: "Categories", path: "products/category-list")
  }
`

export { GET_CATEGORIES }