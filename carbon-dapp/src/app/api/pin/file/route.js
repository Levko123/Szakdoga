export async function POST(req) {
  try {
    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'PINATA_JWT missing' }), { status: 500 });
    }
    const formData = await req.formData(); // vár: file mező
    const file = formData.get('file');
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });
    }

    const pinataForm = new FormData();
    pinataForm.append('file', file, file.name || 'upload');

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: { 'Authorization': jwt },
      body: pinataForm,
    });

    if (!res.ok) {
      const t = await res.text();
      return new Response(JSON.stringify({ error: 'Pinata FILE error', details: t }), { status: res.status });
    }
    const out = await res.json(); // { IpfsHash, ... }
    return Response.json({ cid: out.IpfsHash, uri: `ipfs://${out.IpfsHash}` });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
}
