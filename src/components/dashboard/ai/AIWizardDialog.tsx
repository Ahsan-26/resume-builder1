"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { AIPreviewInput, previewAIResume, AIWizardSession } from "@/lib/api/ai";
import { AIPreviewStep } from "./AIPreviewStep";
import toast from "react-hot-toast";

interface AIWizardDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AIWizardDialog: React.FC<AIWizardDialogProps> = ({ isOpen, onClose }) => {
    const t = useTranslations("dashboard");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [wizardData, setWizardData] = useState<AIPreviewInput>({
        target_role: "",
        experience_years: 0,
        skills: [],
        location: "",
        seniority: "mid",
        use_social_photo: false,
    });
    const [wizardSession, setWizardSession] = useState<AIWizardSession | null>(null);

    const handleNext = async (data: Partial<AIPreviewInput>) => {
        const newData = { ...wizardData, ...data };
        setWizardData(newData);

        if (step === 3) {
            // Generate Preview
            await generatePreview(newData);
        } else {
            setStep(step + 1);
        }
    };

    const generatePreview = async (data: AIPreviewInput) => {
        setLoading(true);
        try {
            const session = await previewAIResume(data);
            setWizardSession(session);
            setStep(4); // Preview Step
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to generate preview");
        } finally {
            setLoading(false);
        }
    };

    const resetWizard = () => {
        setStep(1);
        setWizardData({
            target_role: "",
            experience_years: 0,
            skills: [],
            location: "",
            seniority: "mid",
            use_social_photo: false,
        });
        setWizardSession(null);
    };

    const handleClose = () => {
        resetWizard();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Dialog Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] border border-gray-100 dark:border-gray-800 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                            AI Resume Builder
                                        </h2>
                                        <p className="text-xs text-gray-500 font-medium">
                                            Step {step} of 4
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white dark:bg-gray-900">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <TargetRoleStep
                                            key="step1"
                                            initialData={wizardData}
                                            onNext={handleNext}
                                        />
                                    )}
                                    {step === 2 && (
                                        <ExperienceStep
                                            key="step2"
                                            initialData={wizardData}
                                            onNext={handleNext}
                                            onBack={() => setStep(1)}
                                        />
                                    )}
                                    {step === 3 && (
                                        <DetailsStep
                                            key="step3"
                                            initialData={wizardData}
                                            onNext={handleNext}
                                            onBack={() => setStep(2)}
                                            isLoading={loading}
                                        />
                                    )}
                                    {step === 4 && wizardSession && (
                                        <AIPreviewStep
                                            key="step4"
                                            session={wizardSession}
                                            inputData={wizardData}
                                            onBack={() => setStep(3)}
                                            onClose={handleClose}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

// --- Wizard Subcomponents (Internal for now, can extract later) ---

const TargetRoleStep = ({ initialData, onNext }: any) => {
    const [role, setRole] = useState(initialData.target_role);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (role.trim()) onNext({ target_role: role });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">What role are you targeting?</h3>
                <p className="text-gray-500">We'll tailor your resume content to match this position.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Target Job Title</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Senior Frontend Developer"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-500 outline-none transition-all font-medium"
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={!role.trim()}
                    className="w-full py-4 bg-[#00004d] hover:bg-[#002366] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    Continue
                </button>
            </form>
        </motion.div>
    );
};

const ExperienceStep = ({ initialData, onNext, onBack }: any) => {
    const [years, setYears] = useState(initialData.experience_years);
    const [seniority, setSeniority] = useState(initialData.seniority);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Experience Level</h3>
                <p className="text-gray-500">How many years of relevant experience do you have?</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Years of Experience: {years}</label>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={years}
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="w-full accent-purple-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {['junior', 'mid', 'senior', 'lead', 'executive'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setSeniority(level)}
                            className={`p-3 rounded-xl border-2 font-bold capitalize transition-all ${seniority === level
                                ? 'border-purple-600 bg-purple-50 text-purple-700'
                                : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-all"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => onNext({ experience_years: years, seniority })}
                        className="flex-[2] py-4 bg-[#00004d] hover:bg-[#002366] text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const DetailsStep = ({ initialData, onNext, onBack, isLoading }: any) => {
    const [skills, setSkills] = useState<string>(initialData.skills.join(", "));
    const [location, setLocation] = useState(initialData.location);

    const handleSubmit = () => {
        const skillList = skills.split(",").map(s => s.trim()).filter(Boolean);
        onNext({ skills: skillList, location });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Final Details</h3>
                <p className="text-gray-500">Add a few key details to personalize your resume.</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Key Skills (comma separated)</label>
                    <textarea
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g. React, TypeScript, Project Management, Team Leadership"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-500 outline-none transition-all font-medium h-24 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. New York, NY"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-500 outline-none transition-all font-medium"
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        onClick={onBack}
                        disabled={isLoading}
                        className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-[2] py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Sparkles className="animate-spin" size={20} /> Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} /> Generate Magic
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
