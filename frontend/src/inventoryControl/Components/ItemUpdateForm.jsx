import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { Box, Button, Container, FormControl, FormLabel, Input, Select, Textarea, Image, FormHelperText, Text } from '@chakra-ui/react'

function ItemUpdateForm({ item }) {

    const pageNavigation = useNavigate()

    // States
    const [itemValues, setItemValues] = useState({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        stockCount: item.stockCount,
        itemDescription: item.itemDescription,
        warranty: item.warranty
    })

    // Extract itemValues properties to seperate variable
    const { itemName, itemPrice, stockCount, itemDescription, warranty } = itemValues

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newItemDetails = { itemName, itemPrice, stockCount, itemDescription, warranty }
        try {
            const response = await fetch(`/inventoryPanel/${item.itemID}`, {
                method: 'PATCH',
                body: JSON.stringify(newItemDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            if (response.ok) {
                console.log(response.status + ': Update is successful', json)
                pageNavigation('/inventoryPanel')
            } else {
                console.log(response.status + ': Update is unsuccessful')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdatePrice = async(e) => {
        const value = e.target.value
        if(value < 0){
            alert("Please enter non negative value for price")
            e.target.value = item.itemPrice
        }else {
            setItemValues({
                ...itemValues,
                itemPrice: value
            })
        }
    }

    // Validate stock count
    const handleUpdateStock = async(e) => {
        const value = e.target.value
        if(value < 0){
            alert("Please enter non negative value for stock")
            e.target.value = item.stockCount
        }else {
            setItemValues({
                ...itemValues,
                stockCount: value
            })
        }
    }

    // Navigate back to Home page
    const handleBackNavigate = () => {
        pageNavigation('/inventoryPanel')
    }

    return (
        <>
            <Container>
                <Text fontSize='4xl' paddingTop='24px'>Edit {item.itemID} item</Text>
                <Text fontSize='sm'>Some fields are restricted to change</Text>
                <Box maxWidth='480px' marginBottom='44px' paddingTop='24px' paddingBottom='24px'>

                    <div className='update-form-img-preview'>
                        <Image
                            src={`${item.imgURL}`}
                            boxSize='200px'
                            objectFit='cover'
                        />
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <FormControl marginBottom='12px'>
                            <FormLabel>Item ID</FormLabel>
                            <Input
                                type='text'
                                name='itemID'
                                defaultValue={item.itemID}
                                readOnly
                            />
                            <FormHelperText>You can't change Item ID</FormHelperText>
                        </FormControl>

                        <FormControl marginBottom='12px'>
                            <FormLabel>Item Name</FormLabel>
                            <Input
                                type='text'
                                name='itemName'
                                defaultValue={item.itemName}
                                onChange={(e) => setItemValues({
                                     ...itemValues,
                                    itemName: e.target.value
                                })}
                            />
                        </FormControl>

                        <FormControl marginBottom='12px'>
                            <FormLabel>Item Brand</FormLabel>
                            <Input
                                type='text'
                                name='itemBrand'
                                defaultValue={item.itemBrand}
                                readOnly
                            />
                            <FormHelperText>You can't change Item Brand</FormHelperText>
                        </FormControl>

                        <FormControl marginBottom='12px' isRequired>
                            <FormLabel>Item Price</FormLabel>
                            <Input
                                type='number'
                                name='itemPrice'
                                defaultValue={item.itemPrice}
                                onChange={handleUpdatePrice}
                            />
                        </FormControl>

                        <FormControl marginBottom='12px' isRequired>
                            <FormLabel>Stock Count</FormLabel>
                            <Input
                                type='number'
                                name='stockCount'
                                defaultValue={item.stockCount}
                                onChange={handleUpdateStock}
                            />
                        </FormControl>

                        <FormControl marginBottom='12px'>
                            <FormLabel>Select a catagory</FormLabel>
                            <Select
                                placeholder='Catagory'
                                value={item.catagory}
                                readOnly
                            >
                                <option value='smartphone'>Smartphone</option>
                                <option value='smartwatch'>Smart Watch</option>
                            </Select>
                            <FormHelperText>You can't change Item Catagory</FormHelperText>
                        </FormControl>

                        <FormControl marginBottom='12px'>
                            <FormLabel>Select a warranty</FormLabel>
                            <Select
                                placeholder='Warranty Periode'
                                defaultValue={item.warranty}
                                onChange={(e) => setItemValues({
                                     ...itemValues,
                                    warranty: e.target.value
                                })}
                            >
                                <option value='noWarranty'>0</option>
                                <option value='sixMonths'>6 Months</option>
                                <option value='oneYear'>1 Year</option>
                                <option value='twoYear'>2 Year</option>
                            </Select>
                        </FormControl>

                        <FormControl marginBottom='12px'>
                            <FormLabel>Item Description</FormLabel>
                            <Textarea
                                placeholder='Enter detailed description about the item'
                                defaultValue={item.itemDescription}
                                onChange={(e) => setItemValues({
                                    ...itemValues,
                                    itemDescription: e.target.value
                                })}
                            />
                        </FormControl>

                        <Button type='submit' colorScheme='blue'>Save Changes</Button>
                        <Button type='submit' colorScheme='green' marginLeft='24px' onClick={handleBackNavigate}>Back To Home</Button>
                    </Form>
                </Box>
            </Container>
        </>
    )
}

export default ItemUpdateForm