import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { IoHeartCircleOutline } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import { Toaster, toaster } from './ui/toaster';
import { Tooltip } from "../components/ui/tooltip"



function ProductCard({ id, name, price, image }) {

  const dispatch = useDispatch()

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const wishlist = useSelector(state => state.wishlist.items);
  const cartlist = useSelector(state => state.cart.items);

  const navigate = useNavigate()

  function handleWishlist(e) {
    e.stopPropagation();
    if (localStorage.getItem('userToken') == null || undefined) {
      toaster.create({
        title: "Sign In / Sign Up to use this feature..",
        type: "warning",
        action: {
          label: "Sign In",
          onClick: () => { navigate('/login') }
        },
        duration: "4000",
        closable: "true"


      })
    }
    else {
      const isAlreadyInWishlist = wishlist.some(item => item.id === id);

      if (isAlreadyInWishlist) {
        toaster.create({
          title: "Product is already in wishlist",
          type: "error",
          closable: "true",
          duration: "3000"
        });
      } else {
        dispatch(addToWishlist({ id, name, price, image }));
        toaster.create({
          title: "Product added to wishlist",
          type: "success",
          closable: "true",
          duration: "3000"
        });
      }
    }
  }

  function handleCart(e) {
    e.stopPropagation();

    if (localStorage.getItem('userToken') == null || undefined) {
      toaster.create({
        title: "Sign In / Sign Up to use this feature..",
        type: "warning",
        action: {
          label: "Sign In",
          onClick: () => { navigate('/login') }
        },
        duration: "4000",
        closable: "true"


      })
    }
    else {
      const isAlreadyInCart = cartlist.some(item => item.id === id);

      if (isAlreadyInCart) {
        toaster.create({
          title: "Product is already in cart",
          type: "error",
          closable: "true",
          duration: "3000"
        });
      } else {
        dispatch(addToCart({ id, name, price, image }));
        toaster.create({
          title: "Product added to cart",
          type: "success",
          closable: "true",
          duration: "3000"
        });
      }
    }
  }


  return (
    <>
      <Toaster />
      <Box
        bg="white"
        height={["230px", "230px", "300px", "300px"]}
        width={["90%", "90%", "90%", "90%"]}
        marginLeft="10px"
        marginTop="25px"
        borderRadius="10px"
        overflow="hidden"
        _hover={{ boxShadow: "0 0 5px orange" }}
        onClick={() => {
          navigate(`/products/description/${id}?page=${page}`)
        }}
      >

        <Flex>
          <Tooltip content="Add to wishlist" showArrow>
            <Box
              ml="auto"
              mr={["2%", "", "", ""]}
              fontSize={["25px", "25px", "25px", "30px"]}
              color="gray"
              _hover={{ color: "red" }}
              cursor="pointer"
            >
              <IoHeartCircleOutline onClick={(e) => handleWishlist(e)} />
            </Box>
          </Tooltip>
        </Flex>


        <Box overflow="hidden" height={["60%", "60%", "60%", "60%"]} width={["auto", "auto", "auto", "auto"]}
          objectFit="contain"
          marginLeft={["20%", "20%", "20%", "18%"]}
        >
          <Image
            src={image} height={["100%", "100%", "100%", "100%"]} width={["auto", "auto", "auto", "auto"]} marginTop="10px" marginLeft={["0px", "5px", "10px", "20px"]}
            objectFit="contain"
          >
          </Image>
        </Box>

        <Box
          textOverflow="ellipsis"
          marginLeft={["10%", "", "", ""]}
          marginTop={["5%", "", "", ""]}
          width={["90%", "90%", "90%", "90%"]}
          height="15%"
          overflow="hidden"
        >
          <Text
            fontSize={["12px", "10px", "14px", "16px"]}
            fontFamily="serif"
          >
            Name of the {name}
          </Text>

        </Box>


        <Box
          marginLeft={["10%", "", "", ""]}
          marginTop={["1%", "", "", ""]}
          width={["90%", "90%", "90%", "90%"]}
          overflow="hidden"
          objectFit="contain"
          display="flex"

        >
          <Text
            fontSize={["12px", "12px", "14px", "16px"]}
            fontFamily="serif"
          >
            Price is {price}
          </Text>

          <Tooltip content="Add to cart" showArrow>
            <Box
              //marginLeft={["25%", "25%", "25%", "25%"]} 
              ml="auto"
              mr={["5%", "", "", ""]}
              fontSize={["20px", "25px", "25px", "25px"]}
              color="gray"
              _hover={{ color: "green" }}
              cursor="pointer"
              borderRadius="10px"
              bg="gray.300"
              padding="1px"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <GiShoppingCart onClick={(e) => handleCart(e)} />
            </Box>
          </Tooltip>
        </Box>







      </Box>
    </>
  )
}

export default ProductCard
