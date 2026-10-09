import { Flex, Text } from "@chakra-ui/react"

type Props = {
  rating: number
}

const StarRating = ({ rating }: Props) => {
  return (
    <Flex>
      {Array.from({ length: rating }, (_, index) => (
        <Text color="yellow" key={index}>{'\u2605'}</Text>
      ))}
    </Flex>
  )
}

export { StarRating }