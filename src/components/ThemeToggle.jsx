function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
      aria-label="Переключить тему"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
