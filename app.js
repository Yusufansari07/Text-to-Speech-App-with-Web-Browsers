const synth = window.speechSynthesis;
let voices = [];

// DOM elements
const voiceSelect = document.getElementById("voice-select");
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const speedSlider = document.getElementById("speed-slider");
const pitchSlider = document.getElementById("pitch-slider");
const status = document.getElementById("status");
const statusText = document.getElementById("status-text");

// -------------------- VOICES --------------------
function loadVoices() {
  voices = synth.getVoices();
  if (!voices.length) return;

  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  console.log(`Loaded ${voices.length} voices`);
}

// -------------------- CHARACTER COUNT --------------------
function updateCharCount() {
  charCount.textContent = textInput.value.length;
}

// -------------------- SPEAK --------------------
function speak() {
  if (synth.speaking) synth.cancel();

  const text = textInput.value.trim();
  if (!text) {
    alert("Please enter some text to speak");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  const index = voiceSelect.value;
  if (index !== "") utterance.voice = voices[index];

  utterance.rate = parseFloat(speedSlider.value);
  utterance.pitch = parseFloat(pitchSlider.value);

  utterance.onstart = () => {
    status.classList.add("speaking");
    statusText.textContent = "Speaking...";
    speakBtn.disabled = true;
    stopBtn.disabled = false;
  };

  utterance.onend = () => {
    status.classList.remove("speaking");
    statusText.textContent = "Ready";
    speakBtn.disabled = false;
    stopBtn.disabled = true;
  };

  utterance.onerror = () => {
    statusText.textContent = "Error occurred";
    speakBtn.disabled = false;
    stopBtn.disabled = true;
  };

  synth.speak(utterance);
}

// -------------------- STOP --------------------
function stop() {
  synth.cancel();
  status.classList.remove("speaking");
  statusText.textContent = "Stopped";
  speakBtn.disabled = false;
  stopBtn.disabled = true;
}

// -------------------- INIT --------------------
function init() {
  loadVoices();
  synth.addEventListener("voiceschanged", loadVoices);

  textInput.addEventListener("input", updateCharCount);
  speakBtn.addEventListener("click", speak);
  stopBtn.addEventListener("click", stop);

  updateCharCount();
  stopBtn.disabled = true;
}

document.addEventListener("DOMContentLoaded", init);
