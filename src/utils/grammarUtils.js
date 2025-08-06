// src/utils/grammarUtils.js
export function checkGrammar(text) {
  const issues = [];
  const sentences = text.split(/[.!?]\s*/);

  for (let sentence of sentences) {
    const words = sentence.trim().split(/\s+/);
    if (!words.length) continue;

    // Capitalization check
    const firstWord = words[0];
    if (firstWord && firstWord[0] !== firstWord[0].toUpperCase()) {
      issues.push({ word: firstWord, reason: "Sentence should start with a capital letter." });
    }

    // Basic verb agreement: I has → I have
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].toLowerCase() === "i" && words[i + 1].toLowerCase() === "has") {
        issues.push({ word: "has", reason: "'I' should be followed by 'have'" });
      }
    }

    // Article check: "a apple" → "an apple"
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].toLowerCase() === "a" && /^[aeiou]/i.test(words[i + 1])) {
        issues.push({ word: "a", reason: "Use 'an' before a vowel sound" });
      }
    }
  }

  return issues;
}
