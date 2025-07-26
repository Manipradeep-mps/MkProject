import { Box, Button, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartCard from './CartCard'
import { GiShoppingCart } from "react-icons/gi";
import EmptyCart from '/cart_empty.png'

function Cart() {

  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.items)


  const [searchParams] = useSearchParams();
  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const currentPage = pageFromURL;

  const itemsPerPage = 16;
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentProducts = cartItems.slice(start, start + itemsPerPage);




  console.log(cartItems)

  const goToPage = (page) => {
    navigate(`/products/cart?page=${page}`);
  };
  return (
    <>
      <Box
        bg="gray.200"
        padding={["10px", "10px", "10px", "10px"]}
      >
        <Button onClick={() => { navigate(-1) }}
          size={["xs", "xs", "sm", "sm"]}
        >
          <FaArrowLeft />Back
        </Button>


        {cartItems.length === 0 ? (<>
             <Box
             height="90vh"
             width="100%"
             >
              <Image
                src={EmptyCart}
                height={["200px","200px","300px","400px"]}
                width={["200px","200px","300px","400px"]}
                ml={["20%","20%","28%","28%"]}
                mt={["20%","20%","5%","3%"]}
              >

              </Image>

              <Text
              ml={["12%","12%","26%","28%"]}
              mt={["10px","10px","10px","10px"]}
              fontSize={["15px","15px","20px","25px"]}
              fontFamily="serif"
              fontWeight="bolder"
              >
                 Your Cart is empty&nbsp;!!&nbsp;&nbsp; <Text as="span" color="orange.500" cursor="pointer"><Link to='/products'>Explore products..</Link></Text>
              </Text>
             </Box>
        </>) : (<>

          <Box ml={["25px", "25px", "35px", "35px"]}
            mt={["15px", "15px", "10px", "10px"]}
            display="flex"

          >
            <Text
              fontSize={["15px", "15px", "15px", "20px"]}
              fontFamily="serif"
              fontWeight="bolder"
            >
              Product List on your cart </Text>
            <Box
              fontSize={["20px", "20px", "20px", "25px"]}
              ml={["5px", "5px", "5px", "5px"]}
              color="orange.600"
            ><GiShoppingCart /></Box>
          </Box>

          <Box overflowY="auto" paddingLeft={["15px", null, "25px", "25px"]} paddingRight={["15px", "15px", "25px", "25px"]}
            width="100%"
            paddingBottom={"20px"}
          >
            <SimpleGrid columns={[2, 2, 3, 4]} >
              {currentProducts.map(product => (
                <CartCard key={product.id} {...product} />
              ))}
            </SimpleGrid>
            <HStack justify="center" mt="5">
              <Button
                onClick={() => {
                  goToPage(Math.max(currentPage - 1, 1))
                }}

                isDisabled={currentPage === 1}
                cursor={currentPage === 1 ? "disabled" : "pointer"}


              >
                Prev
              </Button>
              <Button
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                isDisabled={currentPage === totalPages}
                cursor={currentPage === totalPages ? "disabled" : "pointer"}
              >
                Next
              </Button>
            </HStack>
          </Box>
        </>)}



      </Box>
    </>
  )
}

export default Cart
