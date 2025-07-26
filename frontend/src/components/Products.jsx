import { Box, Button, CloseButton, Drawer, Group, HStack, Input, Portal, Text, Field, Image, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaHamburger } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { FaHeart } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Toaster, toaster } from './ui/toaster';
import ProductCard from './ProductCard';
import SampleImage from '/sample.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/slices/productSlice';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "../components/ui/tooltip"
import { useRef } from 'react';

import React from 'react'



function Products() {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.products.products);

    const sampleData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: 100 + i * 10,
        image: SampleImage,
    }));

    useEffect(() => {
        dispatch(setProducts(sampleData));
    }, [dispatch]);

    const [open, setOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const [searchText, setSearchText] = useState('')
    const [searchError, setSearchError] = useState('');

    const [searchTextLap, setSearchTextLap] = useState('')

    const [searchParams] = useSearchParams();
    const pageFromURL = parseInt(searchParams.get("page")) || 1;
    const currentPage = pageFromURL;

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [lastSearch, setLastSearch] = useState('');

    const resultRef = useRef(null);





    const itemsPerPage = 16;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentProducts = allProducts.slice(start, start + itemsPerPage);



    const goToPage = (page) => {
        navigate(`/products?page=${page}`);
    };

    //pagination
    // const itemsPerPage = 16;
    // const [currentPage, setCurrentPage] = useState(1);

    // const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    // const start = (currentPage - 1) * itemsPerPage;
    // const currentProducts = allProducts.slice(start, start + itemsPerPage);

    // const [searchParams] = useSearchParams();
    // const pageFromURL = parseInt(searchParams.get("page")) || 1;
    // const [currPage, setCurrPage] = useState(pageFromURL);





    const handleSearch = () => {
        if (!searchText.trim()) {
            setSearchError('Type something to search');
        } else {
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchText.trim().toLowerCase())
            );
            setFilteredProducts(filtered);
            setIsSearching(true);
            setLastSearch(searchText);
            setSearchText("");
            setSearchError('');
            setSearchOpen(false);
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSearchLap = () => {

        if (!searchTextLap.trim()) {
            toaster.create({
                title: "Type something to search",
                type: "error",
                closable: "true",
                duration: "3000"
            })
        }
        else {

            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchTextLap.trim().toLowerCase())
            );
            setFilteredProducts(filtered);
            setIsSearching(true);
            setLastSearch(searchTextLap);
            setSearchTextLap('');
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

    }

    const handleClearSearch = () => {
        setIsSearching(false);
        setFilteredProducts([]);
        setLastSearch('');
    }

    return (
        <>
            <Toaster />
            <Box
                marginTop={"30px"}
                paddingLeft={["20px", null, "50px", "50px"]}
                paddingRight={["20px", null, "50px", "50px"]}
            >

                <HStack>

                    <Box display={{ base: "block", md: "none" }}>
                        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
                            <Drawer.Trigger asChild>
                                <FaHamburger color="orange" />
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <Drawer.Content
                                        maxWidth="50%"
                                        width="100%"
                                        height="100vh"
                                    >
                                        <Drawer.Header>
                                            <Drawer.Title
                                                fontSize="15px"
                                                fontFamily="serif"
                                                color="orange"
                                            >
                                                Product Menu
                                            </Drawer.Title>
                                        </Drawer.Header>
                                        <Drawer.Body>
                                            <Text fontSize={"13px"} fontFamily="serif">All Categories</Text>
                                            <Text fontSize={"13px"} fontFamily="serif" marginTop={"5px"}> Product Category 1</Text>
                                            <Text fontSize={"13px"} fontFamily="serif" marginTop={"5px"}> Product Category 2</Text>
                                            <Text fontSize={"13px"} fontFamily="serif" marginTop={"5px"}> Product Category 3</Text>
                                            <Text fontSize={"13px"} fontFamily="serif" marginTop={"5px"}> Product Category 4</Text>
                                            <Text fontSize={"13px"} fontFamily="serif" marginTop={"5px"}> Product Category 5</Text>
                                            <Text fontSize={"13px"} fontFamily="serif" marginTop={"5px"}> Product Category 6</Text>
                                        </Drawer.Body>
                                        <Drawer.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Drawer.CloseTrigger>
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>

                    </Box>

                    <Box display={{ base: "block", md: "none" }} marginLeft="70%">
                        <Drawer.Root open={searchOpen} onOpenChange={(e) => setSearchOpen(e.open)} placement="top">
                            <Drawer.Trigger asChild>
                                <Box>
                                    <BiSearch />
                                </Box>
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <Drawer.Content
                                        width="100%"
                                        height="30%"
                                    >
                                        <Drawer.Header py={3}>
                                            <Drawer.Title
                                                fontSize="15px"
                                                fontFamily="serif"
                                                color="orange"
                                            >
                                                Search
                                            </Drawer.Title>
                                        </Drawer.Header>
                                        <Drawer.Body>
                                            <Group attached w="full" maxW="sm">
                                                <Input flex="1" placeholder="Search for the products..." size="xs" type='text'
                                                    onChange={(e) => {
                                                        setSearchText(e.target.value)
                                                        setSearchError('')
                                                    }}
                                                />
                                                <Button bg="bg.subtle" variant="outline" size="xs" color="orange" onClick={handleSearch}>
                                                    <FaArrowAltCircleRight />
                                                </Button>
                                            </Group>
                                            {searchError && (
                                                <Text color="red" fontSize="xs" mt="1">
                                                    {searchError}
                                                </Text>
                                            )}
                                        </Drawer.Body>
                                        <Drawer.Footer>

                                        </Drawer.Footer>
                                        <Drawer.CloseTrigger asChild>
                                            <CloseButton size="sm" onClick={() => setSearchError('')} />
                                        </Drawer.CloseTrigger>
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>

                    </Box>

                    <Box
                        fontFamily="serif"
                        display={{ base: "none", md: "block" }}
                        color="orange"
                        fontSize={[null, null, "15px", "20px"]}
                        flexShrink={0}
                    >
                        Product Categories
                    </Box>

                    <Box
                        display={{ base: "none", md: "block" }}
                        marginLeft="5%"
                        width="40%"
                    >
                        <Input
                            placeholder='Search for the products...'
                            type="text"
                            value={searchTextLap}
                            onChange={(e) => setSearchTextLap(e.target.value)}
                        ></Input>
                    </Box>

                    <Button bg="rgb(27 101 162 / 60%)" display={{ base: "none", md: "block" }}>
                        <FaSearch onClick={handleSearchLap} />
                    </Button>

                    <Box marginLeft={["3%", "3%", "25%", "25%"]} fontSize={["15px", "10px", "25px", "25px"]}
                        _hover={{ cursor: "pointer" }}
                    >
                        <FaHeart color='red' onClick={() => {
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
                                navigate('/products/wishlist')
                            }
                        }} />
                    </Box>

                    <Box marginLeft={["2%", "3%", "3%", "3%"]} fontSize={["15px", "10px", "25px", "25px"]}
                        _hover={{ cursor: "pointer" }}
                    >
                        <FaCartArrowDown onClick={() => {
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
                                navigate('/products/cart')
                            }
                        }} />
                    </Box>

                </HStack>


            </Box>

            <Box
                marginTop={"15px"}
                height="100vh"
                bg="gray.200"
            >
                <Box display="flex" height="100vh">
                    <Box
                        display={{ base: "none", md: "block" }}
                        marginLeft={"40px"}
                        width={[null, null, "200px", "220px"]}
                        bg="white"
                        marginTop="3px"
                        borderRadius="8px"
                        height="100vh"
                        overflowY="auto"
                    >
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">All Categories</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 1</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 2</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 3</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 4</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 5</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 6</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 7</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 8</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 9</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 10</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 11</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 12</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 13</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 14</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 15</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 16</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 17</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 18</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 19</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 20</Text>
                        <Text fontSize={[null, null, "15px", "17px"]} marginLeft={[null, null, "10px", "20px"]} marginTop="5px" fontFamily="serif">Product Category 21</Text>

                    </Box>

                    <Box overflowY="auto" paddingLeft={["15px", null, "25px", "25px"]} paddingRight={["15px", "15px", "25px", "25px"]}
                        width="100%"
                        paddingBottom={"20px"}
                    >
                        {isSearching && (
                            <Box ref={resultRef}>
                                <HStack justify="space-between" mb={3} px={2} ref={resultRef}>
                                    <Text
                                        fontSize={["sm", "sm", "md", "20px"]} fontFamily="serif" color="black"
                                        mt={["3px", "3px", "10px", "10px"]}
                                    >
                                        🔍 Showing results for search "<Text as="span" color="orange.600" display="inline">{lastSearch}</Text>"
                                    </Text>
                                    <Tooltip content="Clear search results" showArrow>
                                        <CloseButton onClick={handleClearSearch} color="red" />
                                    </Tooltip>
                                </HStack>
                            </Box>
                        )}
                        <SimpleGrid columns={[2, 2, 3, 4]} >
                            {(isSearching ? filteredProducts : currentProducts).map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </SimpleGrid>
                        {!isSearching && (<HStack justify="center" mt="5">
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
                        </HStack>)}
                    </Box>

                </Box>
            </Box>



        </>
    )
}

export default Products
