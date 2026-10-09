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
