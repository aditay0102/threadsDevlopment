import { Avatar,Text, Box,Flex ,VStack, Link, Menu, MenuButton, MenuList, MenuItem, Portal, useToast } from "@chakra-ui/react"
import {BsInstagram} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'

const UserHeader = () => {

  const toast=useToast()

    const copyURL=()=>{
      const currentURL= window.location.href;
      // console.log(currentURL)
      navigator.clipboard.writeText(currentURL).then(()=>{
        toast({
          title: 'Account Copied',
          description: "Profile link copied to clipboard",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
    }

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
         <Box>
            <Text fontWeight={"bold"} fontSize={"2xl"} fontFamily={"sans-serif"}>
               Mark Zukerberg
            </Text>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"} fontFamily={"sans-serif"}> markzuckberg </Text>
                <Text fontSize={"x-small"} fontFamily={"sans-serif"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}> 
                  threads.net 
                </Text>
            </Flex>
         </Box>
         <Box>
         <Avatar
            size={{
              base:"md",
              md:"xl",
            }}
            name="Mark Zuckerberg"
            src="/zuck-avatar.png "
         />
         </Box>
      </Flex>
      <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>
    
    <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>3.2k followers</Text>
            <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
            <Box className="icon-container">
              <BsInstagram size={24} cursor={"pointer"} />  
            </Box>
            <Box className="icon-container">
               {/* now i want when i click more i got portal menu */}
             <Menu>
              <MenuButton>
              <CgMoreO size={24} cursor={"pointer"} />  
              </MenuButton>
              <Portal>
                 <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} onClick={copyURL} >Copy Link</MenuItem>
                 </MenuList>
             </Portal>
             </Menu>
            </Box>
        </Flex>
    </Flex>

    <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
    </VStack> 
  )
}

export default UserHeader
