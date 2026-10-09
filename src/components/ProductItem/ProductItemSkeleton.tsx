import { Box, Flex, GridItem, Skeleton } from "@chakra-ui/react"
import { useColorMode } from "../ui/color-mode"

const ProductItemSkeleton = () => {
  const { colorMode } = useColorMode()

  return (
    <GridItem
      background={colorMode === "light" ? "#C5C5C5" : "#829191"}
      padding="15px"
      height="100%"
      display="flex"
      flexDir="column"
      borderRadius="8px"
    >
      <Box aspectRatio={1} display="flex" alignItems="center" justifyContent="center" mb="4">
        <Skeleton height="100%" width="100%" borderRadius="4px" />
      </Box>

      <Skeleton height="20px" width="80%" mx="auto" mb="4" />

      <Flex direction="column" marginTop="auto" gap="3">
        <Flex gap="1">
          <Skeleton height="16px" width="40px" borderRadius="4px" />
          <Skeleton height="16px" width="50px" borderRadius="4px" />
        </Flex>

        <Box minH="20px" display="flex" alignItems="center">
          <Skeleton height="12px" width="60px" />
        </Box>

        <Flex justify="space-between" align="center">
          <Skeleton height="24px" width="50px" />
          <Skeleton height="20px" width="70px" borderRadius="4px" />
        </Flex>

        <Flex align="center" gap="1">
          <Skeleton height="16px" width="30px" />
        </Flex>
      </Flex>
    </GridItem>
  )
}

export { ProductItemSkeleton }