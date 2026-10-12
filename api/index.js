export const maxDuration = 60; // 核心改动：允许 Vercel 等待最长 60 秒

export default async function handler(req, res) {
  const path = req.query.path;
  const key = req.query.key;
  
  if (!path || !key) {
    return res.status(400).send("Missing path or key");
  }

  const target = `https://generativelanguage.googleapis.com${path}?key=${key}`;
  
  const options = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  if (req.method === 'POST') {
    options.body = JSON.stringify(req.body);
  }
  
  try {
    const response = await fetch(target, options);
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).send("Proxy Error: " + error.toString());
  }
}
