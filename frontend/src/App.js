import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";



// Admin Panel
import AdminPanel from "./adminPanel/AdminPanel";
// Inventory Panel
import Home from "./inventoryControl/pages/Home";
import AddItems from "./inventoryControl/pages/AddItems";
import UpdateItemPage from "./inventoryControl/pages/UpdateItemPage";
import Shop from "./inventoryControl/pages/shop";
import ItemDetailPage from "./inventoryControl/pages/ItemDetailPage";
import Cart from "./inventoryControl/pages/Cart";
import Checkout from "./inventoryControl/pages/Checkout";
import Payment from "./inventoryControl/pages/Payment";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

     

      <Route path="/" element={<AdminPanel />} />

      <Route path="/inventoryPanel" element={<Home />} />
      <Route path="/inventoryPanel/addItems" element={<AddItems />} />
      <Route path="/inventoryPanel/item/:id" element={<UpdateItemPage />} />
      <Route path="/inventoryPanel/shop" element={<Shop />} />
      <Route path="/item/:itemID" element={<ItemDetailPage />} />
      <Route path="/cart" element={<Cart />} /> {/* Normal navigation to Cart page */}
      <Route path="/checkout" element={<Checkout />} /> {/* Normal navigation to Checkout page */}
      <Route path="/checkout/:cart" element={<Checkout />} /> {/* Programmatic navigation to Checkout page */}
      <Route path="/payment" element={<Payment />} />

      
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

