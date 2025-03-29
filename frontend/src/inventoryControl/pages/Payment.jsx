import React, { useState } from 'react';
import { Container, FormControl, FormLabel, Input, Button, Textarea, Stack, Text, Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [paymentSlip, setPaymentSlip] = useState('');
    const [orderReceipt, setOrderReceipt] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Handle form submission logic here (send data to the server or save it to the database)
        setPaymentStatus('Payment Successful! Thank you for your order.');

        // Redirect after successful payment
        setTimeout(() => {
            navigate('/'); // Navigate to home or another route after payment is processed
        }, 2000);
    };

    return (
        <Container maxW="container.md" my="6">
            <Text fontSize="2xl" mb={4}>Payment Information</Text>

            <Box borderWidth="1px" p="4" borderRadius="lg">
                <Text mb={4}>Please fill in the details below to complete your purchase:</Text>
                <FormControl mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Order Receipt (Upload a copy)</FormLabel>
                    <Input
                        type="file"
                        accept="image/*, .pdf"
                        onChange={(e) => setOrderReceipt(e.target.files[0])}
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Payment Slip (Upload a copy)</FormLabel>
                    <Input
                        type="file"
                        accept="image/*, .pdf"
                        onChange={(e) => setPaymentSlip(e.target.files[0])}
                    />
                </FormControl>

                <Stack spacing={4} direction="row" align="center">
                    <Button colorScheme="blue" onClick={handleFormSubmit}>Submit Payment</Button>
                </Stack>

                {paymentStatus && (
                    <Text mt={4} color="green.500">{paymentStatus}</Text>
                )}

                <Text mt={4}>
                    <strong>Banking Details:</strong><br />
                    Name: Green Link Agriculture Pvt Limited<br />
                    Account Number: 13422301<br />
                    Branch: Wallawaththa<br />
                </Text>
            </Box>
        </Container>
    );
}

export default Payment;
