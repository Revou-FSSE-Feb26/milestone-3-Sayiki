"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Image from "next/image";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // State for form (add/edit)
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check auth and redirect
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login?redirect=/admin');
    }
  }, [mounted, isAuthenticated, router]);

  // Fetch products on load
  useEffect(() => {
    if (mounted && isAuthenticated) {
      fetchProducts();
    }
  }, [mounted, isAuthenticated]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setMessage("Failed to load products");
      setLoading(false);
    }
  };

  // Form validation
  const [errors, setErrors] = useState({});

  // Validate form data
  const validateProduct = () => {
    const newErrors = {};
    
    // Title validation
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    
    // Price validation
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    // Image URL validation (optional but if provided, should be URL)
    if (formData.image && !formData.image.startsWith('http')) {
      newErrors.image = "Image must be a valid URL (http/https)";
    }
    
    // Category validation
    if (formData.category && formData.category.length < 2) {
      newErrors.category = "Category must be at least 2 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous message and validate
    setMessage("");
    if (!validateProduct()) {
      setMessage("Please fix the errors below");
      return;
    }

    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.image,
          category: formData.category
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage(result.message);
        setShowForm(false);
        resetForm();
        fetchProducts(); // Refresh list
      } else {
        setMessage("Operation failed");
      }
    } catch (error) {
      setMessage("Error saving product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage(result.message);
        fetchProducts(); // Refresh list
      } else {
        setMessage("Delete failed");
      }
    } catch (error) {
      setMessage("Error deleting product");
    }
  };

  // Start editing
  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      category: product.category
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
      category: ""
    });
    setErrors({}); // Clear all errors
  };

  // Show loading or redirect
  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="px-6 py-10">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="px-6 py-10">
          <p>Redirecting to login...</p>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="px-6 py-10">
          <p>Loading admin panel...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 sm:px-10 lg:px-16 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your products</p>
          </div>
          <Button 
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) resetForm();
            }}
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </Button>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">{message}</p>
            <button 
              onClick={() => setMessage("")}
              className="text-blue-600 text-sm hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({...formData, title: e.target.value});
                    if (errors.title) setErrors({...errors, title: null}); // Clear error on change
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 text-black ${
                    errors.title 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter product title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData({...formData, price: e.target.value});
                      if (errors.price) setErrors({...errors, price: null});
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 text-black ${
                      errors.price 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => {
                      setFormData({...formData, category: e.target.value});
                      if (errors.category) setErrors({...errors, category: null});
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 text-black ${
                      errors.category 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="electronics, clothing, etc."
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({...formData, image: e.target.value});
                    if (errors.image) setErrors({...errors, image: null});
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 text-black ${
                    errors.image 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Product description..."
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  {editingId ? 'Update Product' : 'Add Product'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">All Products ({products.length})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product.id} className="p-6 flex items-center gap-4">
                {/* Product Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${product.price} • {product.category}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    ID: {product.id}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 border-red-300 hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}