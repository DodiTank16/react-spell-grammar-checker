// src/components/SpellChecker.js
import React, { useEffect, useRef, useState } from "react";
import { useSpell } from "../hooks/useSpell";
import { checkGrammar } from "../utils/grammarUtils";
import { highlightWithErrors } from "../utils/textUtils";

const SpellChecker = () => {
  const spell = useSpell("en");
  const editorRef = useRef(null);

  const [rawText, setRawText] = useState("");
  const [html, setHtml] = useState("");
  const [suggestions, setSuggestions] = useState({
    word: "",
    list: [],
    position: { x: 0, y: 0 },
  });

  const getCaretOffset = () => {
    const sel = window.getSelection();
    if (!sel || !editorRef.current.contains(sel.anchorNode)) return 0;

    const range = sel.getRangeAt(0);
    const preCaret = range.cloneRange();
    preCaret.selectNodeContents(editorRef.current);
    preCaret.setEnd(range.endContainer, range.endOffset);
    return preCaret.toString().length;
  };

  const setCaretOffset = (offset) => {
    const range = document.createRange();
    const sel = window.getSelection();
    let charCount = 0;

    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nextChar = charCount + node.length;

      if (offset <= nextChar) {
        range.setStart(node, offset - charCount);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }

      charCount = nextChar;
    }
  };

  const handleInput = () => {
    const text = editorRef.current.innerText;
    setRawText(text);
  };

  useEffect(() => {
    if (!spell) return;

    const grammarErrors = checkGrammar(rawText);
    const newHtml = highlightWithErrors(rawText, spell, grammarErrors);
    setHtml(newHtml);
  }, [rawText, spell]);

  useEffect(() => {
    if (!html || !editorRef.current) return;

    const caret = getCaretOffset();
    editorRef.current.innerHTML = html;
    setCaretOffset(caret);
  }, [html]);

  const handleClick = (e) => {
    const el = e.target;
    const word = el.dataset.word;
    const reason = el.dataset.reason;
    if (word && spell) {
      const rect = el.getBoundingClientRect();
      const suggs = spell.suggest(word);
      setSuggestions({
        word,
        list: suggs,
        reason,
        position: { x: rect.left, y: rect.bottom },
      });
    } else {
      setSuggestions({ word: "", list: [], position: { x: 0, y: 0 } });
    }
  };

  const applySuggestion = (replacement) => {
    const pattern = new RegExp(`\\b${suggestions.word}\\b`, "gi");
    const newText = rawText.replace(pattern, replacement);
    setRawText(newText);
    setSuggestions({ word: "", list: [], position: { x: 0, y: 0 } });
  };

  return (
    <div className="spell-editor-container">
      <h2>🧠 Spell & Grammar Checker</h2>
      <div
        ref={editorRef}
        contentEditable
        className="spell-editor"
        onInput={handleInput}
        onClick={handleClick}
        suppressContentEditableWarning
        spellCheck={false}></div>

      {suggestions.list.length > 0 && (
        <div
          className="suggestions-popup-wrapper"
          style={{ top: suggestions.position.y, left: suggestions.position.x }}>
          <p className="text-sm mb-1 font-medium">
            {suggestions.reason || "Suggestions"}:
          </p>
          <div className="suggestions-popup">
            {suggestions.list.map((s, i) => (
              <button key={i} onClick={() => applySuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellChecker;
