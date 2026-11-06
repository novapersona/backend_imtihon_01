// Arabic Text-to-Speech using Web Speech API
export function speakText(text, lang = 'ar-SA', onFail = null) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onFail) onFail("Qurilmangizda ovozli o'qish qo'llab-quvvatlanmaydi");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;

  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.includes('Arabic'));
  if (arVoice) {
    utterance.voice = arVoice;
  }

  window.speechSynthesis.speak(utterance);
}
