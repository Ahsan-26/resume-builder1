import React, { useState, useEffect, useRef } from 'react';

interface EditableFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    multiline?: boolean;
    isEditable?: boolean;
    validate?: (value: string) => string | null;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    value,
    onChange,
    placeholder = "Click to edit",
    className = "",
    style,
    multiline = false,
    isEditable = true,
    validate
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        if (validate) {
            const validationError = validate(localValue);
            if (validationError) {
                setError(validationError);
                return; // Keep editing or show error
            }
        }

        setError(null);
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            setError(null);
            setIsEditing(false);
        }
    };

    if (!isEditable) {
        return (
            <span className={className} style={style}>
                {value || placeholder}
            </span>
        );
    }

    if (isEditing) {
        const inputClasses = `w-full bg-transparent border-b focus:outline-none transition-colors ${error ? 'border-red-500 bg-red-50' : 'border-blue-500'
            } ${className}`;

        return (
            <div className="relative w-full">
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={localValue}
                        onChange={(e) => {
                            setLocalValue(e.target.value);
                            if (error) setError(null);
                        }}
                        onBlur={handleBlur}
                        className={`resize-none ${inputClasses}`}
                        style={style}
                        rows={3}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={localValue}
                        onChange={(e) => {
                            setLocalValue(e.target.value);
                            if (error) setError(null);
                        }}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className={inputClasses}
                        style={style}
                    />
                )}
                {error && (
                    <div className="absolute left-0 top-full mt-1 z-50 bg-red-600 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-1">
                        {error}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            onClick={() => setIsEditing(true)}
            className={`group relative cursor-text rounded px-1 -mx-1 transition-all duration-200 
                ${isEditable ? 'hover:bg-blue-50/80 hover:ring-2 hover:ring-blue-200 hover:ring-offset-1' : ''} 
                ${!value ? 'text-gray-400 italic' : ''} ${className}`}
            style={style}
            role="button"
            tabIndex={0}
        >
            {value || placeholder}
            {isEditable && (
                <div className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-blue-600 text-white p-0.5 rounded-full shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                    </div>
                </div>
            )}
        </div>
    );
};
