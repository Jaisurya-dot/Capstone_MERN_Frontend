import React from 'react';
import { UploadIcon } from '../UI/Icons';

 
const ThumbnailSection = ({ thumbnail, handleThumbnailChange }) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500 delay-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Course Thumbnail</h3>
            
            <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all overflow-hidden relative">
                {thumbnail ? (
                    <img 
                        src={typeof thumbnail === 'string' ? thumbnail : URL.createObjectURL(thumbnail)} 
                        alt="Thumbnail preview" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <>
                        <UploadIcon className="w-10 h-10 text-gray-300 group-hover:text-blue-400 mb-2 transition-colors uppercase" />
                        <span className="text-sm text-gray-400 group-hover:text-blue-500 font-medium transition-colors">
                            Upload Preview Image
                        </span>
                    </>
                )}
                <input 
                    type="file" 
                    onChange={handleThumbnailChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                />
            </div>
            
            <p className="text-xs text-gray-400 mt-3 italic leading-relaxed">
                Recommended size: 1280x720px (16:9 ratio). <br/> Format: JPG, PNG or WebP.
            </p>
        </section>
    );
};

export default ThumbnailSection;

