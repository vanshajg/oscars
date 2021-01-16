import { Flex, Box, Text, useColorMode, useTheme } from "@chakra-ui/react"
import Link from "next/link"
import { DarkModeSwitch } from "./DarkModeSwitch"

export const NavigationBar = () => {
  const { colorMode } = useColorMode();
  const background = colorMode === 'dark' ? 'black' : 'white'
  return (
    <Flex position="fixed" background={background} justifyContent="left" paddingTop='1rem' borderBottom="1px" borderColor="grey.500"
      paddingBottom="1rem" width="100%" paddingLeft={{ sm: "1rem", md: "16rem" }}>
      <Link href="/"><Text color="teal.500" as="button" fontSize="2xl" mr="3rem">Home</Text></Link>
      <Link href="/mynominations" ><Text color="teal.500" as="button" fontSize="2xl">My Nominations</Text></Link>
      <DarkModeSwitch />
    </Flex>
  )

}