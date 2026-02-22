// ===== util: normaliza texto para busca (sem acentos) =====
function norm(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .trim();
}

// ===== Lista (inclui "Vou voar") =====
const SONGS = [
  // CELEBRAÇÕES (inclui vou voar)
  { id:"cele-005", cat:"celebracao", title:"Vou voar", artist:"Juliano Son" },

  // (você pode manter o resto da lista completa aqui)
  { id:"cele-001", cat:"celebracao", title:"Ele reina", artist:"Jefferson e Suellen" },
  { id:"cele-002", cat:"celebracao", title:"Cordeiro santo", artist:"Filhos do Homem" },
  { id:"cele-004", cat:"celebracao", title:"Teu amor não falha", artist:"Nívea Soares" },
  { id:"cele-011", cat:"celebracao", title:"Deus não está morto", artist:"Fernandinho" },
  { id:"cele-018", cat:"celebracao", title:"Galileu", artist:"Fernandinho" },
  { id:"cele-020", cat:"celebracao", title:"Vitória no deserto", artist:"Aline Barros" },
  { id:"cele-028", cat:"celebracao", title:"Nada é impossível", artist:"Quatro por Um" },
  { id:"cele-035", cat:"celebracao", title:"Grato sou", artist:"Drops" },

  // ADORAÇÕES (amostra — cole aqui a lista toda se quiser)
  { id:"ador-001", cat:"adoracao", title:"Isaías 6", artist:"Morada" },
  { id:"ador-002", cat:"adoracao", title:"Quando a luz se apagar", artist:"Ministério Zoe" },
  { id:"ador-003", cat:"adoracao", title:"Pode morar aqui", artist:"Theo Rubia" },
  { id:"ador-058", cat:"adoracao", title:"Quem é esse", artist:"Julliany Souza" },
  { id:"ador-060", cat:"adoracao", title:"Te esperamos", artist:"Salvaon" },
];

// ===== Persistência local de links do YouTube =====
const YT_KEY = "louvores_youtube_links_v1";
let ytMap = loadYTMap();
function loadYTMap(){ try { return JSON.parse(localStorage.getItem(YT_KEY) || "{}"); } catch { return {}; } }
function saveYTMap(map){ localStorage.setItem(YT_KEY, JSON.stringify(map)); }

// ===== URLs =====
function lyricsUrl(song){
  const q = encodeURIComponent(`${song.title} ${song.artist} letra`);
  return `https://www.google.com/search?q=${q}`;
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

// ===== DOM =====
const listEl   = document.getElementById("list");
const countEl  = document.getElementById("count");
const qEl      = document.getElementById("q");
const catEl    = document.getElementById("cat");
const sortEl   = document.getElementById("sort");

const songTitleEl  = document.getElementById("songTitle");
const songArtistEl = document.getElementById("songArtist");
const songCatEl    = document.getElementById("songCat");
const btnLyrics    = document.getElementById("btnLyrics");
const btnCifra     = document.getElementById("btnCifra");
const btnYT        = document.getElementById("btnYT");

const playerWrap = document.getElementById("playerWrap");
const ytFrame    = document.getElementById("ytFrame");
const ytInput    = document.getElementById("ytInput");
const btnSaveYT  = document.getElementById("btnSaveYT");
const btnClearYT = document.getElementById("btnClearYT");

// ===== Tema =====
const btnTheme = document.getElementById("btnTheme");
const THEME_KEY = "louvores_theme";
if(localStorage.getItem(THEME_KEY) === "light") document.documentElement.classList.add("light");
btnTheme.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.documentElement.classList.contains("light") ? "light" : "dark");
});

// ===== Lista / filtro =====
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

let currentSongId = null;

function renderList(){
  const items = getFiltered();
  countEl.textContent = String(items.length);

  if(items.length === 0){
    listEl.innerHTML = `
      <div class="card">
        <h3>Nenhum resultado</h3>
        <div class="artist">Tente: "vou voar", "fernandinho", "morada"…</div>
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

function setDetail(song){
  currentSongId = song.id;

  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;
  songCatEl.textContent = catLabel(song.cat);

  btnLyrics.href = lyricsUrl(song);
  btnCifra.href  = cifraUrl(song);
  btnYT.href     = ytSearchUrl(song);

  btnLyrics.classList.remove("disabled");
  btnCifra.classList.remove("disabled");
  btnYT.classList.remove("disabled");

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

  renderList(); // para destacar o card selecionado
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

// YouTube embutido
btnSaveYT.addEventListener("click", () => {
  if(!currentSongId) return;
  const song = SONGS.find(s => s.id === currentSongId);
  if(!song) return;

  const val = ytInput.value.trim();
  ytMap[currentSongId] = val;
  saveYTMap(ytMap);

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
  saveYTMap(ytMap);
  ytInput.value = "";
  playerWrap.hidden = true;
  ytFrame.src = "";
});

// INIT
renderList();
