'use client'

import React, { useEffect, useState } from 'react';
import { formatPrice } from '../util/util';

type Security = {
  id: number;
  name: string;
  symbol: string;
  price: number;
};

const Securities = () => {
  const [securities, setSecurities] = useState<Security[]>([]);
  const [previousPrices, setPreviousPrices] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchSecurities = async () => {
      try {
        const response = await fetch('/api/assets');
        if (!response.ok) {
          throw new Error('Failed to fetch securities');
        }
        const updatedSecurities: Security[] = await response.json();

        setPreviousPrices((prev) => {
          const newPreviousPrices = { ...prev };
          updatedSecurities.forEach((sec) => {
            newPreviousPrices[sec.id] = prev[sec.id] || sec.price;
          });
          return newPreviousPrices;
        });

        setSecurities(updatedSecurities);
      } catch (error) {
        console.error('Error fetching securities:', error);
      }
    };

    fetchSecurities(); // Initial fetch
    const interval = setInterval(fetchSecurities, 500);

    return () => clearInterval(interval);
  }, []); // Removed dependencies

  const Arrow = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.16667 14.375L5 10M5 10L9.16667 5.625M5 10H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    );
  }

  return (

    <div className="overflow-x-auto flex-[2]">
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead className="bg-blue-100">
          <tr>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Symbol</th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody>
          {securities.map((sec) => {
            const previousPrice = previousPrices[sec.id];
            const isPriceUp = sec.price > previousPrice;
            const isPriceDown = sec.price < previousPrice;
            const formattedPrice = formatPrice(sec.price)
            return (
              <tr key={sec.id} className="hover:bg-gray-100">
                <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700">{sec.symbol}</td>
                <td className="border-b border-gray-300 px-6 py-4 text-md text-gray-700 flex items-center">
                  {isPriceUp && <span className="text-green-700 ml-2 flex items-center gap-2">
                    {formattedPrice}
                    <span className="rotate-90"><Arrow /></span>
                  </span>}
                  {isPriceDown && <span className="text-red-700 ml-2  flex items-center gap-2">
                    {formattedPrice}
                    <span className="ml-2 -rotate-90"><Arrow />
                    </span></span>}
                  {!isPriceUp && !isPriceDown && previousPrices[sec.id] !== undefined && (
                    <span className="">{formattedPrice}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  );
}

export default Securities;