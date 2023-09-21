import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockData = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const metaData = data['Meta Data']; // Extract metadata
  const timeSeriesData = data['Time Series (5min)']; // Extract time series data

  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">IBM Stock Data</h1>

      {/* Metadata Header */}
      <div className="mb-4">
  <h2 className="text-xl font-semibold">Metadata</h2>

  {Object.keys(metaData).map((key) => (
    <div key={key} className="mb-2">
      <strong>{key}:</strong> {metaData[key]}
    </div>
  ))}
</div>


      {/* Time Series Table */}
      <div className="border p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-2">Time Series (5min)</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ border: '1px solid #ddd' }}>
              <th style={{ border: '1px solid #ddd' }}>Date</th>
              <th style={{ border: '1px solid #ddd' }}>Open</th>
              <th style={{ border: '1px solid #ddd' }}>High</th>
              <th style={{ border: '1px solid #ddd' }}>Low</th>
              <th style={{ border: '1px solid #ddd' }}>Close</th>
              <th style={{ border: '1px solid #ddd' }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(timeSeriesData).map((date) => {
              const entry = timeSeriesData[date];
              return (
                <tr  style={{ border: '1px solid #ddd' }} key={date}>
                  <td style={{ border: '1px solid #ddd' }}>{date}</td>
                  <td style={{ border: '1px solid #ddd' }}>{entry['1. open']}</td>
                  <td style={{ border: '1px solid #ddd' }}>{entry['2. high']}</td>
                  <td style={{ border: '1px solid #ddd' }}>{entry['3. low']}</td>
                  <td style={{ border: '1px solid #ddd' }}>{entry['4. close']}</td>
                  <td style={{ border: '1px solid #ddd' }}>{entry['5. volume']}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockData;
