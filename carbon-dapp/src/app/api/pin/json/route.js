export async function POST(req) {
  try {
    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'PINATA_JWT missing' }), { status: 500 });
    }
    const body = await req.json(); // { data: {...} }
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body.data || body),
    });

    if (!res.ok) {
      const t = await res.text();
      return new Response(JSON.stringify({ error: 'Pinata JSON error', details: t }), { status: res.status });
    }
    const out = await res.json(); // { IpfsHash, ... }
    return Response.json({ cid: out.IpfsHash, uri: `ipfs://${out.IpfsHash}` });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
}
