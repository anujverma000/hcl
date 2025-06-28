import React, { useEffect, useState } from 'react';

type Holding = {
  id: number;
  name: string;
  symbol: string;
  price: number;
};

const Holding = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await fetch('/api/assets');
        if (!response.ok) {
          throw new Error('Failed to fetch holdings');
        }
        const data: Holding[] = await response.json();
        setHoldings(data);
      } catch (error) {
        console.error('Error fetching holdings:', error);
      }
    };

    fetchHoldings();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Holdings</h1>
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Symbol</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{holding.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{holding.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{holding.symbol}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{holding.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Holding;