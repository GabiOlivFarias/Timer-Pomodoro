var acao = document.getElementById('tnum')
var pausa = document.getElementById('tinter')
var sessoes = document.getElementById('tsec')

var segundos

var ambiente = document.getElementById('ambiente')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

function pausar(){ //tirar o botão pause e colocar o play
   ambiente.pause()
   play.style.setProperty('display', 'block', 'important')
   pause.style.setProperty('display', 'none', 'important')
}

// Função para tocar a musica tirar o botão play e colocar o pause
function executar(){
   ambiente.play()
   play.style.setProperty('display', 'none', 'important')
   pause.style.setProperty('display', 'block', 'important')
}
// Função para iniciar a contagem
function iniciar() {
   ambiente.play()  // Tocar a música automáticamente
}