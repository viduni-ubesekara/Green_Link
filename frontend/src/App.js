import React from "react";
import { Routes, Route } from "react-router-dom";
import AddCrop from "./pages/AddCrop";
import CropList from "./pages/CropList";
import CropDetails from './pages/CropDetails';
import EditCrop from './pages/EditCrop';

const App = () => {
    return (
        <Routes>
            <Route path="/add-crop" element={<AddCrop />} />
        
            <Route path="/" element={<CropList />} /> 
            <Route path="/crop/:id" element={<CropDetails />} />
            <Route path="/edit-crop/:id" element={<EditCrop />} />
        </Routes>
    );
};

export default App;
