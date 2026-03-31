export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'Falta url' });
  if (!url.startsWith('https://api.mercadolibre.com/')) {
    return res.status(403).json({ error: 'URL no permitida' });
  }

  try {
    // Obtener Access Token via OAuth client_credentials
    const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.ML_APP_ID,
        client_secret: process.env.ML_CLIENT_SECRET
      })
    });

    let authHeader = '';
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      authHeader = `Bearer ${tokenData.access_token}`;
    }

    const response = await fetch(url, {
      headers: {
        ...(authHeader ? { 'Authorization': authHeader } : {}),
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
