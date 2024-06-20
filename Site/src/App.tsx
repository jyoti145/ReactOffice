import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import NavBar from './Component/NavBar';
import ProductModal from './Component/ProductModal';
import ProductCard from './Component/ProductCard';
import CartPage from'./Component/cartpage';
import ProductDetail from './Component/ProductDetail';
import store, { RootState, AppDispatch } from './Store/Store';
import { Product, setProducts, addProduct, updateProduct, deleteProduct } from './Store/slices/productSlice';
import { setCartItems, addCartItem, updateCartItem, removeCartItem } from './Store/slices/cartslice';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        dispatch(setProducts(response.data));
      })
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:5000/cart')
      .then(response => {
        dispatch(setCartItems(response.data));
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    };

    axios.post('http://localhost:5000/cart', cartItem)
      .then(response => {
        dispatch(addCartItem(response.data));
      })
      .catch(error => console.error('Error adding to cart:', error));
  };

  const handleUpdateCartItem = (item: any, quantity: number) => {
    const updatedItem = { ...item, quantity };

    axios.put(`http://localhost:5000/cart/${item.id}`, updatedItem)
      .then(response => {
        dispatch(updateCartItem(response.data));
      })
      .catch(error => console.error('Error updating cart item:', error));
  };

  const handleRemoveCartItem = (id: string) => {
    axios.delete(`http://localhost:5000/cart/${id}`)
      .then(() => {
        dispatch(removeCartItem(id));
      })
      .catch(error => console.error('Error removing cart item:', error));
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        dispatch(deleteProduct(id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSave = (product: Product) => {
    if (currentProduct) {
      axios.put(`http://localhost:5000/products/${product.id}`, product)
        .then(() => {
          dispatch(updateProduct(product));
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      axios.post('http://localhost:5000/products', product)
        .then(response => {
          dispatch(addProduct(response.data));
        })
        .catch(error => console.error('Error adding product:', error));
    }
    handleCloseModal();
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <NavBar onAdd={handleAdd} />
          <ProductModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            product={currentProduct}
            onSave={handleSave}
          />
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={
                <div className="flex flex-wrap">
                  {products.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              } />
              <Route path="/cart" element={
                <CartPage
                  onQuantityChange={handleUpdateCartItem}
                  onRemoveItem={handleRemoveCartItem}
                />
              } />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
