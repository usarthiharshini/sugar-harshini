import { Box, Flex, GridItem, Grid, Text, Spacer } from "@chakra-ui/react";
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

function Trending() {
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
    let url = "https://sugarcosm-api.onrender.com/api/treanding";
    if (prod.length !== 0 && order.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/treanding?_sort=price&_order=${order}&q=${prod}`;
    else if (prod.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/treanding?q=${prod}`;
    else if (order.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/treanding?_sort=price&_order=${order}`;

    getData(url);
  }, [order, prod]);

  if (loading) {
  }

  return (
    <div>
      <Flex bg="white" h="50px" alignItems="center">
        <Box ml="30px" mr="15px">
          <Link to="/">Home</Link>
        </Box>
        <MdKeyboardArrowRight />
        <Box ml="15px" fontWeight="600">
          Trending
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
                <MenuItemOption onClick={() => changeUrlType("eyes")}>
                  Eye Shadow trending
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("blush")}>
                  Blush trending
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType(" face")}>
                  Face trending
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("powder")}>
                  Powder trending
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("")}>
                  Reset Filters
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
          {data.map(
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
          )}
        </Grid>
      </Flex>
    </div>
  );
}

export default Trending;
