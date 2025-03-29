"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function NextPage() {
    const [formData, setFormData] = useState({
        source_id: "",
        year: "",
        month: "",
        pH: "",
        DO: "",
        COD: "",
        BOD: "",
        Nitrate: "",
        FC: "",
    });
    const [predictionData, setPredictionData] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
    };

    const chartData = {
        labels: predictionData?.monthly?.map((item: any) => item.ds) || [],
        datasets: [
            {
                label: "WQI Forecast",
                data:
                    predictionData?.monthly?.map((item: any) => item.yhat) ||
                    [],
                borderColor: "#4F46E5",
                fill: false,
            },
        ],
    };

    return (
        <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">
                Predict Water Quality Index
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4"
                >
                    <input
                        type="text"
                        name="source_id"
                        placeholder="Source ID"
                        value={formData.sourceId}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="pH"
                        placeholder="pH Level"
                        value={formData.pH}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="DO"
                        placeholder="Dissolved Oxygen"
                        value={formData.DO}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="COD"
                        placeholder="COD Level"
                        value={formData.COD}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="BOD"
                        placeholder="BOD Level"
                        value={formData.BOD}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="Nitrate"
                        placeholder="Nitrate Level"
                        value={formData.Nitrate}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="FC"
                        placeholder="Foecal "
                        value={formData.FC}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Get Predictions
                    </button>
                </form>

                {/* Graph Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h2 className="text-xl font-semibold mb-4">
                        Future WQI Forecast
                    </h2>
                    {predictionData ? (
                        <Line data={chartData} />
                    ) : (
                        <p>No Data Available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
