

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store/Store';
import { Button, InputNumber } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { removeCartItem } from '../Store/slices/cartslice';

interface CartPageProps {
  onQuantityChange: (item: any, quantity: number) => void;
  onRemoveItem: (id: string) => void; 
}

const CartPage: React.FC<CartPageProps> = ({ onQuantityChange, onRemoveItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const handleRemoveItem = (id: string) => {
    dispatch(removeCartItem(id)); 
    onRemoveItem(id); 
  };

  const handleQuantityChange = (item: any, quantity: number | null | undefined) => {
    if (typeof quantity === 'number') {
      onQuantityChange(item, quantity);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="mr-4 text-xl text-gray-600"
        />
        <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
      </div>
      {/* {cartItems.length === 0 ? (
        <p className="text-gray-700 text-lg">Your cart is empty.</p>
      ) : ( */}
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                  <p className="text-gray-700">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(item, value)}
                  className="w-20"
                />
                <Button
                  type="default"
                  danger
                  className="ml-4"
                  onClick={() => handleRemoveItem(item.id)}
                  icon={<DeleteOutlined />}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-8">
            <h3 className="text-xl font-bold text-gray-900">Total: ${totalAmount.toFixed(2)}</h3>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default CartPage;
