import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Button, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Product } from '../Store/slices/productSlice';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, onSave, product }) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        image: product.image ? [{ url: product.image }] : [],
      });
      setImageUrl(product.image || null);
    } else {
      form.resetFields();
      setImageUrl(null);
    }
  }, [product, form]);

  const handleFinish = (values: any) => {
    const newProduct: Product = {
      id: product ? product.id : uuidv4(),
      image: imageUrl || '',
      name: values.name,
      price: parseFloat(values.price),
      category: values.category,
      description: values.description,
    };

    onSave(newProduct);
  };

  const beforeUpload = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    const isImage = allowedTypes.includes(file.type);
    if (!isImage) {
      message.error('You can only upload JPEG, PNG, GIF, BMP, or WEBP files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const customUpload = async ({ file, onSuccess, onError }: any) => {
    setUploading(true);
    try {
      const base64 = await getBase64(file);
      setImageUrl(base64);
      onSuccess(null, file);
      message.success('Upload successful!');
    } catch (error) {
      console.error('Upload error:', error);
      onError(error);
      message.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const getValueFromEvent = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal visible={visible} title={product ? 'Edit Product' : 'Add Product'} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="image" label="Image" valuePropName="fileList" getValueFromEvent={getValueFromEvent}>
          <Upload
            listType="picture"
            beforeUpload={beforeUpload}
            maxCount={1}
            customRequest={customUpload}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} loading={uploading}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter the product category' }]}>
          <Select placeholder="Select a category">
            <Option value="electronics">Frontend</Option>
            <Option value="clothing">Backend</Option>
            <Option value="furniture">Full Stack</Option>
            <Option value="beauty">AI Ml</Option>
            <Option value="sports">Cloud</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the product description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={uploading}>Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
