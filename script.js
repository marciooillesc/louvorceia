// ===== Dados (extraídos dos PDFs) =====
// Adorações: :contentReference[oaicite:2]{index=2}
// Celebrações: :contentReference[oaicite:3]{index=3}

const SONGS_BASE = [
  // ===== ADORAÇÕES =====
  { id: "ador-001", cat: "adoracao", title: "Isaías 6", artist: "Morada" },
  { id: "ador-002", cat: "adoracao", title: "Quando a luz se apagar", artist: "Ministério Zoe" },
  { id: "ador-003", cat: "adoracao", title: "Pode morar aqui", artist: "Theo Rubia" },
  { id: "ador-004", cat: "adoracao", title: "Maranata / Lágrimas de fogo", artist: "Vitorhia Sounds" },
  { id: "ador-005", cat: "adoracao", title: "Eu tenho você", artist: "Marcelo Markes" },
  { id: "ador-006", cat: "adoracao", title: "Tua presença vale mais", artist: "Mateus Britto" },
  { id: "ador-007", cat: "adoracao", title: "A casa eu arrumei", artist: "Mateus Britto" },
  { id: "ador-008", cat: "adoracao", title: "Vem me buscar", artist: "Jefferson e Suellen" },
  { id: "ador-009", cat: "adoracao", title: "Eu só quero tua presença", artist: "Theo Rubia" },

  { id: "ador-010", cat: "adoracao", title: "Jesus em tua presença / Ao único / Eu navegarei", artist: "Morada" },
  { id: "ador-011", cat: "adoracao", title: "Quando ele vem", artist: "André Aquino" },
  { id: "ador-012", cat: "adoracao", title: "Que esse fogo não se apague", artist: "Kaleb e Josh" },
  { id: "ador-013", cat: "adoracao", title: "Aviva-nos / A terra clama / Fogo e glória", artist: "Kaleb e Josh" },
  { id: "ador-014", cat: "adoracao", title: "Ruja o leão", artist: "Fhop Music" },
  { id: "ador-015", cat: "adoracao", title: "O que tua glória fez comigo", artist: "Fernanda Brun" },
  { id: "ador-016", cat: "adoracao", title: "Eu era órfão", artist: "Cia Salt" },
  { id: "ador-017", cat: "adoracao", title: "Oh! Se fendesses", artist: "Morada" },
  { id: "ador-018", cat: "adoracao", title: "É tudo sobre você", artist: "Morada" },

  { id: "ador-019", cat: "adoracao", title: "Pra onde eu irei", artist: "Morada" },
  { id: "ador-020", cat: "adoracao", title: "Só tu és santo", artist: "Morada" },
  { id: "ador-021", cat: "adoracao", title: "Em teus braços", artist: "Laura Souguellis" },
  { id: "ador-022", cat: "adoracao", title: "Santo espírito", artist: "Laura Souguellis" },
  { id: "ador-023", cat: "adoracao", title: "Meus votos", artist: "Morada" },
  { id: "ador-024", cat: "adoracao", title: "Vem derrama / Faz chover / A terra clama", artist: "Kaleb e Josh" },
  { id: "ador-025", cat: "adoracao", title: "Grande é o Senhor / Louvor ao Rei / Te Exaltamos / Ele é Exaltado", artist: "Morada" },
  { id: "ador-026", cat: "adoracao", title: "Me atraiu", artist: "Gabriela Rocha" },
  { id: "ador-027", cat: "adoracao", title: "Um milhão de anos", artist: "Theo Rubia" },

  { id: "ador-028", cat: "adoracao", title: "Único", artist: "Fhop Music" },
  { id: "ador-029", cat: "adoracao", title: "Jeovah jireh", artist: "Aline Barros" },
  { id: "ador-030", cat: "adoracao", title: "Nazireu", artist: "Ministério Zoe" },
  { id: "ador-031", cat: "adoracao", title: "Atrai o meu coração", artist: "Filhos do Homem" },
  { id: "ador-032", cat: "adoracao", title: "Yaweh se manifestará", artist: "Ea Sounds" },
  { id: "ador-033", cat: "adoracao", title: "Se até os anjos se prostram", artist: "Jhonas Serra" },
  { id: "ador-034", cat: "adoracao", title: "Até que o senhor venha", artist: "Ministério Zoe" },
  { id: "ador-035", cat: "adoracao", title: "Meu abrigo", artist: "Davi Sacer" },
  { id: "ador-036", cat: "adoracao", title: "Hino da vitória", artist: "Cassiane" },
  { id: "ador-037", cat: "adoracao", title: "Poderoso Deus + quem já pisou", artist: "Gabriela Rocha" },

  { id: "ador-038", cat: "adoracao", title: "Porque dele por ele (a ele a glória)", artist: "Diante do Trono" },
  { id: "ador-039", cat: "adoracao", title: "Colossenses e suas linhas de amor", artist: "Fhop Music" },
  { id: "ador-040", cat: "adoracao", title: "O encontro", artist: "Jefferson e Suellen" },
  { id: "ador-041", cat: "adoracao", title: "Batendo à porta", artist: "Fhop Music" },
  { id: "ador-042", cat: "adoracao", title: "Ekballo", artist: "Alessandro Vilas Boas" },
  { id: "ador-043", cat: "adoracao", title: "Nada mais", artist: "Gabriel Guedes" },
  { id: "ador-044", cat: "adoracao", title: "Acende outra vez", artist: "Jefferson e Suellen" },
  { id: "ador-045", cat: "adoracao", title: "Tu és", artist: "Fhop Music" },
  { id: "ador-046", cat: "adoracao", title: "A boa parte", artist: "Fhop Music" },
  { id: "ador-047", cat: "adoracao", title: "Somente Cristo", artist: "Fhop Music" },

  { id: "ador-048", cat: "adoracao", title: "Eu vi alguém mais belo", artist: "Fhop Music" },
  { id: "ador-049", cat: "adoracao", title: "Digno de tudo + Te Exaltamos", artist: "Emaus Music" },
  { id: "ador-050", cat: "adoracao", title: "Santo pra sempre", artist: "Gabriel Guedes" },
  { id: "ador-051", cat: "adoracao", title: "Clamo Jesus", artist: "Paulo César Baruk" },
  { id: "ador-052", cat: "adoracao", title: "É ele", artist: "Drops INA" },
  { id: "ador-053", cat: "adoracao", title: "Escape", artist: "Renascer Praise" },
  { id: "ador-054", cat: "adoracao", title: "Canção de Simeão", artist: "Drops Ina" },
  { id: "ador-055", cat: "adoracao", title: "Sublime", artist: "Fhop" },
  { id: "ador-056", cat: "adoracao", title: "Dono da minha Afeição", artist: "Fhop" },
  { id: "ador-057", cat: "adoracao", title: "Cristo + Tudo é teu", artist: "Fhop" },

  { id: "ador-058", cat: "adoracao", title: "Quem é esse", artist: "Julliany Souza" },
  { id: "ador-059", cat: "adoracao", title: "Uma vez", artist: "Fhop" },
  { id: "ador-060", cat: "adoracao", title: "Te esperamos", artist: "Salvaon" },

  // ===== CELEBRAÇÕES =====
  { id: "cele-001", cat: "celebracao", title: "Ele reina", artist: "Jefferson e Suellen" },
  { id: "cele-002", cat: "celebracao", title: "Cordeiro santo", artist: "Filhos do Homem" },
  { id: "cele-003", cat: "celebracao", title: "Tudo o que me prometeu", artist: "Israel Salazar" },
  { id: "cele-004", cat: "celebracao", title: "Teu amor não falha", artist: "Nívea Soares" },
  { id: "cele-005", cat: "celebracao", title: "Vou voar", artist: "Juliano Son" },
  { id: "cele-006", cat: "celebracao", title: "Toda sorte de bênçãos", artist: "Davi Sacer" },
  { id: "cele-007", cat: "celebracao", title: "Meu alvo", artist: "Kleber Lucas" },
  { id: "cele-008", cat: "celebracao", title: "Estou sem fôlego", artist: "Fred Arrais" },
  { id: "cele-009", cat: "celebracao", title: "Meu maior amor", artist: "Nívea Soares" },
  { id: "cele-010", cat: "celebracao", title: "Tão profundo", artist: "Vineyard" },

  { id: "cele-011", cat: "celebracao", title: "Deus não está morto", artist: "Fernandinho" },
  { id: "cele-012", cat: "celebracao", title: "Verbo Vivo", artist: "Nívea Soares" },
  { id: "cele-013", cat: "celebracao", title: "Os que esperam", artist: "Nívea Soares" },
  { id: "cele-014", cat: "celebracao", title: "Graça", artist: "Israel Salazar" },
  { id: "cele-015", cat: "celebracao", title: "Abra os olhos do meu coração", artist: "David Quinlan" },
  { id: "cele-016", cat: "celebracao", title: "Quebrantado", artist: "Vineyard" },
  { id: "cele-017", cat: "celebracao", title: "Te agradeço", artist: "Kleber Lucas" },
  { id: "cele-018", cat: "celebracao", title: "Galileu", artist: "Fernandinho" },
  { id: "cele-019", cat: "celebracao", title: "Seu Sangue", artist: "Fernandinho" },
  { id: "cele-020", cat: "celebracao", title: "Vitória no deserto", artist: "Aline Barros" },

  { id: "cele-021", cat: "celebracao", title: "Nosso Deus", artist: "Marcus Salles" },
  { id: "cele-022", cat: "celebracao", title: "Eu acredito em Jesus", artist: "Daniel Souza" },
  { id: "cele-023", cat: "celebracao", title: "Simples como Jesus", artist: "Daniel Alencar" },
  { id: "cele-024", cat: "celebracao", title: "Estamos de pé", artist: "Marcus Salles" },
  { id: "cele-025", cat: "celebracao", title: "Tua igreja canta", artist: "Israel Salazar" },
  { id: "cele-026", cat: "celebracao", title: "Maravilhosa Graça", artist: "Drops" },
  { id: "cele-027", cat: "celebracao", title: "Eu vou viver uma virada", artist: "Toque no altar" },
  { id: "cele-028", cat: "celebracao", title: "Nada é impossível", artist: "Quatro por Um" },
  { id: "cele-029", cat: "celebracao", title: "Leão", artist: "Gabriela Rocha" },
  { id: "cele-030", cat: "celebracao", title: "Ainda que a figueira", artist: "Fernandinho" },

  { id: "cele-031", cat: "celebracao", title: "Pródigo", artist: "Casa worship" },
  { id: "cele-032", cat: "celebracao", title: "Reina em mim", artist: "Vineyard" },
  { id: "cele-033", cat: "celebracao", title: "Eis que estou à porta", artist: "Fernandinho" },
  { id: "cele-034", cat: "celebracao", title: "Nosso coração queima", artist: "Fhop Music" },
  { id: "cele-035", cat: "celebracao", title: "Grato sou", artist: "Drops" },
];

