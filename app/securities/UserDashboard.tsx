
import React, { useEffect, useState } from 'react'
import { formatPrice } from '../util/util'

const UserDashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(10000)
  useEffect(() => {
    setPortfolioValue(10000) 
    const interval = setInterval(() => {
      setPortfolioValue(prevValue => prevValue + (Math.random() * 100 - 50)) 
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (  
    <div className='flex flex-col min-h-screen bg-gray-50 w-full'>
      <section className="bg-white rounded-lg p-8 w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Portfolio Value</h2>
        <div className="text-4xl font-semibold text-green-600">
          {formatPrice(portfolioValue)}
        </div>
        <p className="text-gray-500 mt-2">Total value of your portfolio</p>
      </section>
    </div>
  )
}

export default UserDashboard