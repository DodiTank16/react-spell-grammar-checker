// src/utils/textUtils.js
export function highlightWithErrors(text, spell, grammarIssues = []) {
  const grammarMap = {};
  grammarIssues.forEach((err) => (grammarMap[err.word.toLowerCase()] = err.reason));

  const words = text.split(/(\s+)/).map((word) => {
    const clean = word.replace(/[^a-zA-Z']/g, "");
    const lower = clean.toLowerCase();

    if (!clean) return word;
    if (!spell.correct(clean)) {
      return `<span class="spell-error" data-word="${clean}" data-reason="Spelling mistake">${word}</span>`;
    }
    if (grammarMap[lower]) {
      return `<span class="grammar-error" data-word="${clean}" data-reason="${grammarMap[lower]}">${word}</span>`;
    }

    return word;
  });

  return words.join("");
}
