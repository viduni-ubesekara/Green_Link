import React, { useEffect, useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); // Hook to navigate to another route

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const response = await fetch("http://localhost:5000/cart");
        const data = await response.json();
        setCartItems(data);
    };

    const handleRemove = async (id) => {
        await fetch(`http://localhost:5000/cart/remove/${id}`, { method: "DELETE" });
        fetchCart();
    };

    const handleClearCart = async () => {
        await fetch("http://localhost:5000/cart/clear", { method: "DELETE" });
        setCartItems([]);
    };

    const handleCheckout = () => {
        navigate("/checkout"); // Navigate to the Checkout page
    };

    const handleBackToShop = () => {
        navigate("/shop"); // Navigate to the Shop page
    };

    return (
        <Container maxW="container.md">
            <Text fontSize="2xl" mb={4}>Shopping Cart</Text>

            {cartItems.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Item Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Total</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cartItems.map((item) => (
                                <Tr key={item._id}>
                                    <Td>{item.itemName}</Td>
                                    <Td>{item.itemCount}</Td>
                                    <Td>Rs.{item.itemPrice}</Td>
                                    <Td>Rs.{item.totalPrice}</Td>
                                    <Td>
                                        <Button colorScheme="red" onClick={() => handleRemove(item._id)}>
                                            Remove
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                    <Button colorScheme="red" mt={4} onClick={handleClearCart}>
                        Clear Cart
                    </Button>

                    {/* Checkout Button to navigate to Checkout page */}
                    <Button colorScheme="teal" mt={4} onClick={handleCheckout}>
                        Checkout
                    </Button>

                    {/* Back to Shop Button */}
                    <Button colorScheme="blue" mt={4} onClick={handleBackToShop}>
                        Back to Shop
                    </Button>
                </>
            )}
        </Container>
    );
}

export default Cart;
