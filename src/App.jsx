import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { initialEvents, initialRabbits, eventTypes, locations, defaultWeights } from './data/initialData';
import {
  calculateRabbitCount,
  calculateConfidence,
  getTopSignals,
  generateRecommendations,
  getLocationStats
} from './utils/calculator';

// Компоненты
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import AIWorklog from './components/AIWorklog';
import RabbitsList from './components/RabbitsList';
import ThemeToggle from './components/ThemeToggle';

// Хелперы для localStorage
function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  // Состояние событий
  const [events, setEvents] = useState(() => loadFromStorage('rf_events', initialEvents));

  // Состояние кроликов
  const [rabbits, setRabbits] = useState(() => loadFromStorage('rf_rabbits', initialRabbits));

  // Состояние весов
  const [weights, setWeights] = useState(() => loadFromStorage('rf_weights', defaultWeights));

  // Тема
  const [theme, setTheme] = useState(() => loadFromStorage('rf_theme', 'light'));

  useEffect(() => {
    localStorage.setItem('rf_theme', JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Сохраняем изменения в localStorage
  useEffect(() => {
    localStorage.setItem('rf_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('rf_rabbits', JSON.stringify(rabbits));
  }, [rabbits]);

  useEffect(() => {
    localStorage.setItem('rf_weights', JSON.stringify(weights));
  }, [weights]);

  // Активная вкладка
  const [activeTab, setActiveTab] = useState('dashboard');

  // Расчёт метрик
  const rabbitCount = useMemo(
    () => calculateRabbitCount(events, weights),
    [events, weights]
  );

  const confidence = useMemo(
    () => calculateConfidence(events, weights),
    [events, weights]
  );

  const topSignals = useMemo(
    () => getTopSignals(events, weights),
    [events, weights]
  );

  const recommendations = useMemo(
    () => generateRecommendations(events, rabbitCount, confidence),
    [events, rabbitCount, confidence]
  );

  const locationStats = useMemo(
    () => getLocationStats(events),
    [events]
  );

  // Обработчики событий
  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, {
      ...newEvent,
      id: `evt_${String(prev.length + 1).padStart(3, '0')}`
    }]);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const handleEditEvent = (eventId, updatedData) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, ...updatedData } : e
    ));
  };

  // Обработчики кроликов
  const handleAddRabbit = (newRabbit) => {
    setRabbits(prev => [...prev, {
      ...newRabbit,
      id: `rabbit_${String(prev.length + 1).padStart(3, '0')}`
    }]);
  };

  const handleDeleteRabbit = (rabbitId) => {
    setRabbits(prev => prev.filter(r => r.id !== rabbitId));
  };

  const handleRabbitStatusChange = (rabbitId, newStatus) => {
    setRabbits(prev => prev.map(r =>
      r.id === rabbitId ? { ...r, status: newStatus } : r
    ));
  };

  // Обработчики настроек
  const handleUpdateWeights = (newWeights) => {
    setWeights(newWeights);
  };

  const handleResetData = () => {
    localStorage.removeItem('rf_events');
    localStorage.removeItem('rf_rabbits');
    localStorage.removeItem('rf_weights');
    setEvents(initialEvents);
    setRabbits(initialRabbits);
    setWeights(defaultWeights);
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      {/* Заголовок */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <div>
              <h1>🐰 Ферма невидимых кроликов</h1>
              <p className="subtitle">Система обнаружения по косвенным сигналам</p>
            </div>
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </div>
        </div>
      </header>

      {/* Навигация */}
      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Обзор
        </button>
        <button
          className={`nav-btn ${activeTab === 'rabbits' ? 'active' : ''}`}
          onClick={() => setActiveTab('rabbits')}
        >
          🐰 Кролики
        </button>
        <button
          className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          📋 События
        </button>
        <button
          className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Аналитика
        </button>
        <button
          className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Настройки
        </button>
        <button
          className={`nav-btn ${activeTab === 'worklog' ? 'active' : ''}`}
          onClick={() => setActiveTab('worklog')}
        >
          🤖 AI Worklog
        </button>
      </nav>

      {/* Основной контент */}
      <main className="app-main">
        {activeTab === 'dashboard' && (
          <Dashboard
            rabbitCount={rabbitCount}
            confidence={confidence}
            topSignals={topSignals}
            recommendations={recommendations}
            locationStats={locationStats}
            eventTypes={eventTypes}
            rabbits={rabbits}
          />
        )}

        {activeTab === 'rabbits' && (
          <RabbitsList
            rabbits={rabbits}
            onAdd={handleAddRabbit}
            onDelete={handleDeleteRabbit}
            onStatusChange={handleRabbitStatusChange}
            locations={locations}
          />
        )}

        {activeTab === 'events' && (
          <div className="events-container">
            <AddEventForm
              eventTypes={eventTypes}
              locations={locations}
              rabbits={rabbits}
              onAdd={handleAddEvent}
            />
            <EventList
              events={events}
              eventTypes={eventTypes}
              rabbits={rabbits}
              locations={locations}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <Analytics
            events={events}
            locationStats={locationStats}
            eventTypes={eventTypes}
          />
        )}

        {activeTab === 'settings' && (
          <Settings
            weights={weights}
            eventTypes={eventTypes}
            onUpdate={handleUpdateWeights}
            onReset={handleResetData}
          />
        )}

        {activeTab === 'worklog' && (
          <AIWorklog />
        )}
      </main>

      {/* Футер */}
      <footer className="app-footer">
        <p>Ферма невидимых кроликов © 2026 | Тестовое задание AI-first Developer</p>
      </footer>
    </div>
  );
}

export default App;
