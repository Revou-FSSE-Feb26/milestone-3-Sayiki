"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Get the login function from useAuth (same as useCart!)
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!username || !password) {
      setMessage("Please fill in all fields");
      return false;
    }
    
    if (username.length < 3) {
      setMessage("Username must be at least 3 characters");
      return false;
    }
    
    if (password.length < 4) {
      setMessage("Password must be at least 4 characters");
      return false;
    }
    
    return true;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    // Call the login function (same pattern as addToCart!)
    const result = await login(username, password);
    
    if (result.success) {
      setMessage("Login successful! Redirecting...");
      // Redirect to home page after successful login
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setMessage(result.message);
    }
    
    setIsLoading(false);
  };

  // If already logged in, redirect or show message
  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-16 text-center">
          <h2 className="text-xl font-bold text-green-600 mb-4">Already Logged In!</h2>
          <p className="text-gray-600 mb-4">You are already authenticated.</p>
          <Link href="/" className="text-yellow-500 hover:underline">
            Go to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <form 
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-16 mb-16" 
        onSubmit={handleLogin}
      >
        <Link href="/" className="font-bold text-yellow-500 text-xl">
          RevoShop
        </Link>
        
        {/* Show success/error messages */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            message.includes("successful") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        {/* Test credentials info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold text-blue-700">Admin Credentials:</p>
          <p className="text-blue-600">Username: mor_2314</p>
          <p className="text-blue-600">Password: 83r5^_</p>
          <p className="font-semibold text-blue-700">Customer Credentials:</p>
          <p className="text-blue-600">Username: david_r</p>
          <p className="text-blue-600">Password: 3478*#54</p>
        </div>
        
        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">
          Username
        </label>
        <input 
          className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
            username && username.length < 3 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username (min 3 chars)"
          disabled={isLoading}
        />
        {username && username.length < 3 && (
          <p className="text-red-500 text-sm mt-1">Username must be at least 3 characters</p>
        )}
        
        <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">
          Password
        </label>
        <input 
          className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 transition-colors ${
            password && password.length < 4 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password (min 4 chars)"
          disabled={isLoading}
        />
        {password && password.length < 4 && (
          <p className="text-red-500 text-sm mt-1">Password must be at least 4 characters</p>
        )}
        
        <Button 
          type="submit" 
          className="mt-4" 
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
}