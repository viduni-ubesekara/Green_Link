import React, { useEffect, useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, Text, Stack } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Checkout() {
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

    // Calculate the grand total (sum of all item totals)
    const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    // Generate and download the receipt as a PDF
    const handleDownloadReceipt = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text("Receipt", 14, 20);

        // Add cart items details
        doc.setFontSize(12);
        let yPosition = 30;
        cartItems.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.itemName} - Rs.${item.itemPrice} x ${item.itemCount} = Rs.${item.totalPrice}`, 14, yPosition);
            yPosition += 10;
        });

        // Add the grand total
        doc.setFontSize(14);
        doc.text(`Grand Total: Rs.${grandTotal}`, 14, yPosition + 10);

        // Save the PDF
        doc.save("receipt.pdf");
    };

    const handleBackToCart = () => {
        navigate("/cart"); // Navigate to the Cart page
    };

    const handleBackToShop = () => {
        navigate("/inventoryPanel/shop"); // Navigate to the Shop page with the correct path
    };

    const handlePlaceOrder = () => {
        navigate("/payment"); // Navigate to the Payment page
    };

    return (
        <Container maxW="container.md">
            <Text fontSize="2xl" mb={4}>Checkout</Text>

            {cartItems.length === 0 ? (
                <Text>Your cart is empty. Please add items to the cart first.</Text>
            ) : (
                <>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Item Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cartItems.map((item) => (
                                <Tr key={item._id}>
                                    <Td>{item.itemName}</Td>
                                    <Td>{item.itemCount}</Td>
                                    <Td>Rs.{item.itemPrice}</Td>
                                    <Td>Rs.{item.totalPrice}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                    <Text fontSize="xl" mt={4}>
                        <strong>Grand Total: </strong>Rs.{grandTotal}
                    </Text>

                    <Stack spacing={4} mt={6}>
                        <Button colorScheme="blue" onClick={handleDownloadReceipt}>
                            Download Receipt
                        </Button>
                        {/* Back to Cart Button */}
                        <Button colorScheme="teal" onClick={handleBackToCart}>
                            Back to Cart
                        </Button>
                        {/* Back to Shop Button */}
                        <Button colorScheme="purple" onClick={handleBackToShop}>
                            Back to Shop
                        </Button>
                        {/* Place Order Button */}
                        <Button colorScheme="green" onClick={handlePlaceOrder}>
                            Place Order
                        </Button>
                    </Stack>
                </>
            )}
        </Container>
    );
}

export default Checkout;
