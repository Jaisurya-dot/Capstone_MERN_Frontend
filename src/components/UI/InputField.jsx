import React from 'react';

const InputField = ({ label, name, value, onChange, type = "text", placeholder, rows, isTextarea = false, className = "" }) => {
    const baseStyles = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
    
    return (
        <div className={className}>
            {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
            {isTextarea ? (
                <textarea 
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={rows || 4}
                    placeholder={placeholder}
                    className={`${baseStyles} resize-none`}
                />
            ) : (
                <input 
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    className={baseStyles}
                />
            )}
        </div>
    );
};

export default InputField;
