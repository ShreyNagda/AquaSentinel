"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

export default function Forecast() {
    const [monthlyForecastData, setMonthlyForecastData] = useState(null);
    const [yearlyForecastData, setYearlyForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getForecast() {
            const response = await fetch("http://localhost:5000/forecast", {
                method: "GET",
            });
            const data = await response.json();
            setMonthlyForecastData(data["monthly"]);
            setYearlyForecastData(data["yearly"]);
            setLoading(false);
        }
        getForecast();

        return () => {};
    }, []);

    if (loading) {
        return (
            <div className="bg-black h-screen flex flex-col items-center justify-center">
                Fetching Forecast Data
                <BeatLoader color="white" />
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white p-2 md:p-4">
            <div className="flex justify-between py-4">
                <h1 className="text-xl md:text-2xl">Forecast Future WQI</h1>
                <Link href={"/next"}>
                    <X />
                </Link>
            </div>
            <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-blue-400 text-center">
                    📊 Water Quality Forecast
                </h2>

                {/* Monthly Forecast Chart */}
                <div className="mt-6 bg-gray-800 p-4 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold text-blue-300">
                        Monthly WQI Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyForecastData!}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="gray"
                            />
                            <XAxis dataKey="ds" stroke="white" />
                            <YAxis stroke="white" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="yhat"
                                stroke="#38bdf8"
                                strokeWidth={3}
                                dot={{ stroke: "#38bdf8", strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Yearly Forecast Chart */}
                <div className="mt-6 bg-gray-800 p-4 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold text-blue-300">
                        Yearly WQI Forecast
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={yearlyForecastData!}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="gray"
                            />
                            <XAxis dataKey="ds" stroke="white" />
                            <YAxis stroke="white" />
                            <Tooltip />
                            <Bar dataKey="yhat" fill="#facc15" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Insights Section */}
                <div className="mt-6 p-5 bg-gray-800 border-l-4 border-blue-500 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold text-yellow-300">
                        🔍 AI Insights
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        The monthly WQI shows an increasing trend in mid-2025
                        but drops towards 2026, indicating seasonal variations.
                        The yearly forecast predicts a gradual decline in water
                        quality, suggesting a need for improved water management
                        strategies.
                    </p>
                </div>
            </div>
        </div>
    );
}
