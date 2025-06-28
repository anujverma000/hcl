import { holdings } from "./seed";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      res.status(200).json(holdings);
    } catch (error) {
      console.error('Error fetching holdings:', error);
      res.status(500).json({ error: 'Failed to fetch holdings' });
    }
  } else if (req.method === 'POST') {
    try {
      const { id, name, symbol, price } = req.body;
      const updatedHolding = dummyHoldings.find((holding) => holding.id === id);
      if (updatedHolding) {
        updatedHolding.name = name;
        updatedHolding.symbol = symbol;
        updatedHolding.price = price;
      } else {
        dummyHoldings.push({ id, name, symbol, price });
      }
      res.status(200).json(updatedHolding || { id, name, symbol, price });
    } catch (error) {
      console.error('Error updating holding:', error);
      res.status(500).json({ error: 'Failed to update holding' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
