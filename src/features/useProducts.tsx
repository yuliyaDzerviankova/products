import { useEffect, useState } from "react"
import { useLazyQuery, useQuery } from "@apollo/client/react"
import type { ProductsVariables, Product } from "../models"
import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_BY_CATEGORY, SEARCH_VALUE } from "../schemas"
import type { ProductsResponse } from "../models/Product"

const ITEMS_PER_PAGE = 30

const useProducts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [categoryValue, setCategoryValue] = useState<string[]>([])
  const [ratingValue, setRatingValue] = useState<string | null>(null)

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const [mode, setMode] = useState<"idle" | "search" | "category">("idle")

  const validPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage
  const currentSkip = (validPage - 1) * ITEMS_PER_PAGE

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1

  const { loading, error, data } = useQuery<ProductsResponse, ProductsVariables>(GET_PRODUCTS, {
    variables: {
      skip: currentSkip,
      limit: ITEMS_PER_PAGE
    },
    skip: mode !== "idle",
    fetchPolicy: "network-only"
  })

  const { data: categoriesQueryResponse } = useQuery<{ categories: string[] }>(GET_CATEGORIES)

  const [
    runSearch,
    {
      loading: searchLoading,
      data: searchData
    }] = useLazyQuery<ProductsResponse>(SEARCH_VALUE, {
      fetchPolicy: "network-only"
    })

  const [runCategoriesFilter,
    {
      loading: filterCategoriesLoading,
      data: filterCategoriesData
    }] = useLazyQuery<ProductsResponse>(GET_PRODUCT_BY_CATEGORY, {
      fetchPolicy: "network-only"
    })

    useEffect(() => {
      if (mode === "idle" && data) {
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

  const sortByRating = (value: string | null) => {
    setRatingValue(value)
    if (value && filteredProducts) {
      const sortedProducts = [...filteredProducts]
      if (value === "more") {
        setFilteredProducts(sortedProducts.sort((a, b) => b.rating - a.rating))
      } else if (value === "less") {
        setFilteredProducts(sortedProducts.sort((a, b) => a.rating - b.rating))
      }
    }
  }

  const clearFilter = () => {
    setCategoryValue([])
    setRatingValue("")
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
    categoriesQueryResponse,
    error,
    showSkeleton,
    totalPages,
    setCurrentPage,
    validPage,
    loading,
    searchLoading,
    setFilteredProducts,
    sortByRating,
    ratingValue,
    setRatingValue,
    clearFilter,
  }
}

export { useProducts }