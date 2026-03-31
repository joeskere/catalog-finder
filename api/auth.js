export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'Falta code' });

  try {
    const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.ML_APP_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        code: code,
        redirect_uri: 'https://catalog-finder.vercel.app'
      })
    });

    const data = await tokenRes.json();

    if (data.access_token) {
      return res.status(200).send(`
        <h2>✅ Token generado exitosamente</h2>
        <p><strong>Access Token:</strong></p>
        <textarea style="width:100%;height:100px">${data.access_token}</textarea>
        <p><strong>Refresh Token:</strong></p>
        <textarea style="width:100%;height:60px">${data.refresh_token || 'no disponible'}</textarea>
        <p>Expira en: ${data.expires_in} segundos (${Math.round(data.expires_in/3600)} horas)</p>
        <p>Copiá el Access Token y guardalo en Vercel como variable de entorno <strong>ML_ACCESS_TOKEN</strong></p>
      `);
    } else {
      return res.status(400).json(data);
    }
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
