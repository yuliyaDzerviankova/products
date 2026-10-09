import { Flex, IconButton, Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useColorMode } from "../ui/color-mode"
import { type Dispatch, type KeyboardEvent, type SetStateAction } from "react"

type Props = {
  setSearchValue: Dispatch<SetStateAction<string>>
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  searchItems: () => void
}

const Search = ({ handleKeyDown, searchItems, setSearchValue }: Props) => {
  const { colorMode } = useColorMode()

  return (
    <Flex gap="4">
      <InputGroup startElement={<LuSearch />}>
        <Input
          background={colorMode === "light" ? "#C5C5C5" : "#829191"}
          placeholder="Search..."
          type="search"
          onChange={({ target }) => setSearchValue(target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      
      <IconButton onClick={searchItems}>
        <LuSearch />
      </IconButton>
    </Flex>
  )
}

export { Search }