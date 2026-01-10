const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();

    if (voices.lenght === 0) {
        return;
    }

    const voiceSelect = DocumentFragment.getElementById("voice-select");
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    console.log(`Loaded ${voices.lenght} voices`);
}
