<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Powercase · Catalog Finder</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f5f5f3;
      --surface: #ffffff;
      --surface2: #f0efed;
      --surface3: #e8e7e4;
      --border: rgba(0,0,0,0.09);
      --border-strong: rgba(0,0,0,0.16);
      --text: #1a1a18;
      --text2: #6b6b67;
      --text3: #9a9a96;
      --blue: #3483FA;
      --blue-bg: #e6f1fb;
      --blue-text: #185fa5;
      --green: #00a650;
      --green-bg: #e6f7ee;
      --green-text: #0a6634;
      --amber-bg: #fef3e2;
      --amber-text: #7a4800;
      --amber-border: #f5c842;
      --red-bg: #fef0f0;
      --red-text: #8b1a1a;
      --red-border: #f5c0c0;
      --gray-bg: #f0efed;
      --gray-text: #5a5a56;
      --radius: 8px;
      --radius-lg: 14px;
      --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 2rem 1rem 5rem;
    }

    .container { max-width: 780px; margin: 0 auto; }

    /* Header */
    .header { margin-bottom: 2rem; }
    .ml-badge { display: inline-flex; align-items: center; gap: 6px; background: #FFE600; color: #1a1a18; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 14px; letter-spacing: 0.01em; }
    .ml-dot { width: 8px; height: 8px; background: #3483FA; border-radius: 50%; }
    h1 { font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 6px; letter-spacing: -0.02em; }
    .subtitle { font-size: 14px; color: var(--text2); line-height: 1.5; }

    /* Search card */
    .search-card { background: var(--surface); border: 0.5px solid var(--border-strong); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow); }
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    @media (max-width: 520px) { .field-row { grid-template-columns: 1fr; } }
    .field { display: flex; flex-direction: column; gap: 5px; }
    .field label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text3); }
    .field input { font-size: 14px; padding: 10px 13px; border: 0.5px solid var(--border-strong); border-radius: var(--radius); background: var(--surface); color: var(--text); outline: none; font-family: inherit; }
    .field input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(52,131,250,0.1); }
    .field input::placeholder { color: var(--text3); }
    .field-hint { font-size: 11px; color: var(--text3); margin-top: 2px; }

    .btn-search { width: 100%; padding: 12px; background: var(--blue); color: #fff; border: none; border-radius: var(--radius); font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; letter-spacing: -0.01em; transition: background 0.15s; }
    .btn-search:hover { background: #2968c8; }
    .btn-search:disabled { opacity: 0.45; cursor: not-allowed; }

    /* Loading */
    .loading { display: none; text-align: center; padding: 3rem 0; }
    .loading.visible { display: block; }
    .spinner { width: 32px; height: 32px; border: 2.5px solid var(--border-strong); border-top-color: var(--blue); border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto 14px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { font-size: 14px; color: var(--text2); }
    .loading-sub { font-size: 12px; color: var(--text3); margin-top: 4px; }

    /* Error */
    .error-box { display: none; background: var(--red-bg); border: 0.5px solid var(--red-border); border-radius: var(--radius); padding: 12px 16px; font-size: 13px; color: var(--red-text); margin-bottom: 1rem; line-height: 1.5; }
    .error-box.visible { display: block; }

    /* Results */
    .results { display: none; }
    .results.visible { display: block; }

    .results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
    .results-title { font-size: 13px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 0.06em; }
    .results-count { font-size: 12px; color: var(--text3); background: var(--surface2); padding: 3px 10px; border-radius: 20px; }

    /* Summary bar */
    .summary-bar { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; margin-bottom: 1.5rem; }
    .summary-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 12px 14px; box-shadow: var(--shadow); }
    .summary-label { font-size: 11px; color: var(--text3); margin-bottom: 4px; font-weight: 500; }
    .summary-value { font-size: 20px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
    .summary-sub { font-size: 11px; color: var(--text3); margin-top: 2px; }

    /* Catalog card */
    .catalog-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 12px; box-shadow: var(--shadow); position: relative; overflow: hidden; }
    .catalog-card.best { border-color: #3483FA; border-width: 1.5px; }
    .catalog-card.opportunity { border-color: #00a650; border-width: 1.5px; }
    .catalog-card.inactive { border-color: var(--amber-border); border-width: 1.5px; }

    .card-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
    .card-img { width: 64px; height: 64px; border-radius: var(--radius); object-fit: contain; background: var(--surface2); border: 0.5px solid var(--border); flex-shrink: 0; }
    .card-img-placeholder { width: 64px; height: 64px; border-radius: var(--radius); background: var(--surface2); border: 0.5px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--text3); font-size: 22px; }
    .card-main { flex: 1; min-width: 0; }
    .card-badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; }
    .badge { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px; white-space: nowrap; }
    .badge-best      { background: var(--blue-bg); color: var(--blue-text); }
    .badge-active    { background: var(--green-bg); color: var(--green-text); }
    .badge-inactive  { background: var(--amber-bg); color: var(--amber-text); }
    .badge-solo      { background: #f0e6fb; color: #5a1f8a; }
    .badge-nocomp    { background: var(--green-bg); color: var(--green-text); }
    .badge-match     { background: #e6f7ee; color: #0a5c2e; }
    .badge-warning   { background: var(--amber-bg); color: var(--amber-text); }

    .card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; margin-bottom: 4px; }
    .card-id { font-size: 11px; color: var(--text3); font-family: monospace; }

    .card-stats { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; margin-bottom: 12px; }
    @media (max-width: 520px) { .card-stats { grid-template-columns: repeat(2, 1fr); } }
    .stat { background: var(--surface2); border-radius: 6px; padding: 8px 10px; }
    .stat-label { font-size: 10px; color: var(--text3); margin-bottom: 2px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; }
    .stat-value { font-size: 15px; font-weight: 700; color: var(--text); }
    .stat-value.green { color: var(--green); }
    .stat-value.blue  { color: var(--blue); }
    .stat-value.amber { color: #c47a00; }

    .card-attrs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .attr-pill { font-size: 11px; padding: 3px 9px; border-radius: 20px; border: 0.5px solid var(--border-strong); color: var(--text2); background: var(--surface); }
    .attr-pill.match { background: var(--green-bg); color: var(--green-text); border-color: #9fe0bb; }
    .attr-pill.mismatch { background: var(--red-bg); color: var(--red-text); border-color: var(--red-border); }

    .card-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
    .card-url { font-size: 12px; color: var(--blue); text-decoration: none; word-break: break-all; }
    .card-url:hover { text-decoration: underline; }
    .btn-copy { font-size: 12px; padding: 6px 14px; border: 0.5px solid var(--border-strong); background: var(--surface2); color: var(--text2); border-radius: var(--radius); cursor: pointer; font-family: inherit; white-space: nowrap; flex-shrink: 0; }
    .btn-copy:hover { color: var(--text); border-color: #888; }

    .match-score { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
    .match-bar-bg { flex: 1; height: 5px; background: var(--surface3); border-radius: 4px; overflow: hidden; }
    .match-bar-fill { height: 5px; border-radius: 4px; transition: width 0.6s ease; }
    .match-label { font-size: 11px; font-weight: 600; min-width: 38px; text-align: right; }

    .no-results { text-align: center; padding: 3rem 1rem; color: var(--text2); }
    .no-results p { font-size: 14px; margin-top: 8px; }

    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3); margin: 1.5rem 0 0.75rem; padding-bottom: 6px; border-bottom: 0.5px solid var(--border); }

    .disclaimer { font-size: 11px; color: var(--text3); background: var(--surface2); border-radius: var(--radius); padding: 10px 14px; margin-top: 1.5rem; line-height: 1.6; }
  </style>
</head>
<body>
<div class="container">

  <div class="header">
    <div class="ml-badge"><div class="ml-dot"></div> MercadoLibre Catalog Finder</div>
    <h1>Buscador de catálogos</h1>
    <p class="subtitle">Encontrá el catálogo más conveniente para competir — activos, sin competidores, e inactivos con historial de ventas.</p>
  </div>

  <div class="search-card">
    <div class="field-row">
      <div class="field">
        <label>Nombre del producto</label>
        <input type="text" id="productName" placeholder="Ej: Samsung Galaxy S23 128GB Negro" />
      </div>
      <div class="field">
        <label>EAN / Código de barras <span style="font-weight:400;text-transform:none;letter-spacing:0">(opcional)</span></label>
        <input type="text" id="productEAN" placeholder="Ej: 8806094759037" />
        <span class="field-hint">Si lo tenés, mejora mucho la precisión</span>
      </div>
    </div>
    <button class="btn-search" id="searchBtn" onclick="search()">Buscar catálogos</button>
  </div>

  <div class="error-box" id="errorBox"></div>

  <div class="loading" id="loading">
    <div class="spinner"></div>
    <div class="loading-text" id="loadingText">Buscando en MercadoLibre...</div>
    <div class="loading-sub" id="loadingSub">Esto puede tardar unos segundos</div>
  </div>

  <div class="results" id="results"></div>

</div>

<script>
  
  const ML_SITE = 'MLA';
  const VERCEL  = 'https://catalog-finder.vercel.app';

  function setLoading(on, text, sub) {
    document.getElementById('loading').classList.toggle('visible', on);
    document.getElementById('searchBtn').disabled = on;
    if (text) document.getElementById('loadingText').textContent = text;
    if (sub)  document.getElementById('loadingSub').textContent  = sub;
  }

  function showError(msg) {
    const e = document.getElementById('errorBox');
    e.innerHTML = msg; e.classList.add('visible');
  }
  function hideError() { document.getElementById('errorBox').classList.remove('visible'); }

  document.getElementById('productName').addEventListener('keydown', e => { if (e.key === 'Enter') search(); });
  document.getElementById('productEAN').addEventListener('keydown',  e => { if (e.key === 'Enter') search(); });

  // ── ML API helpers ──────────────────────────────────────────────────────────

  // -- ML API -- proxy por Vercel para evitar 403
  async function mlGet(url) {
    const res = await fetch(VERCEL + '/api/ml', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (!res.ok) throw new Error('ML proxy error ' + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  }

  // Buscar catalog products directamente por nombre/EAN
  async function searchItems(query, ean) {
    const catalogIds = new Set();

    setLoading(true, 'Buscando catálogos en ML...', 'Consultando el portal de catálogos');

    // Generar variantes de búsqueda: nombre completo + versión corta (primeras 2-3 palabras)
    const words = query.trim().split(/\s+/);
    const shortQuery = words.slice(0, 3).join(' ');
    const queries = [...new Set([query.trim(), shortQuery])];

    const allSearches = [];

    for (const q of queries) {
      // Estrategia 1: /products/search (portal de vendedores ML)
      allSearches.push(mlGet(`https://api.mercadolibre.com/products/search?site_id=${ML_SITE}&q=${encodeURIComponent(q)}&limit=20`));
      allSearches.push(mlGet(`https://api.mercadolibre.com/products/search?site_id=${ML_SITE}&q=${encodeURIComponent(q)}&limit=20&offset=20`));
      // Estrategia 2: búsqueda normal
      allSearches.push(mlGet(`https://api.mercadolibre.com/sites/${ML_SITE}/search?q=${encodeURIComponent(q)}&limit=50`));
    }

    // Estrategia 3: EAN si disponible
    if (ean && ean.trim()) {
      allSearches.push(mlGet(`https://api.mercadolibre.com/products/search?site_id=${ML_SITE}&q=${encodeURIComponent(ean.trim())}&limit=10`));
      allSearches.push(mlGet(`https://api.mercadolibre.com/sites/${ML_SITE}/search?q=${encodeURIComponent(ean.trim())}&limit=20`));
    }

    const allResults = await Promise.allSettled(allSearches);
    allResults.forEach(r => {
      if (r.status === 'fulfilled' && r.value) {
        // /products/search devuelve results o products
        const products = r.value.results || r.value.products || [];
        products.forEach(p => { if (p.id) catalogIds.add(p.id); });
        // /sites/search devuelve results con catalog_product_id
        if (r.value.results) {
          r.value.results.forEach(item => {
            if (item.catalog_product_id) catalogIds.add(item.catalog_product_id);
          });
        }
      }
    });

    console.log('Catalog IDs encontrados:', [...catalogIds]);
    if (catalogIds.size === 0) return [];

    setLoading(true, `${catalogIds.size} catálogos encontrados — obteniendo detalles...`, 'Consultando stock, ventas y competidores');

    // 5. Obtener detalles de cada catalog_product
    const detailPromises = [...catalogIds].slice(0, 20).map(async id => {
      try {
        // Obtener info del catalog product
        const [cpDetail, listings] = await Promise.allSettled([
          mlGet(`https://api.mercadolibre.com/catalog_products/${id}`),
          mlGet(`https://api.mercadolibre.com/sites/${ML_SITE}/search?catalog_product_id=${id}&limit=20`)
        ]);

        const cp = cpDetail.status === 'fulfilled' ? cpDetail.value : null;
        const listingResults = listings.status === 'fulfilled' ? (listings.value.results || []) : [];

        // Construir objeto enriquecido
        // Ventas: priorizar sold_quantity del catalog_product, luego sumar listings
        const cpSold = cp?.sold_quantity || cp?.health?.sold_quantity || 0;
        const listingsSold = listingResults.reduce((s, l) => s + (l.sold_quantity || 0), 0);
        const totalSold = Math.max(cpSold, listingsSold);

        const activeSellers = listingResults.filter(l => l.available_quantity > 0).length;
        const minPrice = listingResults.length > 0 ? Math.min(...listingResults.filter(l => l.price > 0).map(l => l.price || 9999999)) : 0;
        const hasStock = listingResults.some(l => l.available_quantity > 0);

        // Permalink: link al catálogo de ML
        const permalink = `https://www.mercadolibre.com.ar/p/${id}`;
        const thumbnail = cp?.pictures?.[0]?.url || listingResults[0]?.thumbnail || null;

        // Enriquecer atributos con datos del cp
        const attributes = cp?.attributes || cp?.main_features?.map(f => ({id: f.id, value_name: f.values?.[0]?.name})) || [];

        console.log(`Catálogo ${id}:`, {
          cpSold, listingsSold, totalSold,
          activeSellers, hasStock,
          cpName: cp?.name,
          cpKeys: cp ? Object.keys(cp) : []
        });

        return {
          catalog_product_id: id,
          id,
          title: cp?.name || cp?.short_name || listingResults[0]?.title || id,
          attributes,
          sold_quantity: totalSold,
          seller_count: activeSellers,
          available_quantity: hasStock ? listingResults.reduce((s,l) => s + (l.available_quantity||0), 0) : 0,
          price: minPrice === 9999999 ? 0 : minPrice,
          permalink,
          thumbnail,
          status: hasStock ? 'active' : 'paused',
          _listings: listingResults,
          _cp: cp
        };
      } catch(e) {
        console.warn('Detail fetch failed for', id, e);
        return null;
      }
    });

    const details = (await Promise.all(detailPromises)).filter(Boolean);
    return details;
  }

  // Stub — ya no se usa por separado, está integrado en searchItems
  async function getCatalogProduct(catalogId) { return null; }
  async function getCatalogListings(catalogId) { return []; }

  // ── Análisis de exactitud con IA ────────────────────────────────────────────

  async function analyzeMatch(productQuery, ean, catalogs) {
    const catalogSummaries = catalogs.slice(0, 15).map(c => ({
      id: c.catalog_product_id || c.id,
      title: c.title,
      brand: c.attributes?.find(a => a.id === 'BRAND')?.value_name || '',
      model: c.attributes?.find(a => a.id === 'MODEL')?.value_name || '',
      color: c.attributes?.find(a => a.id === 'COLOR')?.value_name || '',
      storage: c.attributes?.find(a => a.id === 'INTERNAL_MEMORY')?.value_name || c.attributes?.find(a => a.id === 'STORAGE_CAPACITY')?.value_name || '',
      sold: c.sold_quantity || 0,
      permalink: c.permalink || ''
    }));

    const prompt = `Sos un experto en catálogos de MercadoLibre Argentina con conocimiento profundo de productos de electrónica, tecnología y electrodomésticos.

El usuario quiere saber qué catálogo de MercadoLibre es el más conveniente para publicar su producto y competir.

PRODUCTO QUE TIENE EL USUARIO: "${productQuery}"
EAN: "${ean || 'no disponible'}"

CATÁLOGOS ENCONTRADOS EN ML:
${JSON.stringify(catalogSummaries, null, 2)}

TU TAREA:
Analizá si cada catálogo corresponde AL MISMO PRODUCTO que el usuario tiene. No es un chequeo de atributos fijo — tenés que entender de qué producto se trata y determinar qué características son CRÍTICAS para ese tipo de producto específico.

Por ejemplo:
- Si es un celular: marca + modelo + almacenamiento + color son críticos. Un Galaxy S23 de 128GB no es lo mismo que uno de 256GB.
- Si es una notebook: marca + modelo + procesador + RAM + almacenamiento son críticos.
- Si es una cafetera: marca + modelo + tipo (cápsulas, filtro, etc.) son críticos. El color puede ser secundario.
- Si es un cable o accesorio: tipo + compatibilidad + longitud son críticos.
- Si es un electrodoméstico: marca + modelo + capacidad/potencia son críticos.
- Si es un juego o software: título + plataforma + región son críticos.
- Y así para cualquier categoría — vos determinás qué importa para ESE producto.

CRITERIOS DE EXACTITUD:
- 95-100%: Es exactamente el mismo producto. Todos los atributos críticos coinciden perfectamente.
- 80-94%: Muy probable que sea el mismo. Algún atributo secundario puede diferir levemente.
- 70-79%: Posible match pero hay alguna diferencia en un atributo importante. Usarlo con precaución.
- 0-69%: No es el mismo producto. NO incluirlo.

IMPORTANTE:
- Si el usuario no especificó un atributo (ej: no puso color), no lo uses como criterio de descarte.
- Si el título del catálogo es ambiguo y podría ser el mismo producto, dale el beneficio de la duda y ponelo en 75-80%.
- Sé estricto cuando hay diferencias claras (distinto modelo, distinto almacenamiento, distinta marca).
- El "mejor_id" debe ser el catálogo con mayor combinación de exactitud alta + más ventas.

Respondé SOLO con este JSON (sin backticks, sin texto extra):
{
  "matches": [
    {
      "id": "catalog_id",
      "exactitud": 95,
      "razon": "explicación concisa de por qué coincide o difiere, mencionando los atributos clave para este tipo de producto",
      "atributos_ok": ["atributo1", "atributo2"],
      "atributos_mal": ["atributo que no coincide"]
    }
  ],
  "mejor_id": "id del catálogo recomendado",
  "resumen": "1-2 oraciones explicando qué encontraste y cuál es la mejor opción para el usuario"
}`;

    const res = await fetch('https://catalog-finder.vercel.app/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    const raw = data.content.map(b => b.text || '').join('');
    return JSON.parse(raw.replace(/```json|```/g, '').trim());
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  function renderResults(items, analysis, catalogDetails) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (!items.length) {
      container.innerHTML = `<div class="no-results"><div style="font-size:32px">🔍</div><p>No se encontraron catálogos para este producto en MercadoLibre Argentina.</p></div>`;
      container.classList.add('visible');
      return;
    }

    // Enriquecer items con análisis de IA
    const matchMap = {};
    (analysis.matches || []).forEach(m => { matchMap[m.id] = m; });

    // Filtrar solo los que matchearon bien (exactitud >= 70)
    const goodMatches = items.filter(item => {
      const id = item.catalog_product_id || item.id;
      const m = matchMap[id];
      return m && m.exactitud >= 70;
    }).sort((a, b) => {
      const ma = matchMap[a.catalog_product_id || a.id];
      const mb = matchMap[b.catalog_product_id || b.id];
      const scoreA = (ma?.exactitud || 0) * 0.4 + Math.min((a.sold_quantity || 0) / 10, 60);
      const scoreB = (mb?.exactitud || 0) * 0.4 + Math.min((b.sold_quantity || 0) / 10, 60);
      return scoreB - scoreA;
    });

    // Separar por tipo
    const withCompetitors = goodMatches.filter(i => (i.available_quantity || 0) > 0 && (i.seller_count || 1) > 1);
    const soloActive      = goodMatches.filter(i => (i.available_quantity || 0) > 0 && (i.seller_count || 1) <= 1);
    const inactive        = goodMatches.filter(i => (i.available_quantity || 0) === 0 || i.status === 'paused' || i.status === 'closed');

    // Summary
    const totalSold = goodMatches.reduce((s, i) => s + (i.sold_quantity || 0), 0);
    const summaryHTML = `
      <div class="summary-bar">
        <div class="summary-card">
          <div class="summary-label">Catálogos exactos</div>
          <div class="summary-value">${goodMatches.length}</div>
          <div class="summary-sub">de ${items.length} analizados</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Sin competidores</div>
          <div class="summary-value">${soloActive.length + inactive.length}</div>
          <div class="summary-sub">oportunidades libres</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Ventas totales</div>
          <div class="summary-value">${totalSold.toLocaleString('es-AR')}</div>
          <div class="summary-sub">en catálogos exactos</div>
        </div>
      </div>
      ${analysis.resumen ? `<div style="font-size:13px;color:var(--text2);background:var(--surface);border:0.5px solid var(--border);border-radius:var(--radius);padding:10px 14px;margin-bottom:1.25rem;line-height:1.5;">${analysis.resumen}</div>` : ''}
    `;

    let html = summaryHTML;

    function renderCard(item, isBest) {
      const id = item.catalog_product_id || item.id;
      const match = matchMap[id] || { exactitud: 0, atributos_ok: [], atributos_mal: [], razon: '' };
      const sold = item.sold_quantity || 0;
      const sellers = item.seller_count || (item.available_quantity > 0 ? 1 : 0);
      const isActive = item.available_quantity > 0 && item.status !== 'closed' && item.status !== 'paused';
      const isInactive = !isActive;
      const isSolo = isActive && sellers <= 1;
      const detail = catalogDetails[id];
      const img = item.thumbnail || detail?.pictures?.[0]?.url || null;
      const permalink = item.permalink || '';

      // Badges
      const badges = [];
      if (isBest) badges.push(`<span class="badge badge-best">⭐ Mejor opción</span>`);
      if (isInactive) badges.push(`<span class="badge badge-inactive">Inactivo — sin competidores</span>`);
      else if (isSolo) badges.push(`<span class="badge badge-nocomp">Sin competidores</span>`);
      else badges.push(`<span class="badge badge-active">Activo</span>`);
      if (match.exactitud >= 95) badges.push(`<span class="badge badge-match">Coincidencia exacta</span>`);

      // Atributos
      const allAttrs = [...(match.atributos_ok || []).map(a => `<span class="attr-pill match">${a}</span>`),
                        ...(match.atributos_mal || []).map(a => `<span class="attr-pill mismatch">✗ ${a}</span>`)];

      // Match bar color
      const matchColor = match.exactitud >= 90 ? '#00a650' : match.exactitud >= 70 ? '#f5c842' : '#e84e4e';

      const cardClass = isBest ? 'catalog-card best' : isInactive ? 'catalog-card inactive' : isSolo ? 'catalog-card opportunity' : 'catalog-card';

      return `
        <div class="${cardClass}">
          <div class="card-top">
            ${img ? `<img class="card-img" src="${img}" alt="" onerror="this.style.display='none'" />` : `<div class="card-img-placeholder">📦</div>`}
            <div class="card-main">
              <div class="card-badges">${badges.join('')}</div>
              <div class="card-title">${item.title || '—'}</div>
              <div class="card-id">ID: ${id}</div>
            </div>
          </div>

          <div class="match-score">
            <div class="match-bar-bg"><div class="match-bar-fill" style="width:${match.exactitud}%;background:${matchColor}"></div></div>
            <span class="match-label" style="color:${matchColor}">${match.exactitud}%</span>
          </div>

          <div class="card-stats">
            <div class="stat">
              <div class="stat-label">Ventas</div>
              <div class="stat-value green">+${sold.toLocaleString('es-AR')}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Competidores</div>
              <div class="stat-value ${sellers === 0 ? 'green' : sellers === 1 ? 'amber' : 'blue'}">${isInactive ? '0 (inactivo)' : sellers}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Stock activo</div>
              <div class="stat-value">${isInactive ? '—' : (item.available_quantity || 0).toLocaleString('es-AR')}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Precio desde</div>
              <div class="stat-value">${item.price ? '$' + Math.round(item.price).toLocaleString('es-AR') : '—'}</div>
            </div>
          </div>

          ${allAttrs.length ? `<div class="card-attrs">${allAttrs.join('')}</div>` : ''}

          ${match.razon ? `<div style="font-size:12px;color:var(--text2);margin-bottom:10px;line-height:1.4;">${match.razon}</div>` : ''}

          <div class="card-footer">
            ${permalink ? `<a class="card-url" href="${permalink}" target="_blank" rel="noopener">${permalink.replace('https://','')}</a>` : '<span></span>'}
            ${permalink ? `<button class="btn-copy" onclick="copyText('${permalink}', this)">Copiar link</button>` : ''}
          </div>
        </div>
      `;
    }

    const bestId = analysis.mejor_id;

    if (withCompetitors.length) {
      html += `<div class="section-title">Catálogos activos con competidores</div>`;
      withCompetitors.forEach(item => {
        const id = item.catalog_product_id || item.id;
        html += renderCard(item, id === bestId);
      });
    }

    if (soloActive.length) {
      html += `<div class="section-title">Activos sin competidores — oportunidad</div>`;
      soloActive.forEach(item => {
        const id = item.catalog_product_id || item.id;
        html += renderCard(item, id === bestId);
      });
    }

    if (inactive.length) {
      html += `<div class="section-title">Catálogos inactivos — sin competencia</div>`;
      inactive.forEach(item => {
        const id = item.catalog_product_id || item.id;
        html += renderCard(item, id === bestId);
      });
    }

    if (!goodMatches.length) {
      html += `<div class="no-results"><div style="font-size:32px">⚠️</div><p>Se encontraron catálogos pero ninguno coincide exactamente con tu producto. Probá con un nombre más específico o agregá el EAN.</p></div>`;
    }

    html += `<div class="disclaimer">Los datos de ventas y stock son en tiempo real desde la API pública de MercadoLibre. La coincidencia de producto es analizada por IA — verificá siempre el catálogo antes de unirte.</div>`;

    container.innerHTML = html;
    container.classList.add('visible');
  }

  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ Copiado';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  }

  // ── Main search ──────────────────────────────────────────────────────────────

  async function search() {
    const name = document.getElementById('productName').value.trim();
    const ean  = document.getElementById('productEAN').value.trim();
    if (!name) return;

    hideError();
    document.getElementById('results').classList.remove('visible');
    document.getElementById('results').innerHTML = '';
    setLoading(true, 'Conectando con MercadoLibre...', 'Buscando catálogos del producto');

    try {
      // 1. Buscar items
      const items = await searchItems(name, ean);

      if (!items.length) {
        setLoading(false);
        document.getElementById('results').innerHTML = `<div class="no-results"><div style="font-size:32px">🔍</div><p>No se encontraron catálogos para "<strong>${name}</strong>" en MercadoLibre Argentina.</p></div>`;
        document.getElementById('results').classList.add('visible');
        return;
      }

      setLoading(true, `${items.length} catálogos encontrados — analizando con IA...`, 'Verificando que sea exactamente tu producto');

      // 2. Los detalles ya vienen enriquecidos desde searchItems
      const catalogDetails = {};
      items.forEach(item => {
        if (item._cp) catalogDetails[item.id] = item._cp;
      });

      // 3. Analizar coincidencias con IA
      setLoading(true, 'Analizando exactitud del producto...', 'La IA compara marca, modelo y especificaciones clave');
      const analysis = await analyzeMatch(name, ean, items);

      setLoading(false);
      renderResults(items, analysis, catalogDetails);

    } catch(err) {
      setLoading(false);
      console.error(err);
      showError(`<strong>Error al buscar catálogos.</strong><br>Detalle: ${err.message}<br><br>Verificá tu conexión e intentá de nuevo.`);
    }
  }
</script>
</body>
</html>
