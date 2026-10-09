import { Box, Button, createListCollection, Flex, Grid, HStack, IconButton, Portal, RadioGroup, Select, Text } from "@chakra-ui/react"
import { useMemo, useState, type KeyboardEvent} from "react"
import { ProductItem, Pagination, ProductDetail, ProductItemSkeleton, Search } from "../../components"
import { useParams } from "react-router-dom"
import { useColorMode } from "../../components/ui/color-mode"
import { LuSun, LuMoon } from "react-icons/lu"
import { useProducts } from "../useProducts"

const ITEMS_PER_PAGE = 30

const ProductList = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const {
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
    ratingValue,
    setRatingValue,
    sortByRating,
    clearFilter,
  } = useProducts()

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setRatingValue("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchItems()
    }
  }

  const categoriesFrameworks = useMemo(() => {

    const items = categoriesQueryResponse?.categories?.map((item: string) => ({
      label: item,
      value: item
    })) || []

    return createListCollection({ items })
  }, [categoriesQueryResponse])

  const ratingItems: { label: string, value: string}[] = [
    { label: "More to less", value: "more" },
    { label: "Less to more", value: "less" }
  ]

  if (error) return <Text p="20px" color="red.500">Error: {error.message}</Text>

  return (
    <Flex width="100%" flex="1" direction="column" background={colorMode === "light" ? "#829191" : "#2c423f"} minH="100vh">
      <Box display="flex" mt="10px" mr="10px" gap="6" width="70%" margin="0 auto" paddingY="20px">
        <Search handleKeyDown={handleKeyDown} setSearchValue={setSearchValue} searchItems={searchItems} />

        <IconButton onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <LuMoon /> : <LuSun />}
        </IconButton>
      </Box>

      <Flex p="10px" gap="6" width="70%" margin="0 auto" alignItems="flex-start">
        <Box>
          <Text fontSize="sm" mb="2">Select category</Text>

          <Select.Root
            collection={categoriesFrameworks}
            value={categoryValue}
            size="sm"
            width="320px"
            onValueChange={(event) => selectCategory(event.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select category" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {categoriesFrameworks.items.map((category) => (
                    <Select.Item item={category} key={category.value}>
                      {category.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>

        <Box>
          <Text fontSize="sm" mb="2">Sort by rating</Text>
          <RadioGroup.Root value={ratingValue} onValueChange={({ value }) => sortByRating(value)}>
            <HStack gap="6" height="32px" display="flex" alignItems="center">
              {ratingItems.map((item) => (
                <RadioGroup.Item key={item.value} value={item.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </Box>

        <Button onClick={clearFilter} alignSelf="flex-end" size="sm">
          Clear filter
        </Button>
      </Flex>
      
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)"
        }}
        gap="4"
        p="10px"
        width={{ xl: "70%", md: "100%", base: "100%" }}
        margin="0 auto"
      >
        {showSkeleton
          ?
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ProductItemSkeleton key={index} />
            ))
          :
            filteredProducts && filteredProducts?.length > 0 ? (
            filteredProducts?.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <Text gridColumn="1 / -1" textAlign="center" py="40px" color="gray.500">
              No products found
            </Text>
          )
        }
      </Grid>
      {totalCount > ITEMS_PER_PAGE && ( 
        <Pagination
          handlePageChange={handlePageChange}
          loading={loading || searchLoading}
          showSkeleton={showSkeleton}
          totalPages={totalPages}
          validPage={validPage}
        />
      )}

    </Flex>
  )
}

const ProductDetailWrapper = () => {
  const { id } = useParams()
  return <ProductDetail key={id} />
}

export { ProductDetailWrapper, ProductList }