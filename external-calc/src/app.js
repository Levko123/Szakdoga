// config.js-ből: window.CALC_CONFIG = { DAPP_ORIGIN: 'http://localhost:3000' }
const FALLBACK_DAPP = 'http://localhost:3000';
const cfg = (window.CALC_CONFIG && window.CALC_CONFIG.DAPP_ORIGIN) || FALLBACK_DAPP;

// query param felülbírálás (pl. ?dapp=https://myapp.com)
const urlParams = new URLSearchParams(location.search);
const dappOverride = urlParams.get('dapp');
const DAPP_ORIGIN = dappOverride || cfg;

const areaEl = document.getElementById('area');
const rateEl = document.getElementById('rate');
const quotaEl = document.getElementById('quota');
const goEl   = document.getElementById('go');
const copyEl = document.getElementById('copy');

function computeQuota(area, rate){
  if (!Number.isFinite(area) || area <= 0) return 0;
  if (!Number.isFinite(rate) || rate <= 0) return 0;
  return Math.floor(area * rate);
}

function update(){
  const area = Number(areaEl.value);
  const rate = Number(rateEl.value);
  const quota = computeQuota(area, rate);
  quotaEl.textContent = String(quota);

  if (quota > 0){
    const u = new URL('/mint', DAPP_ORIGIN);
    u.searchParams.set('quota', String(quota));
    u.searchParams.set('area', String(area));
    u.searchParams.set('rate', String(rate));
    u.searchParams.set('source', 'external');
    goEl.href = u.toString();
    goEl.setAttribute('aria-disabled', 'false');
    copyEl.disabled = false;
    copyEl.onclick = async () => {
      try { await navigator.clipboard.writeText(u.toString()); copyEl.textContent = 'Kimásolva ✓'; setTimeout(()=> copyEl.textContent='Link másolása', 1200) } catch {}
    };
  } else {
    goEl.href = '#';
    goEl.setAttribute('aria-disabled', 'true');
    copyEl.disabled = true;
  }
}

areaEl.addEventListener('input', update);
rateEl.addEventListener('input', update);

update(); // kezdeti állapot
