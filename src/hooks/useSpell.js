// src/hooks/useSpell.js
import { useEffect, useState } from "react";
import nspell from "nspell";

export const useSpell = (lang = "en") => {
  const [spell, setSpell] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      const aff = await fetch(`/index.aff`).then((res) => res.text());
      const dic = await fetch(`/index.dic`).then((res) => res.text());
      const spellChecker = nspell(aff, dic);
      setSpell(spellChecker);
    };
    loadDictionary();
  }, [lang]);

  return spell;
};
