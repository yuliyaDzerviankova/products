import { gql } from "@apollo/client"

const SEARCH_VALUE = gql`
  query SearchProducts($value: String!) {
    productsData(value: $value) @rest(
      type: "ProductsResponse", path: "products/search?q={args.value}"
    ) {
      products {
        id
        title
        description
        category
        price
        tags
        discountPercentage
        rating
        stock
        brand
        sku
        weight
        thumbnail
      }
      total
      limit
      skip
    }
  }
`

export { SEARCH_VALUE }