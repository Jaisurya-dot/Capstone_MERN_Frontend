import React from 'react';

const PrimaryButton = ({ children, onClick, type = "button", variant = "primary", className = "", childrenClassName = "" }) => {
    const baseStyles = "px-6 py-2.5 font-semibold rounded-xl transition-all cursor-pointer shadow-lg active:scale-95";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
        secondary: "text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-none hover:shadow-sm",
        outline: "border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-none hover:shadow-sm",
        ghost: "p-2 text-gray-400 hover:text-red-500 shadow-none transition-colors"
    };

    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        >
            <span className={`flex items-center gap-2 ${childrenClassName}`}>{children}</span>
        </button>
    );
};

export default PrimaryButton;
