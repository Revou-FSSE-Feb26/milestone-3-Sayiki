"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Image from "next/image";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login?redirect=/admin');
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      fetchProducts();
    }
  }, [mounted, isAuthenticated]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setMessage("Failed to load products");
      setLoading(false);
    }
  }, []);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateProduct = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(formData.price))) newErrors.price = "Price must be a number";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProduct()) return;

    try {
      const url = editingId ? `https://fakestoreapi.com/products/${editingId}` : 'https://fakestoreapi.com/products';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        setFormData({ title: "", price: "", description: "", image: "", category: "" });
        setIsEditing(false);
        setEditingId(null);
        fetchProducts();
      } else {
        setMessage("Operation failed");
      }
    } catch (error) {
      setMessage("Error occurred");
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      category: product.category,
    });
    setEditingId(product.id.toString());
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        fetchProducts();
      } else {
        setMessage("Delete failed");
      }
    } catch (error) {
      setMessage("Error occurred");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", price: "", description: "", image: "", category: "" });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
              Admin Access Required
            </h1>
            <p className="text-neutral-600 mb-6">
              Please log in to access the admin panel.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <p>Loading products...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              Admin Panel
            </h1>
            <p className="text-sm text-neutral-500">
              Manage products
            </p>
          </div>
          {message && (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              {message}
            </span>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900">Products ({products.length})</h2>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex h-20 w-full items-center justify-center rounded-xl bg-[#f2f1ee] sm:w-24">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={80}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {product.title}
                  </h3>
                  <span className="text-sm font-medium text-neutral-700">
                    ${product.price}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleEdit(product)}
                    className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  {isEditing ? 'Update Product' : 'Add Product'}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}