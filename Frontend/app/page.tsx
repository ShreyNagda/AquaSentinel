import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">
                    AquaSentinel
                </h1>
                <p className="text-lg md:text-xl max-w-2xl text-gray-300">
                    An AI-powered water quality prediction system ensuring safe
                    and sustainable water management.
                </p>
                <p className="mt-4 text-gray-400 text-sm md:text-base max-w-3xl">
                    Water pollution is a critical issue affecting millions.
                    AquaSentinel leverages AI to analyze key water parameters
                    and predict future water quality, helping authorities take
                    proactive measures.
                </p>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gray-800">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-10">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            📊 AI-Based Predictions
                        </h3>
                        <p className="text-gray-300">
                            Accurate Water Quality Index (WQI) predictions using
                            Facebook Prophet.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            🚰 Source-Specific Forecasting
                        </h3>
                        <p className="text-gray-300">
                            Filter predictions based on different water sources.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            📅 Monthly & Yearly Predictions
                        </h3>
                        <p className="text-gray-300">
                            Get forecasts for the next 12 months or 5 years.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            🌍 Sustainable Development
                        </h3>
                        <p className="text-gray-300">
                            Aligns with UN SDG 6 for clean water and sanitation.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            🔍 WatsonX AI Insights
                        </h3>
                        <p className="text-gray-300">
                            Provides insights using IBM WatsonX for data-driven
                            decisions.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            ⚡ FastAPI Backend
                        </h3>
                        <p className="text-gray-300">
                            High-performance API for seamless integration with
                            web apps.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="h-screen flex flex-col justify-center items-center text-center px-6">
                <h1 className="p-5 text-3xl">Get an Insight</h1>
                <Link
                    href={"/next"}
                    className="bg-white px-10 py-3 rounded-sm text-gray-800"
                >
                    Get Started
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-900 text-center text-gray-400">
                <p>&copy; 2025 AquaSentinel. All rights reserved.</p>
            </footer>
        </div>
    );
}
