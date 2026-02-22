// ===== util: normaliza pra busca (sem acentos) =====
function norm(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function catLabel(cat){
  return cat === "adoracao" ? "Adoração" : "Celebração";
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// Link MAIS provável: busca no Letras pelo artista + música (geralmente cai certinho)
function letrasUrl(song){
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

// ===== LISTA COMPLETA (não reduzida) =====
const SONGS = [
  // ===== ADORAÇÕES =====
  { id:"ador-001", cat:"adoracao", title:"Isaías 6", artist:"Morada" },
  { id:"ador-002", cat:"adoracao", title:"Quando a luz se apagar", artist:"Ministério Zoe" },
  { id:"ador-003", cat:"adoracao", title:"Pode morar aqui", artist:"Theo Rubia" },
  { id:"ador-004", cat:"adoracao", title:"Maranata / Lágrimas de fogo", artist:"Vitorhia Sounds" },
  { id:"ador-005", cat:"adoracao", title:"Eu tenho você", artist:"Marcelo Markes" },
  { id:"ador-006", cat:"adoracao", title:"Tua presença vale mais", artist:"Mateus Britto" },
  { id:"ador-007", cat:"adoracao", title:"A casa eu arrumei", artist:"Mateus Britto" },
  { id:"ador-008", cat:"adoracao", title:"Vem me buscar", artist:"Jefferson e Suellen" },
  { id:"ador-009", cat:"adoracao", title:"Eu só quero tua presença", artist:"Theo Rubia" },
  { id:"ador-010", cat:"adoracao", title:"Jesus em tua presença / Ao único / Eu navegarei", artist:"Morada" },
  { id:"ador-011", cat:"adoracao", title:"Quando ele vem", artist:"André Aquino" },
  { id:"ador-012", cat:"adoracao", title:"Que esse fogo não se apague", artist:"Kaleb e Josh" },
  { id:"ador-013", cat:"adoracao", title:"Aviva-nos / A terra clama / Fogo e glória", artist:"Kaleb e Josh" },
  { id:"ador-014", cat:"adoracao", title:"Ruja o leão", artist:"Fhop Music" },
  { id:"ador-015", cat:"adoracao", title:"O que tua glória fez comigo", artist:"Fernanda Brun" },
  { id:"ador-016", cat:"adoracao", title:"Eu era órfão", artist:"Cia Salt" },
  { id:"ador-017", cat:"adoracao", title:"Oh! Se fendesses", artist:"Morada" },
  { id:"ador-018", cat:"adoracao", title:"É tudo sobre você", artist:"Morada" },
  { id:"ador-019", cat:"adoracao", title:"Pra onde eu irei", artist:"Morada" },
  { id:"ador-020", cat:"adoracao", title:"Só tu és santo", artist:"Morada" },
  { id:"ador-021", cat:"adoracao", title:"Em teus braços", artist:"Laura Souguellis" },
  { id:"ador-022", cat:"adoracao", title:"Santo espírito", artist:"Laura Souguellis" },
  { id:"ador-023", cat:"adoracao", title:"Meus votos", artist:"Morada" },
  { id:"ador-024", cat:"adoracao", title:"Vem derrama / Faz chover / A terra clama", artist:"Kaleb e Josh" },
  { id:"ador-025", cat:"adoracao", title:"Grande é o Senhor / Louvor ao Rei / Te Exaltamos / Ele é Exaltado", artist:"Morada" },
  { id:"ador-026", cat:"adoracao", title:"Me atraiu", artist:"Gabriela Rocha" },
  { id:"ador-027", cat:"adoracao", title:"Um milhão de anos", artist:"Theo Rubia" },
  { id:"ador-028", cat:"adoracao", title:"Único", artist:"Fhop Music" },
  { id:"ador-029", cat:"adoracao", title:"Jeovah jireh", artist:"Aline Barros" },
  { id:"ador-030", cat:"adoracao", title:"Nazireu", artist:"Ministério Zoe" },
  { id:"ador-031", cat:"adoracao", title:"Atrai o meu coração", artist:"Filhos do Homem" },
  { id:"ador-032", cat:"adoracao", title:"Yaweh se manifestará", artist:"Ea Sounds" },
  { id:"ador-033", cat:"adoracao", title:"Se até os anjos se prostram", artist:"Jhonas Serra" },
  { id:"ador-034", cat:"adoracao", title:"Até que o senhor venha", artist:"Ministério Zoe" },
  { id:"ador-035", cat:"adoracao", title:"Meu abrigo", artist:"Davi Sacer" },
  { id:"ador-036", cat:"adoracao", title:"Hino da vitória", artist:"Cassiane" },
  { id:"ador-037", cat:"adoracao", title:"Poderoso Deus + quem já pisou", artist:"Gabriela Rocha" },
  { id:"ador-038", cat:"adoracao", title:"Porque dele por ele (a ele a glória)", artist:"Diante do Trono" },
  { id:"ador-039", cat:"adoracao", title:"Colossenses e suas linhas de amor", artist:"Fhop Music" },
  { id:"ador-040", cat:"adoracao", title:"O encontro", artist:"Jefferson e Suellen" },
  { id:"ador-041", cat:"adoracao", title:"Batendo à porta", artist:"Fhop Music" },
  { id:"ador-042", cat:"adoracao", title:"Ekballo", artist:"Alessandro Vilas Boas" },
  { id:"ador-043", cat:"adoracao", title:"Nada mais", artist:"Gabriel Guedes" },
  { id:"ador-044", cat:"adoracao", title:"Acende outra vez", artist:"Jefferson e Suellen" },
  { id:"ador-045", cat:"adoracao", title:"Tu és", artist:"Fhop Music" },
  { id:"ador-046", cat:"adoracao", title:"A boa parte", artist:"Fhop Music" },
  { id:"ador-047", cat:"adoracao", title:"Somente Cristo", artist:"Fhop Music" },
  { id:"ador-048", cat:"adoracao", title:"Eu vi alguém mais belo", artist:"Fhop Music" },
  { id:"ador-049", cat:"adoracao", title:"Digno de tudo + Te Exaltamos", artist:"Emaus Music" },
  { id:"ador-050", cat:"adoracao", title:"Santo pra sempre", artist:"Gabriel Guedes" },
  { id:"ador-051", cat:"adoracao", title:"Clamo Jesus", artist:"Paulo César Baruk" },
  { id:"ador-052", cat:"adoracao", title:"É ele", artist:"Drops INA" },
  { id:"ador-053", cat:"adoracao", title:"Escape", artist:"Renascer Praise" },
  { id:"ador-054", cat:"adoracao", title:"Canção de Simeão", artist:"Drops Ina" },
  { id:"ador-055", cat:"adoracao", title:"Sublime", artist:"Fhop" },
  { id:"ador-056", cat:"adoracao", title:"Dono da minha Afeição", artist:"Fhop" },
  { id:"ador-057", cat:"adoracao", title:"Cristo + Tudo é teu", artist:"Fhop" },
  { id:"ador-058", cat:"adoracao", title:"Quem é esse", artist:"Julliany Souza" },
  { id:"ador-059", cat:"adoracao", title:"Uma vez", artist:"Fhop" },
  { id:"ador-060", cat:"adoracao", title:"Te esperamos", artist:"Salvaon" },

  // ===== CELEBRAÇÕES =====
  { id:"cele-001", cat:"celebracao", title:"Ele reina", artist:"Jefferson e Suellen" },
  { id:"cele-002", cat:"celebracao", title:"Cordeiro santo", artist:"Filhos do Homem" },
  { id:"cele-003", cat:"celebracao", title:"Tudo o que me prometeu", artist:"Israel Salazar" },
  { id:"cele-004", cat:"celebracao", title:"Teu amor não falha", artist:"Nívea Soares" },
  { id:"cele-005", cat:"celebracao", title:"Vou voar", artist:"Juliano Son" },
  { id:"cele-006", cat:"celebracao", title:"Toda sorte de bênçãos", artist:"Davi Sacer" },
  { id:"cele-007", cat:"celebracao", title:"Meu alvo", artist:"Kleber Lucas" },
  { id:"cele-008", cat:"celebracao", title:"Estou sem fôlego", artist:"Fred Arrais" },
  { id:"cele-009", cat:"celebracao", title:"Meu maior amor", artist:"Nívea Soares" },
  { id:"cele-010", cat:"celebracao", title:"Tão profundo", artist:"Vineyard" },
  { id:"cele-011", cat:"celebracao", title:"Deus não está morto", artist:"Fernandinho" },
  { id:"cele-012", cat:"celebracao", title:"Verbo Vivo", artist:"Nívea Soares" },
  { id:"cele-013", cat:"celebracao", title:"Os que esperam", artist:"Nívea Soares" },
  { id:"cele-014", cat:"celebracao", title:"Graça", artist:"Israel Salazar" },
  { id:"cele-015", cat:"celebracao", title:"Abra os olhos do meu coração", artist:"David Quinlan" },
  { id:"cele-016", cat:"celebracao", title:"Quebrantado", artist:"Vineyard" },
  { id:"cele-017", cat:"celebracao", title:"Te agradeço", artist:"Kleber Lucas" },
  { id:"cele-018", cat:"celebracao", title:"Galileu", artist:"Fernandinho" },
  { id:"cele-019", cat:"celebracao", title:"Seu Sangue", artist:"Fernandinho" },
  { id:"cele-020", cat:"celebracao", title:"Vitória no deserto", artist:"Aline Barros" },
  { id:"cele-021", cat:"celebracao", title:"Nosso Deus", artist:"Marcus Salles" },
  { id:"cele-022", cat:"celebracao", title:"Eu acredito em Jesus", artist:"Daniel Souza" },
  { id:"cele-023", cat:"celebracao", title:"Simples como Jesus", artist:"Daniel Alencar" },
  { id:"cele-024", cat:"celebracao", title:"Estamos de pé", artist:"Marcus Salles" },
  { id:"cele-025", cat:"celebracao", title:"Tua igreja canta", artist:"Israel Salazar" },
  { id:"cele-026", cat:"celebracao", title:"Maravilhosa Graça", artist:"Drops" },
  { id:"cele-027", cat:"celebracao", title:"Eu vou viver uma virada", artist:"Toque no altar" },
  { id:"cele-028", cat:"celebracao", title:"Nada é impossível", artist:"Quatro por Um" },
  { id:"cele-029", cat:"celebracao", title:"Leão", artist:"Gabriela Rocha" },
  { id:"cele-030", cat:"celebracao", title:"Ainda que a figueira", artist:"Fernandinho" },
  { id:"cele-031", cat:"celebracao", title:"Pródigo", artist:"Casa worship" },
  { id:"cele-032", cat:"celebracao", title:"Reina em mim", artist:"Vineyard" },
  { id:"cele-033", cat:"celebracao", title:"Eis que estou à porta", artist:"Fernandinho" },
  { id:"cele-034", cat:"celebracao", title:"Nosso coração queima", artist:"Fhop Music" },
  { id:"cele-035", cat:"celebracao", title:"Grato sou", artist:"Drops" },
];

// ===== Persistência YouTube =====
const YT_KEY = "louvores_youtube_links_v1";
function loadMap(key){ try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; } }
function saveMap(key, map){ localStorage.setItem(key, JSON.stringify(map)); }
let ytMap = loadMap(YT_KEY);

// ===== DOM =====
const listEl   = document.getElementById("list");
const countEl  = document.getElementById("count");
const qEl      = document.getElementById("q");
const catEl    = document.getElementById("cat");
const sortEl   = document.getElementById("sort");

const songTitleEl  = document.getElementById("songTitle");
const songArtistEl = document.getElementById("songArtist");
const songCatEl    = document.getElementById("songCat");

const btnShowLyrics    = document.getElementById("btnShowLyrics");
const btnOpenLyricsSite= document.getElementById("btnOpenLyricsSite");
const btnCifra         = document.getElementById("btnCifra");
const btnYT            = document.getElementById("btnYT");

const lyricsFrameWrap = document.getElementById("lyricsFrameWrap");
const lyricsFrame     = document.getElementById("lyricsFrame");
const lyricsWarn      = document.getElementById("lyricsWarn");
const lyricsHint      = document.getElementById("lyricsHint");

const ytInput    = document.getElementById("ytInput");
const btnSaveYT  = document.getElementById("btnSaveYT");
const btnClearYT = document.getElementById("btnClearYT");
const playerWrap = document.getElementById("playerWrap");
const ytFrame    = document.getElementById("ytFrame");

// ===== Tema =====
const btnTheme = document.getElementById("btnTheme");
const THEME_KEY = "louvores_theme";
if(localStorage.getItem(THEME_KEY) === "light") document.documentElement.classList.add("light");
btnTheme.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.documentElement.classList.contains("light") ? "light" : "dark");
});

