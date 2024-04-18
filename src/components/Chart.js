import React, { useContext, useState, useEffect } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from './Card';
import ChartFilter from './ChartFilter';
import ThemeContext from '../context/ThemeContext';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';

export const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
};

export const chartConfig = {
    "1D": {days: 1, weeks: 0, months: 0, years: 0,},
    "1W": {days: 0, weeks: 1, months: 0, years: 0,},
    "1M": {days: 0, weeks: 0, months: 1, years: 0,},
    "1Y": {days: 0, weeks: 0, months: 0, years: 1,},
};

const Chart = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('1W');
    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);

    useEffect(() => {
        const updateChartData = async () => {
            try {
                const result = await fetchHistoricalData(stockSymbol);

                // Get the current date
                const currentDate = new Date();

                // Calculate the start date based on the selected filter
                const { days, weeks, months, years } = chartConfig[filter];
                const startDate = createDate(currentDate, -days, -weeks, -months, -years);

                // Filter the data based on the selected date range
                const filteredData = result.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= startDate && itemDate <= currentDate;
                });

                setData(filteredData);
            } catch (error) {
                setData([]);
                console.log(error);
            }
        };

        updateChartData();
    }, [stockSymbol, filter]);

    return (
        <Card>
            <ul className='flex absolute top-2 right-2 z-40'>
                {Object.keys(chartConfig).map((item) => {
                    return (
                    <li key={item}>
                        <ChartFilter text={item} active={filter === item} onClick={() => {
                            setFilter(item);
                        }}/>
                    </li>
            )})}
            </ul>
            <ResponsiveContainer>
                <AreaChart data={data}>
                <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={darkMode ? '#312e81' : 'rgb(199 210 254)'} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={darkMode ? '#312e81' : 'rgb(199 210 254)'} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area
                    type='monotone'
                    dataKey='value'
                    stroke='#312e81'
                    fillOpacity={1}
                    strokeWidth={0.5}
                    fill='url(#chartColor)'
                />
                <Tooltip contentStyle={darkMode ? {backgroundColor: '#111827'} : null} itemStyle={darkMode ? {color: '#818cf8'} : null}/>
                <XAxis dataKey={'date'} />
                <YAxis domain={['dataMin', 'dataMax']}/>
            </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart