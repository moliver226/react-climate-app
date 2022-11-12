import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Radar } from 'react-chartjs-2';
import { calculateMonthlyAverage } from "./utils/calculations";
import { titles, descriptions, options, optionsDark, plugins, optionsDir, optionsDarkDir } from "./utils/chartStyling";
import { ThemeContext } from "../../../utils/ThemeContext";

export default function BarContent({ dataType, city, period }) {
    const title = titles[dataType]
    const description = descriptions[dataType]

    const chartRef = useRef(null);
    const data = useMemo(() => calculateMonthlyAverage(dataType, city, period), [city, period]);
    const theme = useContext(ThemeContext);

    return (
        <div className="temperature-chart">
            <div className="chart-title">
                <span className="chart-title-image"></span>
                <span className="chart-title-text">{title}</span>
            </div>
            <div className="chart-title">
                <span className="chart-title-description">{description}</span>
            </div>
            <div style={{ minHeight: "400px", width: "100%" }}>
                {dataType === "avgMonthlyGustDirection" ?
                    <Radar id="canvas" ref={chartRef} plugins={plugins} options={theme ? optionsDir : optionsDarkDir} data={data} />
                    :
                    <Bar id="canvas" ref={chartRef} plugins={plugins} options={theme ? options : optionsDark} data={data} />
                }
            </div>
        </div>
    )
}
