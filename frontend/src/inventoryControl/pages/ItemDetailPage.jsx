import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Image, Heading, Text, Button, Stack, useToast, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa'; // Import the shopping cart icon

function ItemDetailPage() {
  const { itemID } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const toast = useToast();
  const navigate = useNavigate(); // Hook to navigate to the cart page

  useEffect(() => {
    const fetchItemDetails = async () => {
      const response = await fetch(`/inventoryPanel/${itemID}`);
      const json = await response.json();

      if (response.ok) {
        setItem(json);
      }
    };
    fetchItemDetails();
  }, [itemID]);

  if (!item) {
    return <Text>Loading...</Text>;
  }

  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          itemName: item.itemName, 
          itemPrice: item.itemPrice 
        }),
      });
  
      if (response.ok) {
        toast({
          title: "Item added to cart",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error adding item to cart",
          description: errorData.message || "Please try again later.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your network or try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleNavigateToCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <Container maxW="container.md">
      <Box borderWidth="1px" borderRadius="lg" p="6">
        <Image src={item.imgURL} alt={item.itemName} boxSize="100%" objectFit="cover" mb="4" />
        <Heading size="lg" mb="2">{item.itemName}</Heading>
        <Text fontSize="md"><strong>Brand:</strong> {item.itemBrand}</Text>
        <Text fontSize="md"><strong>Price:</strong> Rs.{item.itemPrice}</Text>
        <Text fontSize="md"><strong>Available Stocks:</strong> {item.stockCount}</Text>
        <Text fontSize="md"><strong>Added Date:</strong> {item.createdAt}</Text>

        <Stack direction="row" spacing={4} mt="4">
          <Button colorScheme="green" onClick={handleAddToCart}>Add to Cart</Button>

          {/* Cart icon button to navigate to cart */}
          <Button onClick={handleNavigateToCart} colorScheme="blue" leftIcon={<Icon as={FaShoppingCart} />}>
            Go to Cart
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default ItemDetailPage;
