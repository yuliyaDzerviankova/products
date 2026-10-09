import { gql } from "@apollo/client"

const GET_PRODUCTS = gql`
  query GetProducts($skip: Int!, $limit: Int!) {
    productsData(skip: $skip, limit: $limit) @rest(
      type: "ProductsResponse", path: "products?skip={args.skip}&limit={args.limit}"
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

export { GET_PRODUCTS }