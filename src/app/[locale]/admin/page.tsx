import { FileText, Mail, Users, TrendingUp } from "lucide-react";

const stats = [
    {
        title: "Total Resumes",
        value: "1,234",
        change: "+12%",
        icon: FileText,
        color: "bg-blue-500",
    },
    {
        title: "Cover Letters",
        value: "856",
        change: "+8%",
        icon: Mail,
        color: "bg-purple-500",
    },
    {
        title: "Active Users",
        value: "2,543",
        change: "+24%",
        icon: Users,
        color: "bg-green-500",
    },
    {
        title: "Revenue",
        value: "$12,450",
        change: "+18%",
        icon: TrendingUp,
        color: "bg-orange-500",
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[#00004d]">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 font-medium">{stat.change}</span>
                            <span className="text-gray-400 ml-2">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">New resume template added</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Completed</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Templates</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-16 bg-gray-200 rounded border border-gray-300"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Modern Professional</p>
                                        <p className="text-xs text-gray-500">Resume Template</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">1,204</p>
                                    <p className="text-xs text-gray-500">Uses</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
