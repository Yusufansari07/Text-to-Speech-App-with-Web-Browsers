const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();

    if (voices.length === 0) {
        return;
    }

    const voiceSelect = document.getElementById("voice-select");
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    console.log(`Loaded ${voices.length} voices`);
}

function init() {
    loadVoices();

    // Required for Chrome, Edge, Safari
    synth.addEventListener("voiceschanged", loadVoices);
}

document.addEventListener("DOMContentLoaded", init);

const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");

function updateCharCount() {
    const count = textInput.value.length;
    charCount.textContent = count;
}

textInput.addEventListener("input" , updateCharCount);

function init() {
    loadVoices();
    synth.addEventListener("voiceschanged" , loadVoices);

    textInput.addEventListener("input" , updateCharCount);
    updateCharCount();
}