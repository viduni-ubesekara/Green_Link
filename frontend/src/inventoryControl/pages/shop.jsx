import React, { useEffect, useState } from 'react';
import { Container, Input, Heading, SimpleGrid, Box, Image, Text, IconButton, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon

function Shop() {
  // States
  const [items, setItems] = useState(null);
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0); // State to keep track of cart items count
  const navigate = useNavigate();

  // Fetch items data from server
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/inventoryPanel');
      const json = await response.json();

      if (response.ok) {
        setItems(json);
      }
    };
    fetchItems();
  }, []);

  // Fetch cart items count
  useEffect(() => {
    const fetchCartCount = async () => {
      const response = await fetch('/cart'); // Assuming cart endpoint is /cart
      const cartItems = await response.json();

      if (response.ok) {
        setCartCount(cartItems.length); // Update cart count based on number of items in cart
      }
    };
    fetchCartCount();
  }, [cartCount]); // Re-fetch the cart count whenever the cart is updated

  return (
    <Container maxW="container.lg" position="relative">
      <Heading as="h1" size="xl" textAlign="center" my="6">
        Green Link Agriculture Shop
      </Heading>

      {/* Cart Icon in the upper right corner */}
      <IconButton
        icon={<FaShoppingCart />}
        position="absolute"
        top="10px"
        right="10px"
        aria-label="Cart"
        colorScheme="teal"
        size="lg"
        onClick={() => navigate('/cart')} // Navigate to the cart page
      >
        <Badge colorScheme="red" position="absolute" top="-5px" right="-5px" borderRadius="full" px={2}>
          {cartCount}
        </Badge>
      </IconButton>

      <Input
        placeholder="Search Items"
        my="6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {items &&
          items
            .filter((item) =>
              query === '' ? true : item.itemName.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => (
              <Box
                key={item.itemID}
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                cursor="pointer"
                onClick={() => navigate(`/item/${item.itemID}`)} // Navigate to detailed page
              >
                <Image src={item.imgURL} alt={item.itemName} boxSize="200px" objectFit="cover" />
                <Text fontSize="lg" fontWeight="bold" mt="2" textAlign="center">
                  {item.itemName}
                </Text>
              </Box>
            ))}
      </SimpleGrid>
    </Container>
  );
}

export default Shop;
