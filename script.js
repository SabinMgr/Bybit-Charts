const chartContainer = document.getElementById("chart");
const symbolSelect = document.getElementById("symbol");
let chart, candleSeries;

async function fetchData(symbol) {
    const url = `https://api.bybit.com/v2/public/kline/list?symbol=${symbol}&interval=240&limit=50`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.result.map(candle => ({
        time: candle.open_time,
        open: parseFloat(candle.open),
        high: parseFloat(candle.high),
        low: parseFloat(candle.low),
        close: parseFloat(candle.close)
    }));
}

async function createChart(symbol) {
    chartContainer.innerHTML = ""; 
    chart = LightweightCharts.createChart(chartContainer, { width: chartContainer.clientWidth, height: 500 });
    candleSeries = chart.addCandlestickSeries();

    const candles = await fetchData(symbol);
    candleSeries.setData(candles);
}

symbolSelect.addEventListener("change", () => createChart(symbolSelect.value));

createChart(symbolSelect.value);