// ===== Persistência local de links do YouTube =====
const YT_KEY = "louvores_youtube_links_v1";

function loadYTMap(){
  try { return JSON.parse(localStorage.getItem(YT_KEY) || "{}"); }
  catch { return {}; }
}
function saveYTMap(map){
  localStorage.setItem(YT_KEY, JSON.stringify(map));
}

let ytMap = loadYTMap();

// ===== Helpers de URL (Letra / Cifra / YouTube) =====
// Letra: usar busca no Google filtrando um site de letras (robusto e sem embed)
function lyricsUrl(song){
  const q = encodeURIComponent(`${song.title} ${song.artist} letra`);
  // Você pode trocar por outro site que preferir, ex.: letras.mus.br, vagalume, etc.
  return `https://www.google.com/search?q=${q}`;
}

// Cifra Club: busca direta
function cifraUrl(song){
  const q = encodeURIComponent(`${song.title} ${song.artist}`.trim());
  return `https://www.cifraclub.com.br/?q=${q}`;
}

// YouTube: busca direta
function ytSearchUrl(song){
  const q = encodeURIComponent(`${song.title} ${song.artist}`.trim());
  return `https://www.youtube.com/results?search_query=${q}`;
}

// Se houver link do YouTube salvo, tenta embed
function youtubeEmbedUrl(youtubeUrl){
  if(!youtubeUrl) return null;
  try{
    const u = new URL(youtubeUrl);
    let id = "";
    if (u.hostname.includes("youtu.be")) id = u.pathname.replace("/","");
    else id = u.searchParams.get("v") || "";
    if(!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }catch{
    return null;
  }
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function catLabel(cat){
  return cat === "adoracao" ? "Adoração" : "Celebração";
}

// ===== Elementos =====
const viewList = document.getElementById("viewList");
const viewSong = document.getElementById("viewSong");

const listEl = document.getElementById("list");
const qEl = document.getElementById("q");
const catEl = document.getElementById("cat");
const sortEl = document.getElementById("sort");

const btnBack = document.getElementById("btnBack");

const songTitleEl = document.getElementById("songTitle");
const songArtistEl = document.getElementById("songArtist");
const songCatEl = document.getElementById("songCat");

const btnLyrics = document.getElementById("btnLyrics");
const btnCifra = document.getElementById("btnCifra");
const btnYT = document.getElementById("btnYT");

const playerWrap = document.getElementById("playerWrap");
const ytFrame = document.getElementById("ytFrame");
const ytInput = document.getElementById("ytInput");
const btnSaveYT = document.getElementById("btnSaveYT");
const btnClearYT = document.getElementById("btnClearYT");

const btnTheme = document.getElementById("btnTheme");

// ===== Tema =====
const THEME_KEY = "louvores_theme";
function loadTheme(){
  const t = localStorage.getItem(THEME_KEY);
  if(t === "light") document.documentElement.classList.add("light");
}
function toggleTheme(){
  document.documentElement.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.documentElement.classList.contains("light") ? "light" : "dark");
}
btnTheme.addEventListener("click", toggleTheme);
loadTheme();

// ===== Render lista =====
function getFiltered(){
  const q = qEl.value.trim().toLowerCase();
  const cat = catEl.value;

  let items = SONGS_BASE.slice();

  if(cat !== "all") items = items.filter(s => s.cat === cat);

  if(q){
    items = items.filter(s => (`${s.title} ${s.artist}`).toLowerCase().includes(q));
  }

  const sort = sortEl.value;
  if(sort === "az"){
    items.sort((a,b) => a.title.localeCompare(b.title, "pt-BR"));
  } else if(sort === "cat"){
    items.sort((a,b) => (a.cat + a.title).localeCompare(b.cat + b.title, "pt-BR"));
  }

  return items;
}

function renderList(){
  const items = getFiltered();
  if(!items.length){
    listEl.innerHTML = `<div class="card"><h3>Nenhum resultado</h3><div class="artist">Tente outra busca ou categoria.</div></div>`;
    return;
  }

  listEl.innerHTML = items.map(s => {
    return `
      <article class="card">
        <h3>
          <a class="songlink" href="#/song/${encodeURIComponent(s.id)}">
            ${escapeHtml(s.title)}
          </a>
        </h3>
        <div class="artist">${escapeHtml(s.artist)}</div>
        <div class="tag">${catLabel(s.cat)}</div>
      </article>
    `;
  }).join("");
}

qEl.addEventListener("input", renderList);
catEl.addEventListener("change", renderList);
sortEl.addEventListener("change", renderList);

// ===== Navegação por hash =====
function showList(){
  viewSong.hidden = true;
  viewList.hidden = false;
  stopVideo();
}

function showSong(id){
  const song = SONGS_BASE.find(s => s.id === id);
  if(!song){
    location.hash = "#/";
    return;
  }

  viewList.hidden = true;
  viewSong.hidden = false;

  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;
  songCatEl.textContent = catLabel(song.cat);

  btnLyrics.href = lyricsUrl(song);
  btnCifra.href = cifraUrl(song);
  btnYT.href = ytSearchUrl(song);

  // YouTube embutido (se houver salvo)
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

  // salvar/remover
  btnSaveYT.onclick = () => {
    const val = ytInput.value.trim();
    ytMap[song.id] = val;
    saveYTMap(ytMap);

    const embed2 = youtubeEmbedUrl(val);
    if(embed2){
      playerWrap.hidden = false;
      ytFrame.src = embed2;
    } else {
      playerWrap.hidden = true;
      ytFrame.src = "";
      // fallback: se não for link válido, abre busca
      window.open(ytSearchUrl(song), "_blank", "noopener,noreferrer");
    }
  };

  btnClearYT.onclick = () => {
    delete ytMap[song.id];
    saveYTMap(ytMap);
    ytInput.value = "";
    playerWrap.hidden = true;
    ytFrame.src = "";
  };
}

function stopVideo(){
  ytFrame.src = "";
}

btnBack.addEventListener("click", () => history.back());

function router(){
  const hash = location.hash || "#/";
  const m = hash.match(/^#\/song\/(.+)$/);
  if(m){
    const id = decodeURIComponent(m[1]);
    showSong(id);
  } else {
    showList();
    renderList();
  }
}

window.addEventListener("hashchange", router);
router();
renderList();