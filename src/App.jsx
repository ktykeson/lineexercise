import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";

function App() {
    const [lineParams, setLineParams] = useState({ m: 1, b: 0 });
    const [aInput, setAInput] = useState(1); // Slope
    const [bInput, setBInput] = useState(0); // Y-intercept
    const [graphRange, setGraphRange] = useState(10); // Initial graph range

    const handleGraph = () => {
        const m = parseFloat(aInput);
        const b = parseFloat(bInput);
        adjustGraphRange(m, b);
        setLineParams({ m, b });
    };

    const adjustGraphRange = (m, b) => {
        // Calculate a suitable range for the graph based on the slope and y-intercept
        const maxVal = Math.max(Math.abs(m) * 5 + Math.abs(b), 5);
        setGraphRange(Math.ceil(maxVal / 10) * 10); // Round up to the nearest multiple of 10
    };

    // Prepare data for the chart, using dynamic range for labels and data calculation
    const data = {
        labels: Array.from({ length: graphRange * 2 + 1 }, (_, i) => i - graphRange),
        datasets: [
            {
                label: "Line",
                data: Array.from(
                    { length: graphRange * 2 + 1 },
                    (_, i) => lineParams.m * (i - graphRange) + lineParams.b
                ),
                borderColor: "purple",
                borderWidth: 2,
            },
        ],
    };

    // Update chart options to use dynamic graph range
    const options = {
        scales: {
            y: {
                type: "linear",
                position: "center",
                min: -graphRange,
                max: graphRange,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Lighter grid lines
                    borderColor: "rgba(255, 255, 255, 0.25)", // Lighter axis border
                    borderWidth: 2,
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                  },
            },
            x: {
                type: "linear",
                position: "center",
                min: -graphRange,
                max: graphRange,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Lighter grid lines
                    borderColor: "rgba(255, 255, 255, 0.25)", // Lighter axis border
                    borderWidth: 2,
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                  },
            },
        },
        elements: {
            point: {
                radius: 0, // Hide points
            },
            line: {
                tension: 0, // Straight lines
            },
        },
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    return (
        <div className="App">
            <div className="input_container">
                <label htmlFor="aInput">M (Slope): </label>
                <input
                    id="aInput"
                    type="number"
                    value={aInput}
                    onChange={(e) => setAInput(e.target.value)}
                />
                <label htmlFor="bInput">       B (Y-Intercept): </label>
                <input
                    id="bInput"
                    type="number"
                    value={bInput}
                    onChange={(e) => setBInput(e.target.value)}
                />
                <button onClick={handleGraph}>Graph</button>
            </div>
            <div className="graph_box">
                <div className="line_graph" style={{ width: "50%" }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default App;
