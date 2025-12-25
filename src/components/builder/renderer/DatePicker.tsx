import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    isCurrent?: boolean;
    onCurrentChange?: (isCurrent: boolean) => void;
    placeholder?: string;
    isEditable?: boolean;
    className?: string;
    onBlur?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    isCurrent = false,
    onCurrentChange,
    placeholder = "Select Date",
    isEditable = true,
    className = "",
    onBlur
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");

    useEffect(() => {
        if (value) {
            const parts = value.split('/');
            if (parts.length === 2) {
                const monthIndex = parseInt(parts[0]) - 1;
                setSelectedMonth(months[monthIndex] || "");
                setSelectedYear(parts[1]);
            } else if (parts.length === 1) {
                setSelectedYear(parts[0]);
            }
        } else {
            setSelectedMonth("");
            setSelectedYear("");
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (isOpen && onBlur) onBlur();
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateChange = (month: string, year: string) => {
        if (!year) {
            onChange("");
            return;
        }

        if (month) {
            const monthNum = (months.indexOf(month) + 1).toString().padStart(2, '0');
            onChange(`${monthNum}/${year}`);
        } else {
            onChange(year);
        }
    };

    if (!isEditable) {
        return <span className={className}>{isCurrent ? "Present" : (value || placeholder)}</span>;
    }

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:border-blue-400 transition-all text-sm font-medium text-gray-700"
            >
                <Calendar size={14} className="text-gray-400" />
                <span>{isCurrent ? "Present" : (value || placeholder)}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 w-64 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-4">
                        {onCurrentChange && (
                            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                                <span className="text-xs font-bold text-gray-500 uppercase">Currently here</span>
                                <input
                                    type="checkbox"
                                    checked={isCurrent}
                                    onChange={(e) => {
                                        onCurrentChange(e.target.checked);
                                        if (e.target.checked) setIsOpen(false);
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase">Month</label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => {
                                        setSelectedMonth(e.target.value);
                                        handleDateChange(e.target.value, selectedYear);
                                    }}
                                    className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Year Only</option>
                                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase">Year</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => {
                                        setSelectedYear(e.target.value);
                                        handleDateChange(selectedMonth, e.target.value);
                                    }}
                                    className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between pt-2">
                            <button
                                onClick={() => {
                                    onChange("");
                                    setIsOpen(false);
                                }}
                                className="text-[10px] font-bold text-red-500 hover:underline"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    if (onBlur) onBlur();
                                }}
                                className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
