import { useEffect, useState } from "react"
import type { Product } from "../models/Product"
import { useLazyQuery, useQuery } from "@apollo/client/react"
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

const GET_CATEGORIES = gql`
  query GetCategories {
    categories @rest(type: "Categories", path: "products/category-list")
  }
`

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

const ITEMS_PER_PAGE = 30

const useProducts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [categoryValue, setCategoryValue] = useState<string[]>([])

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const [mode, setMode] = useState<"idle" | "search" | "category">("idle")

  const validPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage
  const currentSkip = (validPage - 1) * ITEMS_PER_PAGE

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      skip: currentSkip,
      limit: ITEMS_PER_PAGE
    },
    skip: mode !== "idle",
    fetchPolicy: "network-only"
  })

  const { data: categoriesData } = useQuery(GET_CATEGORIES)

  const [
    runSearch,
    {
      loading: searchLoading,
      data: searchData
    }] = useLazyQuery(SEARCH_VALUE, {
      fetchPolicy: "network-only"
    })

  const [runCategoriesFilter,
    {
      loading: filterCategoriesLoading,
      data: filterCategoriesData
    }] = useLazyQuery(GET_PRODUCT_BY_CATEGORY, {
      fetchPolicy: "network-only"
    })

    useEffect(() => {
      if (mode === "idle") {
        setFilteredProducts(data?.productsData?.products)
        setTotalCount(data?.productsData?.total || 0)
      }
    }, [data, mode])
  
    useEffect(() => {
      if (mode === "search" && searchData?.productsData) {
        const items = searchData.productsData.products
        setFilteredProducts(items || [])
        setTotalCount(searchData.productsData.total || 0)
      }
    }, [searchData, mode])
  
    useEffect(() => {
      if (mode === "category" && filterCategoriesData?.productsData?.products) {
        const items = filterCategoriesData.productsData.products
        setFilteredProducts(items || 0)
        setTotalCount(filterCategoriesData.productsData.total || 0)
      }
    }, [filterCategoriesData, mode])

  const searchItems = () => {    
    const searchItem = searchValue.toLowerCase().trim()

    if (!searchItem) {
      setMode("idle")
      setCategoryValue([])
      setCurrentPage(1)
      return
    }

    setMode("search")
    setCategoryValue([])
    setCurrentPage(1)
    runSearch({ variables: { value: searchItem } })
  }

  const selectCategory = (value: string[]) => {
    setCategoryValue(value)
    setSearchValue("")

    if (value.length === 0) {
      setMode("idle")
      setCurrentPage(1)
      return
    }

    setMode("category")
    setCurrentPage(1)
    runCategoriesFilter({ variables: { value: value[0] } })
  }

  const clearFilter = () => {
    setCategoryValue([])
    setFilteredProducts(data?.productsData?.products)
  }

  const showSkeleton = loading || searchLoading || filterCategoriesLoading || filteredProducts?.length === 0

  return {
    searchItems,
    selectCategory,
    categoryValue,
    setSearchValue,
    filteredProducts,
    totalCount,
    categoriesData,
    error,
    showSkeleton,
    totalPages,
    setCurrentPage,
    validPage,
    loading,
    searchLoading,
    clearFilter
  }
}

export { useProducts }