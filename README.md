# 🧠 React Spell & Grammar Checker

A fully local, privacy-first spell and grammar checker built with **React.js** — no external APIs or network calls.

It highlights **spelling mistakes** and **grammar issues** in real time, shows **suggestions**, and allows quick inline corrections. Powered by [`nspell`](https://github.com/wooorm/nspell) and a lightweight rule-based grammar engine.

---

## 🚀 Features

✅ Inline spell checking using `nspell`  
✅ Local grammar rule engine (capitalization, articles, verb agreement)  
✅ Suggestion popups on click  
✅ Real-time highlighting  
✅ Click-to-correct for both spelling and grammar  
✅ Fully client-side, no data sent to servers  
✅ Easy to extend with more rules

---

## 📸 Demo

> _Coming Soon: GIF / Screenshot_

---

## 🧱 Folder Structure

```
├── public/
│   ├── en.aff               # Hunspell affix file
│   └── en.dic               # Hunspell dictionary file
├── src/
│   ├── components/
│   │   └── SpellChecker.js  # Main component
│   ├── utils/
│   │   ├── grammarUtils.js  # Rule-based grammar engine
│   │   └── textUtils.js     # Highlighting logic
│   ├── hooks/
│   │   └── useSpell.js      # Hook to load nspell
│   ├── style.css            # Editor and popup styling
│   └── App.js               # App entry
```

---

## 🔧 Setup Instructions

1. **Clone the Repo**

```bash
git clone https://github.com/your-username/react-spell-grammar-checker.git
cd react-spell-grammar-checker
```

2. **Install Dependencies**

```bash
npm install
```

3. **Download Dictionary Files**

> You must have valid `.aff` and `.dic` files in `public/`. You can use these:

```bash
# From Wooorm (official Hunspell source)
wget https://raw.githubusercontent.com/wooorm/dictionaries/main/dictionaries/en/index.aff -O public/en.aff
wget https://raw.githubusercontent.com/wooorm/dictionaries/main/dictionaries/en/index.dic -O public/en.dic
```

4. **Start the App**

```bash
npm start
```

Then visit `http://localhost:3000` in your browser.

---

## ✍️ Example Text for Testing

Try pasting this in:

```
i has never go to the paris. it are a beautifull place with many histery and art. my brother dreamed of go their.
```

---

## 📦 Built With

- [React.js](https://reactjs.org/)
- [nspell](https://github.com/wooorm/nspell) for spelling
- Rule-based custom grammar logic (fully local)

---

## 🛡️ Privacy & Offline-Ready

- No tracking  
- No network calls  
- Works completely offline after dictionary load

---

## 🧩 To Do / Ideas

- [ ] Add grammar rules for tenses & pluralization  
- [ ] Mobile-friendly UX  
- [ ] Undo/redo support  
- [ ] Save/load documents  
- [ ] Support other languages

---

## 📜 License

MIT © [Your Name]  
Hunspell dictionaries © original authors (SCOWL / Wooorm)