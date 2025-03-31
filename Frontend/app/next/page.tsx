import "chart.js/auto";
import Link from "next/link";
export default function NextPage() {
    // const [formData, setFormData] = useState({
    //     source_id: "",
    //     year: "",
    //     month: "",
    //     pH: "",
    //     DO: "",
    //     COD: "",
    //     BOD: "",
    //     Nitrate: "",
    //     FC: "",
    // });
    // const [predictionData, setPredictionData] = useState(null);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const response = await fetch("http://localhost:5000/predict", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //     });
    //     const data = await response.json();
    // };

    return (
        <div className="min-h-screen p-10 flex flex-col items-center justify-center bg-black ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full lg:max-w-2xl mx-auto">
                <Card
                    title="Estimate Water Quality Index"
                    description="Input key water quality parameters such as Dissolved Oxygen, BOD, COD, and Nitrate to get an accurate prediction of the WQI, helping assess water health instantly."
                    link="/predict"
                    linkText="Get Prediction"
                />
                <Card
                    title="Predict Future Water Quality Index"
                    description="Access accurate WQI forecasts for the next 12 months and 5 years. Empower local authorities with data-driven insights to plan and implement effective water body restoration strategies."
                    link="/forecast"
                    linkText="Get Forecast"
                />
            </div>
        </div>
    );
}
function Card({
    title,
    description,
    link,
    linkText,
}: {
    title: string;
    description: string;
    link: string;
    linkText: string;
}) {
    return (
        <div className="p-3 md:p-4 rounded-sm shadow-md bg-white  space-y-2">
            <h1 className="text-lg md:text-2xl font-bold line-clamp-1">
                {title}
            </h1>
            <p>{description}</p>
            <Link
                href={link}
                className="bg-black rounded-sm p-2 px-4 text-white"
            >
                {linkText}
            </Link>
        </div>
    );
}
