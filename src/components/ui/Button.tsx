"use client"
import React, { ButtonHTMLAttributes } from 'react';
import { CircleNotch } from "@phosphor-icons/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ 
  children, 
  loading = false, 
  variant = 'primary', 
  className = '', 
  disabled, 
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2";
  
  const variants = {
    primary: loading || disabled 
      ? "bg-gray-400 text-white cursor-not-allowed shadow-none" 
      : "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/30",
    secondary: loading || disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-[#1E2B50] hover:bg-blue-900 text-white shadow-lg shadow-blue-900/20 hover:-translate-y-1",
    outline: loading || disabled
      ? "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
      : "bg-white text-[#1E2B50] border-2 border-[#1E2B50]/10 hover:border-[#1E2B50]/30 hover:bg-gray-50"
  };

  return (
    <button 
      disabled={loading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <CircleNotch weight="bold" className="animate-spin text-xl" />}
      {children}
    </button>
  );
}