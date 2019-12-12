// Contexte Audio
const ctxAudio = new AudioContext()
// Oscillator Generateur de son

const osc = ctxAudio.createOscillator()
osc.start()

const button = document.querySelector('#btnPlay')
let connect = false
button.addEventListener('click', () => {
  ctxAudio.resume().then(() => {
    if (connect) {
      osc.disconnect(ctxAudio.destination)
    } else {
      osc.connect(ctxAudio.destination)
    }
    connect = !connect
  })
})
