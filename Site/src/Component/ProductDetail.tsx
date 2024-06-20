import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { Product } from '../Store/slices/productSlice';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product: Product | undefined = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="mr-4"
        />
        <h2 className="text-2xl font-bold">Product Details</h2>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-2 text-xl">Price: ${product.price}</p>
        <p className="text-gray-700 mb-2 text-xl">Category: {product.category}</p>
        <p className="text-gray-700 text-lg">Description: {product.description}</p>
        {/* <Button type="primary" className="mt-4">Add to Cart</Button> */}
      </div>
    </div>
  );
};

export default ProductDetail;
