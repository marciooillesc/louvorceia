function norm(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function keyOf(song){
  return norm(`${song.artist} - ${song.title}`);
}

function letrasSearchUrl(song){
  const q = encodeURIComponent(`${song.artist} ${song.title}`);
  return `https://www.letras.mus.br/?q=${q}`;
}

function cifraUrl(song){
  const q = encodeURIComponent(`${song.title} ${song.artist}`);
  return `https://www.cifraclub.com.br/?q=${q}`;
}

function ytSearchUrl(song){
  const q = encodeURIComponent(`${song.title} ${song.artist}`);
  return `https://www.youtube.com/results?search_query=${q}`;
}

function youtubeEmbedUrl(youtubeUrl){
  if(!youtubeUrl) return null;
  try{
    const u = new URL(youtubeUrl);
    let id = "";
    if (u.hostname.includes("youtu.be")) id = u.pathname.replace("/","");
    else id = u.searchParams.get("v") || "";
    if(!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }catch{ return null; }
}

function catLabel(cat){ return cat === "adoracao" ? "Adoração" : "Celebração"; }

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// ===== SUA LISTA (cole a completa aqui) =====
const SONGS = [
  { id:"cele-002", cat:"celebracao", title:"Cordeiro santo", artist:"Filhos do Homem" },
  { id:"cele-005", cat:"celebracao", title:"Vou voar", artist:"Juliano Son" },
  { id:"cele-011", cat:"celebracao", title:"Deus não está morto", artist:"Fernandinho" },
  { id:"ador-001", cat:"adoracao", title:"Isaías 6", artist:"Morada" },
  // ... cole o resto
];

// ===== LocalStorage: YouTube + Letras locais =====
const YT_KEY = "louvores_youtube_links_v1";
const LY_KEY = "louvores_local_lyrics_v1";

function loadMap(key){
  try { return JSON.parse(localStorage.getItem(key) || "{}"); }
  catch { return {}; }
}
function saveMap(key, map){
  localStorage.setItem(key, JSON.stringify(map));
}

let ytMap = loadMap(YT_KEY);
let localLyrics = loadMap(LY_KEY);

// ===== DOM =====
const listEl   = document.getElementById("list");
const countEl  = document.getElementById("count");
const qEl      = document.getElementById("q");
const catEl    = document.getElementById("cat");
const sortEl   = document.getElementById("sort");

const songTitleEl  = document.getElementById("songTitle");
const songArtistEl = document.getElementById("songArtist");
const songCatEl    = document.getElementById("songCat");

const btnLyricsSource = document.getElementById("btnLyricsSource");
const btnCifra        = document.getElementById("btnCifra");
const btnYT           = document.getElementById("btnYT");

// letra embutida
const lyricsStatus = document.getElementById("lyricsStatus");
const lyricsEmpty  = document.getElementById("lyricsEmpty");
const lyricsText   = document.getElementById("lyricsText");
const lyricsInput  = document.getElementById("lyricsInput");
const btnSaveLyrics  = document.getElementById("btnSaveLyrics");
const btnClearLyrics = document.getElementById("btnClearLyrics");
const btnExportLyrics= document.getElementById("btnExportLyrics");

// YouTube
const ytInput    = document.getElementById("ytInput");
const btnSaveYT  = document.getElementById("btnSaveYT");
const btnClearYT = document.getElementById("btnClearYT");
const playerWrap = document.getElementById("playerWrap");
const ytFrame    = document.getElementById("ytFrame");

// Tema
const btnTheme = document.getElementById("btnTheme");
const THEME_KEY = "louvores_theme";
if(localStorage.getItem(THEME_KEY) === "light") document.documentElement.classList.add("light");
btnTheme.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.documentElement.classList.contains("light") ? "light" : "dark");
});

// ===== filtro/lista =====
let currentSongId = null;

function getFiltered(){
  const q = norm(qEl.value);
  const cat = catEl.value;

  let items = SONGS.slice();
  if(cat !== "all") items = items.filter(s => s.cat === cat);

  if(q){
    items = items.filter(s => norm(`${s.title} ${s.artist}`).includes(q));
  }

  const sort = sortEl.value;
  if(sort === "az") items.sort((a,b) => a.title.localeCompare(b.title, "pt-BR"));
  if(sort === "cat") items.sort((a,b) => (a.cat + a.title).localeCompare(b.cat + b.title, "pt-BR"));
  return items;
}

function renderList(){
  const items = getFiltered();
  countEl.textContent = String(items.length);

  if(items.length === 0){
    listEl.innerHTML = `
      <div class="card">
        <h3>Nenhum resultado</h3>
        <div class="artist">Tente: "fernandinho", "morada", "vou voar"…</div>
        <div class="tag">Dica</div>
      </div>
    `;
    return;
  }

  listEl.innerHTML = items.map(s => `
    <article class="card ${s.id === currentSongId ? "selected" : ""}" data-id="${s.id}" tabindex="0">
      <h3>${escapeHtml(s.title)}</h3>
      <div class="artist">${escapeHtml(s.artist)}</div>
      <div class="tag">${catLabel(s.cat)}</div>
    </article>
  `).join("");
}

