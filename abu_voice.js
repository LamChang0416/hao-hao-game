/**
 * 阿布專屬語音模組 (abu_voice.js)
 * 強制抓取 iOS/iPadOS 內建的高階 Siri 或 Premium 語音，並調整音調與語速，使其更像可愛吉祥物。
 */

let availableVoices = [];
function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
}
window.speechSynthesis.onvoiceschanged = loadVoices;

window.abuSpeak = function(text, rate = 1.15, pitch = 1.3) {
    window.speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'zh-TW';
    msg.rate = rate;
    msg.pitch = pitch;

    if (availableVoices.length === 0) {
        availableVoices = window.speechSynthesis.getVoices();
    }

    let bestVoice = 
        availableVoices.find(v => v.lang.includes('zh-TW') && (v.name.includes('Siri') || v.name.includes('Premium') || v.name.includes('Enhanced'))) ||
        availableVoices.find(v => v.lang.includes('zh-TW') && v.name.includes('Mei-Jia')) ||
        availableVoices.find(v => v.lang.includes('zh-TW')) ||
        availableVoices.find(v => v.lang.includes('zh-HK')) ||
        availableVoices.find(v => v.lang.includes('zh'));

    if (bestVoice) {
        msg.voice = bestVoice;
    }

    window.speechSynthesis.speak(msg);

    const dialogIds = ['abu-dialog', 'abu-msg', 'abu-bubble'];
    for (let id of dialogIds) {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
            break;
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.speak = window.abuSpeak;
    }, 100);
});
