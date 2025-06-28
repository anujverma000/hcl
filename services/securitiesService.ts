export async function fetchSecurities() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/assets`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  return response.json();
}
