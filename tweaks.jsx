/* Tweaks panel for the portfolio (applies to the static page via CSS vars) */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "b",
  "tone": "warm",
  "accent": "mono"
}/*EDITMODE-END*/;

const ACCENTS = {
  mono: "#0e0e0c",
  terracotta: "#bf4a2e",
  forest: "#1f6f57",
  cobalt: "#2b4f9e"
};

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // hero direction
  React.useEffect(() => {
    if (window.applyHero) window.applyHero(t.hero);
  }, [t.hero]);

  // paper tone
  React.useEffect(() => {
    document.body.setAttribute('data-tone', t.tone);
  }, [t.tone]);

  // accent color
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENTS[t.accent] || ACCENTS.mono);
  }, [t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Landing direction" />
      <TweakRadio
        label="Hero"
        value={t.hero}
        options={[{ value: 'a', label: 'Editorial' }, { value: 'b', label: 'Engineer' }]}
        onChange={(v) => setTweak('hero', v)}
      />
      <TweakSection label="Surface" />
      <TweakRadio
        label="Paper tone"
        value={t.tone}
        options={[{ value: 'warm', label: 'Warm' }, { value: 'cool', label: 'Cool' }, { value: 'bright', label: 'Bright' }]}
        onChange={(v) => setTweak('tone', v)}
      />
      <TweakSection label="Accent" />
      <TweakColor
        label="Accent"
        value={ACCENTS[t.accent]}
        options={[ACCENTS.mono, ACCENTS.terracotta, ACCENTS.forest, ACCENTS.cobalt]}
        onChange={(hex) => {
          const key = Object.keys(ACCENTS).find((k) => ACCENTS[k] === hex) || 'mono';
          setTweak('accent', key);
        }}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  // In bare/embed mode (used by the side-by-side comparison) the hero is
  // controlled by the URL param — don't mount Tweaks or its hero effect,
  // which would otherwise override it back to the stored default.
  if (document.body.classList.contains('bare')) return;
  const root = document.getElementById('tweaks-root');
  if (root && window.ReactDOM) {
    ReactDOM.createRoot(root).render(<PortfolioTweaks />);
  }
})();
