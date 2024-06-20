
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface NavBarProps {
  onAdd: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const cartTotalQuantity = useSelector((state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <nav className="bg-gray-800 text-white py-8 px-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4">
        <button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition duration-300" 
          onClick={onAdd}
        >
          Add Product
        </button>
      </div>
      <div>
        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center space-x-2"
          onClick={() => navigate('/cart')}
        >
          <ShoppingCartOutlined />
          <span>Cart ({cartTotalQuantity})</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
