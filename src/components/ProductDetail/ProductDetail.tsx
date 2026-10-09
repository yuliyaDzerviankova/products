import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { Avatar, Box, Button, Flex, Grid, GridItem, Heading, IconButton, Image, List, Separator, Text } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"
import { LuArrowLeft, LuMoon, LuSun } from "react-icons/lu"
import { useColorMode, useColorModeValue } from "../ui/color-mode"
import { useState, useEffect } from "react"
import { StarRating } from "../StarRating/StarRating"

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) @rest(type: "ProductResponse", path: "products/{args.id}") {
      id
      title
      description
      thumbnail
      brand
      weight
      dimensions {
        width
        height
        depth
      }
      reviews {
        rating
        comment
        date
        reviewerName
        reviewerEmail
      }
      images
    }
  }
`

const ProductDetail = () => {
  const { id } = useParams()
  const { colorMode, toggleColorMode } = useColorMode()
  const [itemImage, setItemImage] = useState()

  const bgColor = useColorModeValue("#829191", "#2c423f")
  const separatorColor = useColorModeValue("#2C423F", "#829191")
  const feedbackColor = useColorModeValue("#C5C5C5", "#829191")
  const feedBackTextColor = useColorModeValue('gray.700', 'gray.200')

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
    fetchPolicy: "cache-and-network"
  })

  const product = data?.product

  useEffect(() => {
    product?.thumbnail && setItemImage(product.thumbnail)
  }, [product])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>


  if (!product) return <Text>Product not found</Text>

  return (
    <Flex background={bgColor} minH="100vh" p="20px">
      <Flex direction="column" width="70%" margin="0 auto" mb={6}>
        <Flex justify="space-between">
          <Link to="/">
            <IconButton variant="ghost">
              <LuArrowLeft />
            </IconButton>
          </Link>

          <Box display="flex" alignSelf="flex-end">
            <IconButton onClick={toggleColorMode} variant="ghost">
              {colorMode === "light" ? <LuMoon /> : <LuSun />}
            </IconButton>
          </Box>
        </Flex>

        <Grid
          gridTemplateColumns={{ base: "1fr", md: "max-content 1fr", sm: "1fr" }}
          gap={{ base: "6", md: "10" }}
          alignItems="start"
          display={{ md: "flex", lg: "grid" }}
          flexDirection={{ md: "column" }}
        >
          <GridItem display="flex" justifyContent="center">
            <Image src={itemImage} maxW="300px" h="auto" mx="auto" objectFit="contain" />  
          </GridItem>
          <GridItem>
            <Heading as="h1">{product.title} ({product.brand})</Heading>
            <Text>{product.description}</Text>
          </GridItem>
          {product.images.length > 1 &&
            <GridItem  mb="30px" display="flex" colSpan={1}>
              {product.images.map((image) => (
                <Button
                  background={colorMode === "light" ? "#C5C5C5" : "#829191" }
                  mr="10px"
                  key={image}
                  onClick={() => setItemImage(image)}
                  _hover={{ background: colorMode === "light" ? "#949B96" : "#C5C5C5" }}
                  height="100%"
                >
                  <Image maxW="100px" src={image} />
                </Button>
              ))}
            </GridItem>
          }
        </Grid>

        <Separator borderColor={separatorColor} mb={6} />

        <Flex direction="column">
          <Heading>Specifications</Heading>
          <List.Root fontSize="sm">
            {[
              { label: "Weight", value: `${product.weight} g`},
              { label: "Width", value: `${product.dimensions?.width} cm`},
              { label: "Height", value: `${product.dimensions?.height} cm`},
              { label: "Depth", value: `${product.dimensions?.depth} cm`},
            ].map((item, index) => (
              <List.Item key={index} display="flex" justifyContent="space-between">
                <Text>{item.label}</Text>
                <Text>{item.value}</Text>
              </List.Item>
            ))}
          </List.Root>
        </Flex>

        <Separator borderColor={separatorColor} mb={6} />

        <Heading mb={3}>Feedbacks ({product.reviews.length})</Heading>
        <Grid gridTemplateColumns={{ lg: "repeat(3, 1fr)", md: "repeat(1, 1fr)" }} gap="4">
          {product.reviews.map(({rating, comment, date, reviewerName}, index) => {
              return (
              <GridItem key={index} background={feedbackColor} p="15px" borderRadius="5px">
                <Flex align="center" gap={3}>
                  <Avatar.Root size="sm">
                    <Avatar.Fallback name={reviewerName} />
                  </Avatar.Root>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">{reviewerName}</Text>
                    <Text fontSize="xs">{new Date(date).toLocaleDateString()}</Text>
                  </Box>
                </Flex>

                <StarRating rating={rating} />

                <Text fontSize="sm" mt={2} color={feedBackTextColor}>"{comment}"</Text>
                </GridItem>
              )
            }
          )}
        </Grid>
      </Flex>
    </Flex>
  )
}

export { ProductDetail }