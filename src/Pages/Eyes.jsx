import { Box, Flex, GridItem, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";
import ProductBox from "../Components/ProductBox/ProductBox";

function Eyes() {
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
    let url = "https://sugarcosm-api.onrender.com/api/Eye";
    if (prod.length !== 0 && order.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/Eye?_sort=price&_order=${order}&q=${prod}`;
    else if (prod.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/Eye?q=${prod}`;
    else if (order.length !== 0)
      url = `https://sugarcosm-api.onrender.com/api/Eye?_sort=price&_order=${order}`;

    getData(url);
  }, [order, prod]);
  
  if (loading) {
  }

  return (
    <div>
      <Flex>
        <Box
          display="flex"
          flexDirection="column"
          w="25%"
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
                <MenuItemOption onClick={() => changeUrlType("mask")}>
                  Face Mask
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("acne")}>
                  Acne Care{" "}
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("moisturizer")}>
                  Face Cream
                </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("serum")}>
                  Face Serum
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

export default Eyes;
