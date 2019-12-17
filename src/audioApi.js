
// Contexte
const ctxAudio = new AudioContext()

// Source oscillateur
const osc = ctxAudio.createOscillator()
osc.frequency.value = 400
osc.start()

// Source Modulateur
const mod = ctxAudio.createOscillator()
mod.frequency.value = 100
mod.start()

// Gain Modulateur
const modGain = ctxAudio.createGain()
modGain.gain.value = 500

// Gain
const gainNode = ctxAudio.createGain()
gainNode.gain.value = 0.01

// Effets
const filter = ctxAudio.createBiquadFilter()
filter.type = 'lowpass'
filter.frequency.value = 100

// Volume
const gain = ctxAudio.createGain()
gain.gain.value = 0.2

// Volume
const masterGain = ctxAudio.createGain()
masterGain.gain.value = 0.2

// Connexion
mod.connect(modGain)
modGain.connect(gain.gain)
osc.connect(filter)
filter.connect(gain)
gain.connect(masterGain)

const button = document.querySelector('#btnPlay')
let connect = false
button.addEventListener('click', () => {
  ctxAudio.resume().then(() => {
    if (connect) {
      masterGain.disconnect(ctxAudio.destination)
    } else {
      masterGain.connect(ctxAudio.destination)
    }
    connect = !connect
  })
})

const wavesInput = document.querySelectorAll("input[name='waves']")
for (var i = wavesInput.length; i--;) {
  wavesInput[i].addEventListener('change', function () {
    changeOscType(this.id)
  })
}

const modRange = document.querySelector('#mod')
const oscRange = document.querySelector('#osc')
const lowpassRange = document.querySelector('#lowpass')
const oscVolume = document.querySelector('#volume')

lowpassRange.addEventListener('input', function () {
  filter.frequency.value = this.value
}, false)

oscRange.addEventListener('input', function () {
  osc.frequency.value = this.value
}, false)

oscVolume.addEventListener('input', function () {
  masterGain.gain.value = this.value
}, false)

modRange.addEventListener('input', function () {
  mod.frequency.value = this.value
}, false)

function changeOscType (name) {
  switch (name) {
    case 'sine':
      osc.type = 'sine'
      break
    case 'triangle':
      osc.type = 'triangle'
      break
    case 'square':
      osc.type = 'square'
      break
    case 'sawtooth':
      osc.type = 'sawtooth'
      break
    default:
      osc.type = 'sine'
      break
  }
}
