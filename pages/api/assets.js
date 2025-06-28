import { assets } from "./seed";

function updatePrices() {
  const randomIndex = Math.floor(Math.random() * assets.length);
  assets[randomIndex] = {
    ...assets[randomIndex],
    price: parseFloat((assets[randomIndex].price * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2)),
  };
}

setInterval(updatePrices, 1000);

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(assets);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}