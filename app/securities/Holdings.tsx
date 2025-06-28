import React, { useEffect, useState } from 'react';

type HoldingProps = {
  id: number;
  name: string;
  symbol: string;
  quantity: number;
};

const Holdings = () => {
  const [holdings, setHoldings] = useState<HoldingProps[]>([]);
  const [assets, setAssets] = useState<Record<string, number>>({});
  const [holdingValues, setHoldingValues] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/assets');
        // Poll for asset prices every 500ms
        setInterval(async () => {
          try {
            const res = await fetch('/api/assets');
            if (!res.ok) return;
            const data: { symbol: string; price: number }[] = await res.json();
            const assetMap: Record<string, number> = {};
            data.forEach(asset => {
              assetMap[asset.symbol] = asset.price;
            });
            setAssets(assetMap);
          } catch (error) {
            // Optionally handle polling errors
            console.error('Error fetching assets during polling:', error);
          }
        }, 500);
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        const data: { symbol: string; price: number }[] = await response.json();
        const assetMap: Record<string, number> = {};
        data.forEach(asset => {
          assetMap[asset.symbol] = asset.price;
        });
        setAssets(assetMap);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    if (holdings.length && Object.keys(assets).length) {
      const values: Record<number, number> = {};
      holdings.forEach(h => {
        values[h.id] = h.quantity * (assets[h.symbol] || 0);
      });
      setHoldingValues(values);
    }
  }, [holdings, assets]);
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await fetch('/api/holdings');
        if (!response.ok) {
          throw new Error('Failed to fetch holdings');
        }
        const data: HoldingProps[] = await response.json();
        console.log('Fetched holdings:', data); // Debugging log
        setHoldings(data);
      } catch (error) {
        console.error('Error fetching holdings:', error);
      }
    };

    fetchHoldings();
  }, []);


  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Holdings</h2>
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-300 px-4 py-2">Symbol</th>
            <th className="border-b border-gray-300 px-4 py-2">Quantity</th>
            <th className="border-b border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.id} className="hover:bg-gray-50">
              <td className="border-b border-gray-300 px-4 py-2 text-center">{holding.symbol}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-center">{holding.quantity}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-center">
                {holdingValues[holding.id]?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? '-'}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Holdings;