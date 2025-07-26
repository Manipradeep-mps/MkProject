import { Box, Button, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { BiLeftArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Image1 from '/img1.jpeg'
import Image2 from '/img2.jpeg'
import Image3 from '/img3.jpeg'
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { IoHeartCircleOutline } from "react-icons/io5";
import { Toaster, toaster } from './ui/toaster';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Tooltip } from "../components/ui/tooltip"


function ProductDescription() {
    const navigate = useNavigate()

    const { id } = useParams()
    const allProducts = useSelector(state => state.products.products);


    const product = allProducts.find(p => p.id === parseInt(id));


    const images = [Image1, Image2, Image3]
    const [currentIndex, setCurrentIndex] = useState(0)

    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const wishlist = useSelector(state => state.wishlist.items);
    const cartlist = useSelector(state => state.cart.items);

    const dispatch = useDispatch()

    function handleWishlist() {

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
            const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);

            if (isAlreadyInWishlist) {
                toaster.create({
                    title: "Product is already in wishlist",
                    type: "error",
                    closable: true,
                    duration: 3000
                });
            } else {
                dispatch(addToWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                }));
                toaster.create({
                    title: "Product added to wishlist",
                    type: "success",
                    closable: true,
                    duration: 3000
                });
            }
        }
    }

    function handleCart() {
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
            const isAlreadyInCart = cartlist.some(item => item.id === product.id);

            if (isAlreadyInCart) {
                toaster.create({
                    title: "Product is already in cart",
                    type: "error",
                    closable: true,
                    duration: 3000
                });
            } else {
                dispatch(addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                }));
                toaster.create({
                    title: "Product added to cart",
                    type: "success",
                    closable: true,
                    duration: 3000
                });
            }
        }
    }

    function handleBuy() {
        toaster.create({
            title: "This feature is currently unavailable",
            type: "error",
            closable: true,
            duration: 3000
        });
    }




    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    return (
        <>
            <Toaster />
            <Box
                bg="gray.200"
                padding={["10px", "10px", "10px", "10px"]}
            >

                <Button onClick={() => { navigate(-1) }}
                    size={["xs", "xs", "sm", "sm"]}
                >
                    <FaArrowLeft />Back
                </Button>




                <Box
                    display="flex"
                    marginTop={["10px", "10px", "10px", "10px"]}
                >
                    <Box
                        bg="white"
                        width={["100%", "100%", "60%", "50%"]}
                        padding="15px"

                    >
                        {/* <Text
                            fontSize={["15px", "15px", "15px", "20px"]}
                            marginLeft={["2px","2px","5px","10px"]}
                            fontFamily="serif"

                        >
                            Name of the {product.name}</Text> */}

                        <Box
                            overflow="hidden"
                            width={["90%", "90%", "90%", "90%"]}
                            height={["240px", "240px", "300px", "320px"]}
                            marginLeft={["6%", "", "", ""]}
                            marginTop={["20px", "", "", ""]}
                            display="flex"

                        >
                            <Box
                                marginLeft={["2px", "10px", "10px", "10px"]}
                                fontSize={["20px", "20px", "30px", "30px"]}
                                marginTop={["142px", "138px", "181px", "193px"]}
                                onClick={goToPrev}
                                cursor="pointer"
                                transform="translateY(-50%)"
                            >
                                <FaArrowCircleLeft />
                            </Box>

                            <Box
                                height={["90%", "90%", "90%", "90%"]}
                                width={["80%", "80%", "80%", "80%"]}

                            >
                                <Box

                                    height={["100%", "100%", "100%", "100%"]}
                                    width={["98%", "98%", "98%", "98%"]}
                                    position="relative"

                                >

                                    <Image
                                        height="100%"
                                        width="100%"
                                        marginLeft={["1%", "1%", "1%", "1%"]}
                                        borderRadius="20px"
                                        src={images[currentIndex]}
                                    >

                                    </Image>
                                </Box>

                                <HStack justify="center" mt={2}>
                                    {images.map((_, index) => (
                                        <Box
                                            key={index}
                                            w={2}
                                            h={2}
                                            borderRadius="full"
                                            bg={currentIndex === index ? 'orange' : 'gray.500'}
                                        />
                                    ))}
                                </HStack >
                            </Box>

                            <Box
                                marginLeft={["1px", "1px", "1px", "1px"]}
                                fontSize={["20px", "20px", "30px", "30px"]}
                                marginTop={["90px", "135px", "120px", "130px"]}
                                onClick={goToNext}
                                cursor="pointer"
                            >
                                <FaArrowCircleRight />
                            </Box>

                        </Box>




                    </Box>

                    <Box
                        display={{ base: "none", md: "block" }}
                        bg="white"
                        width="50%"
                    >


                        <Text
                            fontSize={["15px", "15px", "15px", "20px"]}
                            marginTop={["10px", "10px", "20px", "25px"]}
                            marginLeft={["2px", "2px", "5px", "10px"]}
                            fontFamily="serif"
                            color="black"

                        >
                            Name of the {product.name}</Text>

                        <Text
                            marginTop={["10px", "10px", "10px", "15px"]}
                            marginLeft={["2px", "2px", "5px", "10px"]}
                            color="orange.400"
                            fontFamily="serif"
                        >
                            Special Price
                        </Text>
                        <Text
                            marginTop={["1px", "1px", "1px", "1px"]}
                            marginLeft={["2px", "2px", "15px", "25px"]}
                            fontSize="25px"
                            color="black"
                            fontFamily="serif"
                            fontWeight="bolder"
                        >
                            ₹799
                        </Text>
                        <Text
                            marginTop={["5px", "5px", "5px", "5px"]}
                            marginLeft={["2px", "2px", "5px", "15px"]}
                            fontSize={["10px", "10px", "15px", "15px"]}
                            color="black"
                            fontFamily="serif"
                        >
                            Available Stocks : XX
                        </Text>

                        <HStack>
                            <Tooltip content="Add to cart" showArrow>
                                <IconButton
                                    padding={["10px", "10px", "15px", "20px"]}
                                    bg="green"
                                    marginLeft={["10px", "10px", "10px", "10px"]}
                                    marginTop={["10px", "10px", "10px", "10px"]}
                                    borderRadius="20px"
                                    onClick={handleCart}
                                >
                                    <GiShoppingCart /> Add to Cart
                                </IconButton>
                            </Tooltip>


                            <Tooltip content="Add to wishlist" showArrow>
                                <Box
                                    fontSize={["10px", "10px", "35px", "35px"]}
                                    marginTop={["5px", "5px", "10px", "10px"]}
                                    marginLeft={["10px", "10px", "10px", "10px"]}
                                    _hover={{ color: "red" }}
                                    cursor="pointer"
                                    onClick={handleWishlist}
                                >
                                    <IoHeartCircleOutline />
                                </Box>
                            </Tooltip>
                        </HStack>
                        <Button
                            mt={["10px", "10px", "10px", "10px"]}
                            ml={["10px", "10px", "10px", "10px"]}
                            borderRadius="30px"
                            bg="blue.600"
                            onClick={handleBuy}
                        >
                            Buy now
                        </Button>

                    </Box>
                </Box>


                <Box
                    display={{ base: "block", md: "none" }}
                    bg="white"
                    paddingBottom={["20px", "20px"]}
                >
                    <Text
                        fontSize={["15px", "15px"]}
                        marginTop={["0px", "0px"]}
                        marginLeft={["15px", "15px"]}
                        fontFamily="serif"
                        color="black"

                    >
                        Name of the {product.name}</Text>

                    <Text
                        marginTop={["5px", "5px"]}
                        marginLeft={["15px", "15px"]}
                        color="orange.400"
                        fontFamily="serif"
                    >
                        Special Price
                    </Text>
                    <Text
                        marginTop={["1px", "1px"]}
                        marginLeft={["25px", "25px"]}
                        fontSize="25px"
                        color="black"
                        fontFamily="serif"
                        fontWeight="bolder"
                    >
                        ₹799
                    </Text>
                    <Text
                        marginTop={["5px", "5px", "5px", "5px"]}
                        marginLeft={["15px", "15px"]}
                        fontSize={["15px", "15px"]}
                        color="black"
                        fontFamily="serif"
                    >
                        Available Stocks : XX
                    </Text>

                    <HStack>
                        <IconButton
                            padding={["10px", "10px"]}
                            bg="green"
                            marginLeft={["15px", "15px"]}
                            marginTop={["10px", "10px", "10px", "10px"]}
                            borderRadius="20px"
                        >
                            <GiShoppingCart /> Add to Cart
                        </IconButton>

                        <Box
                            fontSize={["30px", "30px"]}
                            marginTop={["5px", "5px", "10px", "10px"]}
                            marginLeft={["10px", "10px", "10px", "10px"]}
                            _hover={{ color: "red" }}
                            cursor="pointer"
                        >
                            <IoHeartCircleOutline />
                        </Box>
                    </HStack>
                    <Button
                        mt={["10px", "10px", "10px", "10px"]}
                        ml={["10px", "10px", "10px", "10px"]}
                        borderRadius="30px"
                        bg="blue.600"
                        onClick={handleBuy}
                    >
                        Buy now
                    </Button>
                </Box>

                <Box
                    marginTop={["10px", "10px", "10px", "10px"]}
                    height={["200px", "200px", "200px", "200px"]}
                    bg="white"
                >
                    Product Description Goes here
                </Box>







            </Box>
        </>
    )
}

export default ProductDescription