// ===== Lista / filtro =====
let currentSongId = null;
let currentLyricsUrl = null;

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
        <div class="artist">Tente: "vou voar", "morada", "fernandinho"…</div>
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

// ===== Letra no painel (tentativa via iframe) =====
function resetLyricsPanel(){
  lyricsFrameWrap.hidden = true;
  lyricsWarn.hidden = true;
  lyricsHint.hidden = false;
  lyricsFrame.src = "about:blank";
}

function showLyricsHere(){
  if(!currentLyricsUrl) return;

  lyricsHint.hidden = true;
  lyricsWarn.hidden = true;
  lyricsFrameWrap.hidden = false;

  // Carrega dentro do painel
  lyricsFrame.src = currentLyricsUrl;

  // Se o site bloquear iframe, normalmente vai aparecer vazio/erro.
  // Como não dá pra detectar perfeitamente (cross-origin), mostramos aviso após um tempo.
  setTimeout(() => {
    // Mantém o iframe, mas exibe aviso para o usuário usar “Conferir no site” se não aparecer.
    lyricsWarn.hidden = false;
  }, 1800);
}

// ===== Detalhe =====
function setDetail(song){
  currentSongId = song.id;

  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;
  songCatEl.textContent = catLabel(song.cat);

  // Links
  currentLyricsUrl = letrasUrl(song);
  btnOpenLyricsSite.href = currentLyricsUrl;
  btnCifra.href = cifraUrl(song);
  btnYT.href = ytSearchUrl(song);

  // Habilita botões
  btnShowLyrics.classList.remove("disabled");
  btnOpenLyricsSite.classList.remove("disabled");
  btnCifra.classList.remove("disabled");
  btnYT.classList.remove("disabled");

  // Reseta painel de letra (não abre sozinho — você pediu clicar para ver)
  resetLyricsPanel();

  // YouTube embed salvo
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

// Clique na lista
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

// Filtros
qEl.addEventListener("input", renderList);
catEl.addEventListener("change", renderList);
sortEl.addEventListener("change", renderList);

// Botão “Ver letra aqui”
btnShowLyrics.addEventListener("click", () => {
  if(btnShowLyrics.classList.contains("disabled")) return;
  showLyricsHere();
});

// ===== YouTube =====
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
resetLyricsPanel();
renderList();