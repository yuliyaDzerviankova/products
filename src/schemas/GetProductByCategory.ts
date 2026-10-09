import { gql } from "@apollo/client"

const GET_PRODUCT_BY_CATEGORY = gql`
  query GetProductByCategory($value: String!) {
    productsData(value: $value) @rest(
      type: "Products",
      path: "products/category/{args.value}"
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
      skip
      limit
    }
  }
`

export { GET_PRODUCT_BY_CATEGORY }