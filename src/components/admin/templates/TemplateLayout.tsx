"use client";

interface Props {
    formData: any;
    setFormData: (cb: any) => void;
}

export default function TemplateLayout({ formData, setFormData }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Layout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-700">Layout Type</label>
                    <select
                        value={formData.layoutType}
                        onChange={(e) =>
                            setFormData((p: any) => ({ ...p, layoutType: e.target.value }))
                        }
                        className="mt-1 w-full rounded-lg border px-3 py-2"
                    >
                        <option value="single_column">Single Column</option>
                        <option value="two_column">Two Column</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Header Position</label>
                    <select
                        value={formData.layoutHeader}
                        onChange={(e) =>
                            setFormData((p: any) => ({ ...p, layoutHeader: e.target.value }))
                        }
                        className="mt-1 w-full rounded-lg border px-3 py-2"
                    >
                        <option value="top">Top</option>
                        <option value="left">Left</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
