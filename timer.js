var acao = document.getElementById('acao')
var pausa = document.getElementById('pausa')
var sessoes = document.getElementById('sessoes')
var fim = document.getElementById('fim')
//var contPomodoro
var segundos

var Som_ambiente = new Audio("./audio/Lord of the Rings Sound of The Shire.mp3")
var volta = new Audio("./audio/audio_volta.mp3")
var final = new Audio("./audio/audio_final.mp3")

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
document.getElementById('timer').style.setProperty('display', 'none', 'important')
function iniciar() {
   if (acao.value == 0) {//campos de ação, pausa e sessões estão preenchidos
      window.alert("Adicione os minutos")
      acao.focus()
   } else if (pausa.value == 0) {
      window.alert("Adicione a pausa")
      pausa.focus()
   } else if (sessoes.value == 0) {
      window.alert("Adicione as sessões")
      sessoes.focus()
   } else {
      /*var contPomodoro = document.getElementById('qtd-pomodoro')
      var contPomodoro = Number(contPomodoro.value)  
      contPomodoro = 0
      contPomodoro ++*/
      ambiente.play()  // Tocar a música automáticamente
      pause.style.setProperty('display', 'block', 'important')

      localStorage.setItem('acao', String(acao.value))//convertendo p strings
      localStorage.setItem('pausa', String(pausa.value))
      localStorage.setItem('sessoes', String(sessoes.value))

       /* e sconder inputs e botão iniciar e mostrar div do timer*/
      document.getElementById('config').style.setProperty('display', 'none', 'important')
      document.getElementById('timer').style.setProperty('display', 'block', 'important')
      momentoAcao()
      /*fim.style.fontSize = '20pt'
      if(contPomodoro >= 1){//conta quantos pomodoros foram realizados e exibe no HTML
         fim.innerHTML +=`<br> ${contPomodoro}  Pomodoro foi realizado`
      }else{
         fim.innerHTML +=`<br> ${contPomodoro}  Pomodoros foram realizados`
      }*/
   }
}

function momentoAcao() {

   let sessoes_valor = localStorage.getItem('sessoes')//pega os valores convertidos em string
   if (sessoes_valor != '1') {
      document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
   } else {
      document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
   }

   var titulo = document.getElementById('title')//titulo h3 'tempo'
   titulo.innerHTML = "Tempo"
   titulo.style.fontSize = '25pt'
   titulo.style.fontWeight = 'bold'
   titulo.style.setProperty('color', '#d7ce42', 'important')
   titulo.style.margin = 'auto'
   titulo.style.textAlign = 'center'

   min = Number(localStorage.getItem('acao'))//converte a string p num.

   min = min - 1 //p relogio fazer a contagem regressiva certa 
   segundos = 59

   document.getElementById('minutes_ok').innerHTML = min // add minutos no HTML
   document.getElementById('seconds_ok').innerHTML = segundos // add os segundos no HTML

   var min_interval = setInterval(minTimer, 60000)//milissegundos p dar 60 segundos
   var seg_interval = setInterval(segTimer, 1000)// 1 segundo

   function minTimer() {
      min = min - 1
      document.getElementById('minutes_ok').innerHTML = min
   }

   function segTimer() {
      segundos = segundos - 1
      document.getElementById('seconds_ok').innerHTML = segundos

      if (segundos <= 0) {
         if (min <= 0) {
            clearInterval(min_interval)
            clearInterval(seg_interval)

           pausar()//pausa a musica ambiente

            volta.play()// soa o alarme
            momentoPausa()//chama a função pausa se zerar os minutos e segundos

            setTimeout(function(){//espera 1 seg. apos a buzina e retoma o som ambiente
               executar()
            }, 1000)
         }
         segundos = 60 // recomeça os 60 segundos até os minutos chegarem á 0.
      }
      
   }
}
function momentoPausa() {
   let titulo = document.getElementById('title')
   titulo.innerHTML = "PAUSA"
   titulo.style.fontSize = '25pt'
   titulo.style.fontWeight = 'bold'
   titulo.style.setProperty('color', '#dc3545', 'important')
   titulo.style.margin = 'auto'
   titulo.style.textAlign = 'center'
 //mesmo processo de cima de Tempo
   min_pausa = Number(localStorage.getItem('pausa'))
   min_pausa = min_pausa - 1
   segundos = 59
   document.getElementById('minutes_ok').innerHTML = min_pausa
   document.getElementById('seconds_ok').innerHTML = segundos

   var min_interval = setInterval(minTimer, 60000)

   var seg_interval = setInterval(segTimer, 1000)
   function minTimer() {
      min_pausa = min_pausa - 1
      document.getElementById('minutes_ok').innerHTML = min_pausa
   }

   function segTimer() {
      segundos = segundos - 1
      document.getElementById('seconds_ok').innerHTML = segundos

      if (segundos <= 0) {  
         if (min_pausa <= 0) {
            ses = Number(localStorage.getItem('sessoes'))
            ses = ses - 1
            localStorage.setItem('sessoes', String(ses))
            clearInterval(min_interval)
            clearInterval(seg_interval)

            if (ses <= 0) {
               final.play()
               localStorage.clear()

               //esconde o timer 
               document.getElementById('config').style.setProperty('display', 'none', 'important')
               document.getElementById('timer').style.setProperty('display', 'none', 'important')
               fim.style.setProperty('display', 'block', 'important')
            } else {
               // Senão toca o audio volta
               volta.play();

               momentoAcao()
            }
         }
         segundos = 60
      }
   }

}