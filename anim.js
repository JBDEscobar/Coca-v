// Sincronizar las letras con la canción
// lyricsData viene de lyrics.js (se genera con sincronizar.html)
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

lyrics.style.transition = "opacity 0.4s ease";

function updateLyrics() {
  if (typeof lyricsData === "undefined") return;

  var t = audio.currentTime;
  var i = -1;
  for (var k = 0; k < lyricsData.length; k++) {
    if (t >= lyricsData[k].time) i = k;
    else break;
  }

  var line = lyricsData[i];
  var next = lyricsData[i + 1];

  // Muestra la línea hasta que empiece la siguiente (máximo 6 segundos)
  if (line && t < line.time + 6 && (!next || t < next.time)) {
    if (lyrics.innerHTML !== line.text) lyrics.innerHTML = line.text;
    lyrics.style.opacity = 1;
  } else {
    lyrics.style.opacity = 0;
  }
}

audio.addEventListener("timeupdate", updateLyrics);

// Función para ocultar el título
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

// Oculta el título 4:35 (275 s) después de empezar, igual que la duración de la canción
setTimeout(ocultarTitulo, 275000);

var aviso = document.createElement("div");
aviso.textContent = "Toca la pantalla para activar la música 🎵";
aviso.style.cssText =
  "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);" +
  "padding:10px 16px;background:rgba(0,0,0,.6);color:#fff;" +
  "border-radius:20px;font:14px sans-serif;z-index:10;display:none";
document.body.appendChild(aviso);

function iniciarAudio() {
  audio.play()
    .then(function () { aviso.style.display = "none"; })
    .catch(function () { aviso.style.display = "block"; });
}

iniciarAudio();
["click", "touchstart"].forEach(function (ev) {
  document.addEventListener(ev, function () {
    if (audio.paused) iniciarAudio();
  });
});
