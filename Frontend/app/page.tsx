import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="text-white min-h-screen font-sans bg-black">
            {/* Hero Section */}
            <section
                className="h-screen flex flex-col justify-center items-center text-center px-6 relative"
                style={{
                    backgroundImage: "url('bg.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-b from-white/10 via-black/30 to-black/90 z-10"></div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    AquaSentinel
                </h1>
                <p className="text-lg md:text-xl max-w-2xl">
                    An AI-powered water quality prediction system ensuring safe
                    and sustainable water management. Water pollution is a
                    critical issue affecting millions. AquaSentinel leverages AI
                    to analyze key water parameters and predict future water
                    quality, helping authorities take proactive measures.
                </p>
            </section>
            {/* Problem Identified */}
            <section className="h-screen border-b border-white flex flex-col justify-center  md:text-xl max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold py-3">Problem Identified</h1>
                <p className="text-lg">
                    Mumbai's drainage creeks, which carry excess water, reflect
                    the same pollution levels as the city's water supply, making
                    them key indicators of contamination. These water bodies
                    suffer from untreated sewage, industrial discharge, and
                    urban runoff, affecting public health and water management.
                    Accurate monitoring and predictive insights are essential to
                    prevent further deterioration and ensure safe water for
                    consumption.
                </p>
            </section>

            {/* Proposed Solution */}
            <section className="h-screen border-b border-white flex flex-col justify-center  md:text-xl max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold py-3">Proposed Solution</h1>
                <p className="text-lg">
                    Our AI-powered solution combines machine learning for water
                    quality prediction and IBM Watsonx.ai for AI-driven insights
                    to forecast pollution trends, detect contamination levels,
                    and recommend preventive actions. By analysing historical
                    water quality data from multiple sources, our system
                    provides real-time alerts and predictive insights to support
                    clean water management and pollution control.
                </p>
            </section>

            {/* CTA */}
            <section className="h-screen border-b border-white flex flex-col justify-center items-center md:text-xl max-w-2xl mx-auto"> 
                <h2 className="text-4xl font-bold mb-4">
                    Join the Movement for Clean Water
                </h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                    Explore water quality predictions and contribute to a
                    sustainable future. Our AI-driven solution helps monitor and
                    forecast water quality, empowering communities to take
                    action.
                </p>
                <Link
                    href={"/next"}
                    className="text-black bg-white py-2 px-8 rounded-md"
                >
                    Get Insights
                </Link>
            </section>
            {/* Footer */}
            <footer className="py-6 text-center bg-gradient-to-b from-black/70 to-black ">
                <p>&copy; 2025 AquaSentinel. All rights reserved.</p>
            </footer>
        </div>
    );
}
