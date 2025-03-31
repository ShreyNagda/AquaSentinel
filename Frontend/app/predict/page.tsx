"use client";
import { MoveLeft, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Predict() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const [date, setDate] = useState(getFormattedDate());
    const [formData, setFormData] = useState({
        source_id: "1317",
        year: date.split("-")[0],
        month: date.split("-")[1],
        pH: "0",
        DO: "3",
        COD: "",
        BOD: "",
        Nitrate: "",
        FC: "",
    });
    const [predictionData, setPredictionData] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.year || !formData.month) {
            toast.error("Select a date");
            return false;
        } else if (!formData.source_id) {
            toast.error("Select a source");
            return false;
        } else if (!formData.pH) {
            toast.error("Select pH level");
            return false;
        } else if (!formData.DO) {
            toast.error("Select Dissolved O₂ level");
            return false;
        } else if (!formData.COD) {
            toast.error("Enter Chemical Oxygen Demand (COD) level");
            return false;
        } else if (!formData.BOD) {
            toast.error("Enter Biological Oxygen Demand (BOD) level");
            return false;
        } else if (!formData.Nitrate) {
            toast.error("Enter Nitrate level");
            return false;
        } else if (!formData.FC) {
            toast.error("Enter Fecal Coliform (FC) level");
            return false;
        } else {
            toast.success("Data validated successfully!");
            return true;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (validateForm()) {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setResult(data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-black h-screen flex items-center justify-center">
                <BeatLoader color="white" />
            </div>
        );
    }

    if (result && !loading) {
        const predictedWQI = result["Predicted WQI"];
        const pollutionLevel = result["Pollution Level"];
        const aiInsight = result["AI Insight"];
        // const { predictedWQI, pollutionLevel, aiInsight } = result;
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-2xl rounded-none md:rounded-lg border border-gray-700 backdrop-blur-md bg-opacity-60 space-y-2">
                    <h2 className="text-3xl font-extrabold text-blue-400 ">
                        🌊 Water Quality Index (WQI) Prediction
                    </h2>

                    <div className="mt-6">
                        {/* WQI Prediction */}
                        <p className="text-lg flex items-center gap-2">
                            <span className="font-semibold text-gray-300">
                                Predicted WQI:
                            </span>
                            <span
                                className={`text-lg font-bold px-3 py-1 rounded-lg shadow-md transition-all ${
                                    predictedWQI < 50
                                        ? "bg-red-500 text-white animate-pulse"
                                        : predictedWQI <= 75
                                        ? "bg-yellow-500 text-gray-900"
                                        : "bg-green-500 text-gray-900"
                                }`}
                            >
                                {predictedWQI}
                            </span>
                        </p>

                        {/* Pollution Level */}
                        <p className="text-lg flex items-center gap-2">
                            <span className="font-semibold text-gray-300">
                                Pollution Level:
                            </span>
                            <span
                                className={`font-bold px-3 py-1 rounded-md shadow-md transition-all ${
                                    pollutionLevel === "High Pollution"
                                        ? "text-red-400"
                                        : pollutionLevel ===
                                          "Moderate Pollution"
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                }`}
                            >
                                {pollutionLevel}
                            </span>
                        </p>
                    </div>

                    {/* AI Insights */}
                    <div className="mt-6 p-5 bg-gray-800 border-l-4 border-blue-500 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-400">
                            🤖 AI Insights using WatsonxAI
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base transition-all hover:text-white">
                            {aiInsight}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-white px-4 py-2 rounded-sm flex gap-2"
                    >
                        <MoveLeft />
                        Back
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-black h-screen text-white p-2 md:p-4">
            <div className="flex justify-between">
                <h1 className="text-xl md:text-2xl">Estimate WQI</h1>
                <Link href={"/next"}>
                    <X />
                </Link>
            </div>
            <div className="md:max-w-[400px] mx-auto w-full bg-black">
                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 rounded-lg shadow-lg flex flex-col space-y-4"
                >
                    <select
                        value={formData.source_id}
                        className="bg-black p-2 rounded-sm"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                source_id: e.target.value,
                            })
                        }
                        name="source_id"
                    >
                        <option value={1317}>
                            1317 - Thane Creek at Elephanta Caves
                        </option>
                        <option value={1318}>
                            1318 - Mahim Creek at Mahim Bay
                        </option>
                        <option value={2168}>2168 - Mithi River</option>
                    </select>
                    <input
                        type="date"
                        value={date.toString()}
                        onChange={(e) => {
                            setDate(e.target.value);
                            let _date = new Date(e.target.value);
                            setFormData({
                                ...formData,
                                year: _date.getFullYear().toString(),
                                month: (_date.getMonth() + 1).toString(),
                            });
                        }}
                        className="rounded w-full appearance-none cursor-pointer text-white border p-2"
                    />
                    <div className="flex justify-between ">
                        <label htmlFor="pH">PH Value</label>
                        <p>{formData.pH}</p>
                    </div>
                    <input
                        id="pH"
                        type="range"
                        name="pH"
                        min={0}
                        max={14}
                        step={0.01}
                        value={formData.pH}
                        onChange={handleChange}
                        className="bg-gray-700 rounded w-full h-2 appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between ">
                        <label htmlFor="pH">Dissolved Oxygen (mg / L)</label>
                        <p>{formData.DO}</p>
                    </div>
                    <input
                        id="DO"
                        type="range"
                        name="DO"
                        min={0}
                        max={14}
                        step={0.01}
                        value={formData.DO}
                        onChange={handleChange}
                        className="bg-gray-700 rounded w-full h-2 appearance-none cursor-pointer"
                    />
                    <input
                        type="text"
                        name="COD"
                        placeholder="COD Level"
                        value={formData.COD}
                        onChange={handleChange}
                        className="p-2 border rounded bg-black focus:bg-black focus:outline-none"
                    />
                    <input
                        type="text"
                        name="BOD"
                        placeholder="BOD Level"
                        value={formData.BOD}
                        onChange={handleChange}
                        className="p-2 border rounded bg-black focus:bg-black focus:outline-none"
                    />
                    <input
                        type="text"
                        name="Nitrate"
                        placeholder="Nitrate Level"
                        value={formData.Nitrate}
                        onChange={handleChange}
                        className="p-2 border rounded bg-black focus:bg-black focus:outline-none"
                    />
                    <input
                        type="text"
                        name="FC"
                        placeholder="Foecal Coliform"
                        value={formData.FC}
                        onChange={handleChange}
                        className="p-2 border rounded bg-black focus:bg-black focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Get Predictions
                    </button>
                </form>
            </div>
        </div>
    );
}
