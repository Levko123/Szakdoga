export async function pinJsonToIPFS(json) {
  const r = await fetch('/api/pin/json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: json }),
  });
  if (!r.ok) throw new Error(await r.text());
  const { uri } = await r.json(); // ipfs://CID
  return uri;
}

export async function pinFileToIPFS(file) {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch('/api/pin/file', { method: 'POST', body: fd });
  if (!r.ok) throw new Error(await r.text());
  const { uri } = await r.json();
  return uri;
}
