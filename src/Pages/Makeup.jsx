import {
  Box,
  Flex,
  GridItem,
  Grid,
  Text,
  Spacer,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";
import ProductBox from "../Components/ProductBox/ProductBox";

function Makeup() {
  const breakpoints = {
    lg: "1024",
    md: "786",
    sm: "480",
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState("");
  const [prod, setProd] = useState("");

  async function getData(url) {
    try {
      setLoading(true);
      var res = await fetch(url);
      var res2 = await res.json();
      console.log(res2);
      setData(res2);
    } finally {
      setLoading(false);
    }
  }
  function changeUrlOrder(order) {
    setOrder(order);
  }
  function changeUrlType(prod) {
    setProd(prod);
  }
  useEffect(() => {
    let url = "https://sugarcosm-api.onrender.com/api/makeup";
    if (prod.length !== 0 && order.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/makeup?_sort=price&_order=${order}&q=${prod}`;
    else if (prod.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/makeup?q=${prod}`;
    else if (order.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/makeup?_sort=price&_order=${order}`;

    getData(url);
  }, [order, prod]);
  
  if (loading) {
  }

  return (
    <div>
      <Box position="relative">
        <Box filter="blur(20px)" height="272px" width="100%" overflow="hidden">
          {" "}
          <img
            src="https://d32baadbbpueqt.cloudfront.net/Collection/6a68d77f-80b5-4860-9a4d-6005844c937d.jpg"
            alt=""
          />
        </Box>
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          width="76%"
          marginLeft="auto"
          marginRight="auto"
        >
          {" "}
          <img
            src="https://d32baadbbpueqt.cloudfront.net/Collection/6a68d77f-80b5-4860-9a4d-6005844c937d.jpg"
            alt=""
          />
        </Box>
      </Box>
      <Flex bg="white" h="50px" alignItems="center">
        <Box ml="30px" mr="15px">
          <Link to="/">Home</Link>
        </Box>
        <MdKeyboardArrowRight />
        <Box ml="15px" fontWeight="600">
          Makeup
        </Box>
        <Spacer />
      </Flex>
      <Flex flexDirection={{ lg: "row", md: "column", sm: "column" }}>
        <Box
          display="flex"
          flexDirection="column"
          w={{ lg: "25%", md: "35%", sm: "50%" }}
          h="min-content"
          m="15px"
          gap="10px"
        >
          <Box>
            <Menu matchWidth="true">
              <MenuButton as={Button} bg="white" w="80%">
                <Flex>
                  <Flex justifyContent="flex-start" gap="10px">
                    <Text>Sort By:</Text>
                    <Text>Relevance</Text>
                  </Flex>
                  <Box m="auto" ml="35px">
                    <GoChevronDown />
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItemOption onClick={() => changeUrlOrder("")}>
                  Relevance
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlOrder("asc")}>
                  Price:Low To High
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlOrder("desc")}>
                  Price:Hight To Low
                </MenuItemOption>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Menu matchWidth="true">
              <MenuButton as={Button} bg="white" w="80%">
                <Flex>
                  <Flex justifyContent="flex-start" gap="10px">
                    <Text>Filter By:</Text>
                    <Text>Product Type</Text>
                  </Flex>
                  <Box m="auto">
                    <GoChevronDown />
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItemOption onClick={() => changeUrlType("lipstick")}>
                  Lipstick
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("eyes")}>
                  Eyes
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("blush")}>
                  Blush
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType(" kajal")}>
                  Kajal
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("primer")}>
                  Primer
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("powder")}>
                  Powder
                </MenuItemOption>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Grid
          display="grid"
          templateColumns={{
            lg: "repeat(3,1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(1,1fr)",
          }}
          w="75%"
          m="10px"
        >
          {loading ? (
            <Box m="50px">
              <Grid gap="10px" templateColumns="repeat(3, 1fr)">
                <Skeleton height="400px" width="280px" borderRadius="10px" />
                <Skeleton height="400px" width="280px" />
                <Skeleton height="400px" width="280px" />
                <Skeleton height="400px" width="280px" />
                <Skeleton height="400px" width="280px" />
                <Skeleton height="400px" width="280px" />
              </Grid>
            </Box>
          ) : (
            data.map(
              (elem) =>
                elem.price !== undefined && (
                  <GridItem>
                    <ProductBox
                      rating={elem.rating}
                      catg={elem.catg}
                      id={elem.id}
                      url={elem.image}
                      description={elem.name}
                      price={elem.price}
                    />
                  </GridItem>
                )
            )
          )}
        </Grid>
      </Flex>
    </div>
  );
}

export default Makeup;
