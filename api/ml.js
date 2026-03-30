export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Falta url' });

  // Solo permitir llamadas a ML
  if (!url.startsWith('https://api.mercadolibre.com/')) {
    return res.status(403).json({ error: 'URL no permitida' });
  }

  const sep = url.includes('?') ? '&' : '?';
  const fullUrl = url + sep + 'app_id=' + process.env.ML_APP_ID;

  const response = await fetch(fullUrl, {
    headers: { 'Accept': 'application/json' }
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
