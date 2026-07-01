function Dashboard({
  rabbitCount,
  confidence,
  topSignals,
  recommendations,
  locationStats,
  eventTypes: eventTypesData,
  rabbits
}) {
  // Определение цвета уверенности
  const getConfidenceColor = (value) => {
    if (value >= 70) return '#4ade80';
    if (value >= 40) return '#facc15';
    return '#f87171';
  };

  // Определение иконки рекомендации
  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'action': return '🎯';
      case 'success': return '✅';
      default: return '📌';
    }
  };

  // Получение цвета статуса кролика
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'suspected': return '#eab308';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="dashboard">
      {/* Основные метрики */}
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">🐰</div>
          <div className="metric-content">
            <h3>Кроликов обнаружено</h3>
            <div className="metric-value">{rabbits.length}</div>
            <p className="metric-subtitle">по сигналам</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Уверенность системы</h3>
            <div className="metric-value" style={{ color: getConfidenceColor(confidence) }}>
              {confidence}%
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{
                  width: `${confidence}%`,
                  backgroundColor: getConfidenceColor(confidence)
                }}
              />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📍</div>
          <div className="metric-content">
            <h3>Локаций под наблюдением</h3>
            <div className="metric-value">{Object.keys(locationStats).length}</div>
            <p className="metric-subtitle">активных зон</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📡</div>
          <div className="metric-content">
            <h3>Всего сигналов</h3>
            <div className="metric-value">
              {Object.values(locationStats).reduce((sum, loc) => sum + loc.count, 0)}
            </div>
            <p className="metric-subtitle">за период</p>
          </div>
        </div>
      </div>

      {/* Обнаруженные кролики */}
      <div className="card full-width">
        <h3>🐰 Обнаруженные кролики</h3>
        <p className="card-description">Кролики, найденные по косвенным сигналам</p>
        <div className="rabbits-preview">
          {rabbits.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <p>Кролики пока не обнаружены</p>
            </div>
          ) : (
            rabbits.map(rabbit => (
              <div key={rabbit.id} className="rabbit-preview-card">
                <div className="rabbit-avatar-small">🐰</div>
                <div className="rabbit-preview-info">
                  <h4>{rabbit.name}</h4>
                  <span className="rabbit-preview-location">📍 {rabbit.location}</span>
                </div>
                <div className="rabbit-preview-meta">
                  <span
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor(rabbit.status) }}
                  />
                  <span className="confidence-value">{rabbit.confidence}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Основные сигналы и рекомендации */}
      <div className="dashboard-grid">
        {/* Топ сигналы */}
        <div className="card">
          <h3>🎯 Ключевые сигналы</h3>
          <p className="card-description">Сигналы с наибольшим влиянием на оценку</p>
          <div className="signals-list">
            {topSignals.map((signal, index) => (
              <div key={signal.id} className="signal-item">
                <div className="signal-rank">#{index + 1}</div>
                <div className="signal-info">
                  <div className="signal-type">
                    {eventTypesData[signal.event]?.icon}{' '}
                    {eventTypesData[signal.event]?.name}
                  </div>
                  <div className="signal-details">
                    {signal.location} • {signal.time}
                  </div>
                </div>
                <div className="signal-score">
                  {Math.round(signal.score * 10) / 10}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Рекомендации */}
        <div className="card">
          <h3>💡 Рекомендации</h3>
          <p className="card-description">Что предпринять на основе данных</p>
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <div key={index} className={`recommendation-item ${rec.type}`}>
                <span className="rec-icon">{getRecommendationIcon(rec.type)}</span>
                <span className="rec-text">{rec.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Карта локаций */}
      <div className="card full-width">
        <h3>🗺️ Активность по локациям</h3>
        <p className="card-description">Распределение сигналов по территории фермы</p>
        <div className="locations-grid">
          {Object.entries(locationStats).map(([location, stats]) => (
            <div key={location} className="location-card">
              <div className="location-header">
                <h4>{location}</h4>
                <span className="location-count">{stats.count} сигналов</span>
              </div>
              <div className="location-details">
                <div className="location-stat">
                  <span className="stat-label">Средняя интенсивность:</span>
                  <div className="intensity-bar">
                    <div
                      className="intensity-fill"
                      style={{ width: `${stats.avgIntensity * 10}%` }}
                    />
                  </div>
                  <span className="stat-value">{stats.avgIntensity}/10</span>
                </div>
                <div className="location-events">
                  {stats.events.map((eventType, idx) => (
                    <span key={idx} className="event-badge">
                      {eventTypesData[eventType]?.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
