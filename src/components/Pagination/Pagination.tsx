import { Button, Flex, Text } from "@chakra-ui/react"

type Props = {
  totalPages: number
  validPage: number
  loading: boolean
  handlePageChange: (value: number) => void
  showSkeleton: boolean
}

const Pagination = ({
  handlePageChange,
  loading,
  showSkeleton,
  totalPages,
  validPage,
}: Props) => {
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []
    const showLeftDots = validPage > 4
    const showRightDots = validPage < totalPages - 3

    if (!showLeftDots && showRightDots) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push("dots-right")
      pages.push(totalPages)
    } else if (showLeftDots && !showRightDots) {
      pages.push(1)
      pages.push("dots-left")
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push("dots-left")
      pages.push(validPage - 1)
      pages.push(validPage)
      pages.push(validPage + 1)
      pages.push("dots-right")
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Flex p="20px" justify="center" align="center" width="100%" gap="2" wrap="wrap">
      <Button
        disabled={validPage === 1 || showSkeleton || loading}
        onClick={() => handlePageChange(validPage - 1)}
        variant="outline"
        size="sm"
      >
        Prev
      </Button>

      {pageNumbers.map((page, index) => {
        if (typeof page === "string") {
          return (
            <Text key={`dots-${index}`} px="1" color="gray.500" fontSize="sm">
              ...
            </Text>
          )
        }

        return (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            colorPalette={validPage === page ? "teal" : "gray"}
            variant={validPage === page ? "solid" : "outline"}
            disabled={loading || showSkeleton}
            size="sm"
          >
            {page}
          </Button>
        )
      })}

      <Button
        disabled={validPage === totalPages || showSkeleton || loading}
        onClick={() => handlePageChange(validPage + 1)}
        variant="outline"
        size="sm"
      >
        Next
      </Button>

      <Text ml="4" fontSize="sm" color="gray.600">
        {validPage} of {totalPages}
      </Text>
    </Flex>
  )
}

export { Pagination }