import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// MUI Components
import { Container, CircularProgress, Box } from '@mui/material';

// Components
import SlideBar from '../Components/SlideBar';
import ItemUpdateForm from '../Components/ItemUpdateForm';

function UpdateItemPage() {
  // Get the id parameter from the URL
  const { id } = useParams();

  // State
  const [value, setValue] = useState(null); // Initial value is null to check loading state
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchItemById = async () => {
      const response = await fetch(`/inventoryPanel/${id}`);
      if (!response.ok) {
        console.log('error: ' + response.status);
      }

      const json = await response.json();

      if (response.ok) {
        setValue(json);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchItemById();
  }, [id]);

  return (
    <>
      <SlideBar />
      <Container maxWidth="md">
        {/* Show loading spinner while fetching data */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <ItemUpdateForm item={value} />
        )}
      </Container>
    </>
  );
}

export default UpdateItemPage;