// ===== letra embutida =====
function getLyricsFor(song){
  const k = keyOf(song);

  // 1) lyrics.js (banco fixo do site)
  if(window.LYRICS_DB && typeof window.LYRICS_DB[k] === "string" && window.LYRICS_DB[k].trim()){
    return { source: "site", text: window.LYRICS_DB[k] };
  }

  // 2) localStorage (o que você salvar no navegador)
  if(typeof localLyrics[k] === "string" && localLyrics[k].trim()){
    return { source: "local", text: localLyrics[k] };
  }

  return null;
}

function renderLyrics(song){
  const found = getLyricsFor(song);

  if(!found){
    lyricsStatus.textContent = "sem letra";
    lyricsEmpty.hidden = false;
    lyricsText.hidden = true;
    lyricsText.textContent = "";
    lyricsInput.value = "";
    return;
  }

  lyricsStatus.textContent = found.source === "site" ? "do site" : "salva local";
  lyricsEmpty.hidden = true;
  lyricsText.hidden = false;
  lyricsText.textContent = found.text;

  // pré-carrega editor com a letra atual
  lyricsInput.value = found.text;
}

// ===== detalhe =====
function setDetail(song){
  currentSongId = song.id;

  songTitleEl.textContent  = song.title;
  songArtistEl.textContent = song.artist;
  songCatEl.textContent    = catLabel(song.cat);

  // links externos
  btnLyricsSource.href = letrasSearchUrl(song);
  btnCifra.href        = cifraUrl(song);
  btnYT.href           = ytSearchUrl(song);

  btnLyricsSource.classList.remove("disabled");
  btnCifra.classList.remove("disabled");
  btnYT.classList.remove("disabled");

  // letra embutida
  renderLyrics(song);

  // youtube embutido (se cadastrado)
  const savedYT = ytMap[song.id] || "";
  ytInput.value = savedYT;

  const embed = youtubeEmbedUrl(savedYT);
  if(embed){
    playerWrap.hidden = false;
    ytFrame.src = embed;
  } else {
    playerWrap.hidden = true;
    ytFrame.src = "";
  }

  renderList();
}

listEl.addEventListener("click", (e) => {
  const card = e.target.closest(".card[data-id]");
  if(!card) return;
  const song = SONGS.find(s => s.id === card.dataset.id);
  if(song) setDetail(song);
});
listEl.addEventListener("keydown", (e) => {
  if(e.key !== "Enter") return;
  const card = e.target.closest(".card[data-id]");
  if(card) card.click();
});

qEl.addEventListener("input", renderList);
catEl.addEventListener("change", renderList);
sortEl.addEventListener("change", renderList);

// ===== salvar/remover letra (localStorage) =====
btnSaveLyrics.addEventListener("click", () => {
  if(!currentSongId) return;
  const song = SONGS.find(s => s.id === currentSongId);
  if(!song) return;

  const k = keyOf(song);
  const txt = lyricsInput.value.trim();
  if(!txt){
    alert("Cole a letra antes de salvar.");
    return;
  }

  localLyrics[k] = txt;
  saveMap(LY_KEY, localLyrics);
  renderLyrics(song);
});

btnClearLyrics.addEventListener("click", () => {
  if(!currentSongId) return;
  const song = SONGS.find(s => s.id === currentSongId);
  if(!song) return;

  const k = keyOf(song);
  delete localLyrics[k];
  saveMap(LY_KEY, localLyrics);
  renderLyrics(song);
});

btnExportLyrics.addEventListener("click", () => {
  const data = JSON.stringify(localLyrics, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "lyrics-export.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ===== youtube =====
btnSaveYT.addEventListener("click", () => {
  if(!currentSongId) return;
  const song = SONGS.find(s => s.id === currentSongId);
  if(!song) return;

  const val = ytInput.value.trim();
  ytMap[currentSongId] = val;
  saveMap(YT_KEY, ytMap);

  const embed = youtubeEmbedUrl(val);
  if(embed){
    playerWrap.hidden = false;
    ytFrame.src = embed;
  } else {
    playerWrap.hidden = true;
    ytFrame.src = "";
    window.open(ytSearchUrl(song), "_blank", "noopener,noreferrer");
  }
});

btnClearYT.addEventListener("click", () => {
  if(!currentSongId) return;
  delete ytMap[currentSongId];
  saveMap(YT_KEY, ytMap);
  ytInput.value = "";
  playerWrap.hidden = true;
  ytFrame.src = "";
});

// INIT
renderList();