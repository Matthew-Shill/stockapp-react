const finnhubBasePath = 'https://finnhub.io/api/v1'

export const searchSymbols = async (query) => {
    const url = `${finnhubBasePath}/search?q=${query}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};

export const fetchStockDetails = async ( stockSymbol) => {
    const url = `${finnhubBasePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

//const alphaVantageBasePath = 'https://www.alphavantage.co/query';

export const fetchQuote = async (stockSymbol) => {
    const url = `${finnhubBasePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`;
    const response = await fetch(url);

    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};

export const fetchHistoricalData = async (symbol, timeFrame) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();

        console.log(data);

        // Check if the data is valid
        if (!data || !data['Time Series (Daily)']) {
            console.error('Invalid data:', data);
            return [];
        }

        // Convert the data to an array of { date, value } objects
        let dataArray = Object.keys(data['Time Series (Daily)']).map((key) => {
            return {
                date: key,
                value: parseFloat(data['Time Series (Daily)'][key]['4. close']),
            };
        });

        // Sort the data array by date in ascending order
        dataArray.sort((a, b) => (a.date > b.date) ? 1 : -1);

         // If the time frame is 1D, fetch the most recent closing price
        if (timeFrame === '1D') {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`);
            const data = await response.json();

            if (data && data['Global Quote'] && data['Global Quote']['05. price']) {
                dataArray.push({
                    date: new Date().toISOString().split('T')[0], // today's date in YYYY-MM-DD format
                    value: parseFloat(data['Global Quote']['05. price']),
                });
            }
        }

        // Filter the data array based on the time frame
        let filteredData;
        switch (timeFrame) {
            case '1D':
                filteredData = dataArray.slice(-1); // last 1 day
                break;
            case '1W':
                filteredData = dataArray.slice(-5); // last 5 days
                break;
            case '1M':
                filteredData = dataArray.slice(-22); // last 22 days
                break;
            case '1Y':
                filteredData = dataArray; // all data (up to 100 days)
                break;
            default:
                filteredData = dataArray; // all data (up to 100 days)
        }

        return filteredData;
    } catch (error) {
        console.error('Failed to fetch historical data:', error);
        return [];
    }
};