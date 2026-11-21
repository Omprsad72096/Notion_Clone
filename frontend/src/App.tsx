import { useEffect, useState } from "react";
import api from "./services/api";

interface HelloResponse {
    message: string;
    application: string;
    status: string;
}

function App() {
    const [data, setData] = useState<HelloResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get<HelloResponse>("/hello")
            .then(response => {
                setData(response.data);
            })
            .catch(() => {
                setError("Backend connection failed!");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <h2>Connecting...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div>
            <h1>{data?.message}</h1>
            <p>Application: {data?.application}</p>
            <p>Status: {data?.status}</p>
        </div>
    );
}

export default App;