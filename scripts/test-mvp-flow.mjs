const base = process.env.MVP_TEST_BASE_URL || 'http://localhost:3100';
const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=';

function fail(message) {
  throw new Error(message);
}

async function assertStatus(pathOrUrl, expectedStatus, label) {
  const url = pathOrUrl.startsWith('http') ? pathOrUrl : base + pathOrUrl;
  const response = await fetch(url);
  console.log(label, response.status);
  if (response.status !== expectedStatus) {
    fail(`${label} expected ${expectedStatus}, got ${response.status}`);
  }
  return response;
}

const gen = await fetch(base + '/api/generate', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ toolType: 'passport', userImage: img, website: '' }),
});
console.log('generate', gen.status);
if (!gen.ok) fail(await gen.text());
const data = await gen.json();
if (!data.jobId || !data.previewUrl) fail('missing job data');
console.log('job', data.jobId);

await assertStatus(data.previewUrl, 200, 'preview');
await assertStatus(`/api/image/${data.jobId}?type=hd`, 404, 'hd before payment');

const checkout = await fetch(base + '/api/create-checkout-session', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ jobId: data.jobId }),
});
console.log('checkout', checkout.status);
if (!checkout.ok) fail(await checkout.text());
const checkoutData = await checkout.json();
if (!checkoutData.url?.includes('/success?session_id=mock_')) {
  fail('mock checkout url missing');
}
console.log('checkout url ok');

await assertStatus(checkoutData.url, 200, 'success page');
await assertStatus(`/api/image/${data.jobId}?type=hd`, 200, 'hd after payment');

for (const path of ['/privacy', '/terms', '/contact']) {
  await assertStatus(path, 200, path);
}

console.log('MVP flow test passed');
