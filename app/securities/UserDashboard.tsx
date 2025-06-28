
import React, { useEffect, useState } from 'react'
import { formatPrice } from '../util/util'

const UserDashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0)
  
  type Asset = { id: number; price: number }
  type Holding = { id: number; quantity: number }

  const [assets, setAssets] = useState<Asset[]>([])
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [percentangeChange, setPercentageChange] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const assetsRes = await fetch('/api/assets')
      const holdingsRes = await fetch('/api/holdings')
      const assetsData = await assetsRes.json()
      const holdingsData = await holdingsRes.json()
      setAssets(assetsData)
      setHoldings(holdingsData)
    }
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (assets.length && holdings.length) {
      const value = holdings.reduce((sum, holding) => {
        const asset = assets.find(a => a.id === holding.id)
        return sum + (asset ? asset.price * holding.quantity : 0)
      }, 0)
      setPortfolioValue(value)
      setPercentageChange((value - 10000) / 10000 * 100)
    }
  }, [assets, holdings])

  useEffect(() => {
    setPortfolioValue(10000) 
    const interval = setInterval(() => {
      setPortfolioValue(prevValue => prevValue + (Math.random() * 100 - 50)) 
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (  
    <div className='flex flex-col bg-gray-50 w-full'>
      <section className="bg-white rounded-lg p-8 w-full mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Portfolio Value</h2>
        <div className="text-4xl font-semibold text-gray-500 flex items-baseline">
          <span>{portfolioValue? formatPrice(portfolioValue): '...'}</span>
          <span className={`ml-2 text-sm ${percentangeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
             <span className="ml-1">
              {percentangeChange >= 0 ? '+' : '-'}
            </span>
            {percentangeChange.toFixed(2)}
            <span className="ml-1">
              %
            </span>
          </span>
        </div>
        <p className="text-gray-500 mt-2">Total value of your portfolio</p>
      </section>
    </div>
  )
}

export default UserDashboard