let cachedToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.ML_APP_ID,
      client_secret: process.env.ML_CLIENT_SECRET
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OAuth error ${res.status}: ${err}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'Falta url' });

  if (!url.startsWith('https://api.mercadolibre.com/')) {
    return res.status(403).json({ error: 'URL no permitida' });
  }

  try {
    const token = await getAccessToken();

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
