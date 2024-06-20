import React from 'react';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Product } from '../Store/slices/productSlice';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onAddToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <Card
      hoverable
      className="w-full max-w-xs rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transition duration-300 transform hover:scale-105 m-4"
      style={{ width: 250 }} 
      cover={<img alt={product.name} src={product.image} className="h-40 object-cover" />} 
      onClick={handleCardClick}
    >
      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 text-sm font-semibold">Price: ${product.price}</p>
        <p className="text-gray-600 text-sm font-semibold mt-2">Category: {product.category}</p>
        <p className="text-gray-600 text-sm font-semibold mt-2">Description: {product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Button
              type="default"
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
            />
            <Button
              type="default"
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none"
              icon={<EditOutlined />}
              onClick={handleEdit}
            />
            <Button
              type="default"
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
