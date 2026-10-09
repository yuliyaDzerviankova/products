import { Badge, Box, Flex, GridItem, Heading, Image, Tag, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useColorMode } from "../ui/color-mode"

type Product = {
  product: {
    id: number
    thumbnail: string
    title: string
    category: string
    rating: number
    price: number
    tags: string[]
    stock: number
  }
}

const ProductItem = ({ product }: Product) => {
  const { colorMode } = useColorMode()
  const {
    id,
    thumbnail,
    title,
    tags,
    stock,
    price,
    category,
    rating
  } = product

  return (
    <Link to={`/${id}`}>
      <GridItem
        background={colorMode === "light" ? "#C5C5C5" : "#829191"}
        padding="10px"
        height="100%"
        display="flex"
        flexDirection="column"
        borderRadius="5px"
        _hover={{ transform: "translateY(-4px)", transition: "all 0.2s" }}
      >
        <Box aspectRatio={1} display="flex" alignItems="center" justifyContent="center" mb="4">
          <Image src={thumbnail} objectFit="contain" maxH="100%" />
        </Box>

        <Heading textAlign="center" mb="4" fontSize="md">
          {title}
        </Heading>

        <Flex direction="column" marginTop="auto" gap="2">
          <Flex gap="1" wrap="wrap">
            {tags.map((tag) => 
              <Badge key={tag} colorPalette="green" size="sm">
                {tag}
              </Badge>
            )}
          </Flex>

          <Box minH="20px">
            {stock <= 10 && (
              <Text color="red.500" fontSize="xs" fontWeight="semibold">{stock} items left</Text>
            )}
          </Box>

          <Flex justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="lg">${price}</Text>
            <Badge variant="surface">{category}</Badge>
          </Flex>

          <Flex align="center" gap="1" fontSize="sm">
            <Text fontWeight="medium">{rating}</Text>
            <Text color="yellow.400">{'\u2605'}</Text>
          </Flex>
        </Flex>
      </GridItem>
    </Link>
  )
}

export { ProductItem }