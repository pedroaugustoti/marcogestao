"use client"
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#1E2B50]/20 focus:border-[#1E2B50] outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
}