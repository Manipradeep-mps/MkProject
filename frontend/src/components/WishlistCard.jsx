import React from 'react'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { IoHeartCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { MdDelete } from "react-icons/md";
import { Toaster, toaster } from './ui/toaster';
import { useSelector } from 'react-redux';
import { GiShoppingCart } from "react-icons/gi";
import { Tooltip } from "../components/ui/tooltip"





function WishlistCard({ id, name, price, image }) {

    const dispatch = useDispatch()

    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const navigate = useNavigate()

    const wishlist = useSelector(state => state.wishlist.items);




    function handleWishlist(e) {
        e.stopPropagation();

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


    function handleDelete(e) {
        e.stopPropagation();
        dispatch(removeFromWishlist({ id, name, price, image }))
        toaster.create({
            title: "Product removed from Wishlist",
            type: "success",
            closable: "true",
            duration: "3000"
        })
    }

    function handleBuy(e) {
        e.stopPropagation();
        toaster.create({
            title: "This feature is currently unavailable",
            type: "error",
            closable: "true",
            duration: "3000"
        })

    }


    return (
        <>
            <Toaster />
            <Box
                bg="white"
                height={["230px", "230px", "300px", "350px"]}
                width={["96%", "90%", "90%", "90%"]}
                marginLeft="10px"
                marginTop="25px"
                borderRadius="10px"
                overflow="hidden"
                _hover={{ boxShadow: "0 0 5px orange" }}
                onClick={() => {
                    navigate(`/products/description/${id}?page=${page}`)
                }}
            >

                {/* <Flex>
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
                </Flex> */}


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
                    <Text
                        fontSize={["12px", "12px", "14px", "16px"]}
                        fontFamily="serif"
                    >
                        Price is {price}
                    </Text>

                </Box>


                <Box
                    marginLeft={["10%", "10%", "10%", "10%"]}
                    marginTop={["6%", "6%", "6%", "6%"]}
                    width={["90%", "90%", "90%", "90%"]}
                    overflow="hidden"
                    objectFit="contain"
                    display="flex"

                >
                    <Button size={["5px", "10px", "10px", "sm"]} bg="blue.500" padding={["5px", "5px", "5px", "5px"]}
                        onClick={(e) => { handleBuy(e) }}
                    >
                        <Text
                            fontSize={["10px", "10px", "12px", "13px"]}
                        >Buy now</Text>
                    </Button>
                     
                    <Tooltip content="Add to Cart" showArrow>
                    <Box
                        ml={["15px", "10px", "10px", "10px"]}
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
                        <GiShoppingCart />
                    </Box>
                    </Tooltip>

                    <Tooltip content="Remove from wishlist" showArrow>
                    <Box

                        ml={["2%","2%","5%","5%"]}
                        fontSize={["20px", "25px", "25px", "25px"]}
                        color="gray"
                        _hover={{ color: "red" }}
                        cursor="pointer"
                        borderRadius="10px"
                        bg="gray.300"
                        padding="1px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <MdDelete onClick={(e) => handleDelete(e)} />
                    </Box>
                    </Tooltip>
                </Box>







            </Box>
        </>
    )
}

export default WishlistCard
