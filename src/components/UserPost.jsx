import { Avatar, Box, Flex, Image ,Menu, MenuButton, MenuList, MenuItem, Portal, useToast} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const UserPost = ({postImg,likes,replies,postTitle}) => {

    const [liked,setLiked] =useState(false)
    const toast=useToast()
    const copyURL=()=>{
        const currentURL= window.location.href;
        // console.log(currentURL)
        navigator.clipboard.writeText(currentURL).then(()=>{
          toast({
            title: 'Post Copied',
            description: "Post link copied to clipboard",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        })
      }

  return (
    <Link to={"/markzuckerberh/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Box my={2} w="2px" h={"full"} bg={"gray.light"}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="John Doe"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              src="https://bit.ly/dan-abramov"
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              src="https://bit.ly/sage-adebayo"
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              src="https://bit.ly/ryan-florence"
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
            <div  onClick={(e)=>{e.preventDefault()}}>
              <Menu>
              <MenuButton> 
              <BsThreeDots cursor={"pointer"}/>
              </MenuButton>
              <Portal>
                 <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} onClick={copyURL} >Copy Link</MenuItem>
                 </MenuList>
             </Portal>
             </Menu>
             </div>
             
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg &&  (
            <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
            position={"relative"}
          >
            <Image src={postImg} w={"full"}/>
          </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked}/>
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}> {replies} replies</Text>
            <Box h={0.5} w={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}> {likes} likes</Text>

          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
