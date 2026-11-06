"use client"
import { X } from "@phosphor-icons/react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Trava o scroll da página de fundo quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Fundo Escuro com Desfoque (Glassmorphism) */}
      <div 
        className="absolute inset-0 bg-[#1E2B50]/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Card do Modal */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-full">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-extrabold text-[#1E2B50]">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
          >
            <X weight="bold" />
          </button>
        </div>
        
        {/* Corpo do Modal (Onde vai o formulário) */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}