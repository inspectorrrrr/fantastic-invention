function Analytics({ events, locationStats, eventTypes }) {
  // Статистика по типам событий
  const eventTypeStats = {};
  events.forEach(event => {
    if (!eventTypeStats[event.event]) {
      eventTypeStats[event.event] = {
        count: 0,
        totalIntensity: 0,
        totalCount: 0
      };
    }
    eventTypeStats[event.event].count += 1;
    eventTypeStats[event.event].totalIntensity += event.intensity;
    eventTypeStats[event.event].totalCount += event.count;
  });

  // Средняя интенсивность по типам
  const avgIntensityByType = Object.entries(eventTypeStats).map(([type, stats]) => ({
    type,
    name: eventTypes[type]?.name,
    icon: eventTypes[type]?.icon,
    avgIntensity: Math.round(stats.totalIntensity / stats.count),
    totalCount: stats.totalCount,
    eventCount: stats.count
  }));

  // Сортировка по средней интенсивности
  avgIntensityByType.sort((a, b) => b.avgIntensity - a.avgIntensity);

  // Временная шкала (сортируем события по времени)
  const timeline = [...events]
    .sort((a, b) => a.time.localeCompare(b.time))
    .map(event => ({
      ...event,
      typeInfo: eventTypes[event.event]
    }));

  // Общая статистика
  const totalEvents = events.length;
  const totalIntensity = events.reduce((sum, e) => sum + e.intensity, 0);
  const avgIntensity = Math.round(totalIntensity / totalEvents);
  const maxIntensity = Math.max(...events.map(e => e.intensity));
  const mostActiveLocation = Object.entries(locationStats)
    .sort((a, b) => b[1].count - a[1].count)[0];

  return (
    <div className="analytics">
      {/* Сводная статистика */}
      <div className="stats-summary">
        <div className="stat-card">
          <h4>Всего событий</h4>
          <div className="stat-value">{totalEvents}</div>
        </div>
        <div className="stat-card">
          <h4>Средняя интенсивность</h4>
          <div className="stat-value">{avgIntensity}/10</div>
        </div>
        <div className="stat-card">
          <h4>Макс. интенсивность</h4>
          <div className="stat-value">{maxIntensity}/10</div>
        </div>
        <div className="stat-card">
          <h4>Самая активная локация</h4>
          <div className="stat-value small">{mostActiveLocation?.[0]}</div>
          <div className="stat-subtitle">{mostActiveLocation?.[1].count} событий</div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Аналитика по типам событий */}
        <div className="card">
          <h3>📊 Анализ по типам сигналов</h3>
          <p className="card-description">Какие типы событий встречаются чаще и интенсивнее</p>
          <div className="type-analysis">
            {avgIntensityByType.map((item) => (
              <div key={item.type} className="type-item">
                <div className="type-header">
                  <span className="type-icon">{item.icon}</span>
                  <span className="type-name">{item.name}</span>
                </div>
                <div className="type-stats">
                  <div className="type-stat">
                    <span className="stat-label">Событий:</span>
                    <span className="stat-value">{item.eventCount}</span>
                  </div>
                  <div className="type-stat">
                    <span className="stat-label">Всего наблюдений:</span>
                    <span className="stat-value">{item.totalCount}</span>
                  </div>
                  <div className="type-stat">
                    <span className="stat-label">Средняя интенсивность:</span>
                    <div className="intensity-bar">
                      <div
                        className="intensity-fill"
                        style={{ width: `${item.avgIntensity * 10}%` }}
                      />
                    </div>
                    <span className="stat-value">{item.avgIntensity}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Временная шкала */}
        <div className="card">
          <h3>⏱️ Временная шкала</h3>
          <p className="card-description">Хронология событий за период</p>
          <div className="timeline">
            {timeline.map((event, index) => (
              <div key={event.id} className="timeline-item">
                <div className="timeline-time">{event.time}</div>
                <div className="timeline-connector">
                  <div className="timeline-dot" />
                  {index < timeline.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-icon">{event.typeInfo?.icon}</span>
                    <span className="timeline-title">{event.typeInfo?.name}</span>
                  </div>
                  <div className="timeline-details">
                    <span>📍 {event.location}</span>
                    <span>📊 Интенсивность: {event.intensity}/10</span>
                    <span>🔢 Количество: {event.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Карта активности по локациям */}
      <div className="card full-width">
        <h3>🗺️ Детальная карта локаций</h3>
        <p className="card-description">Подробная статистика по каждой локации</p>
        <div className="detailed-locations">
          {Object.entries(locationStats).map(([location, stats]) => (
            <div key={location} className="detailed-location">
              <div className="location-header">
                <h4>{location}</h4>
                <div className="location-badges">
                  <span className="badge">{stats.count} событий</span>
                  <span className="badge">Ср. интенсивность: {stats.avgIntensity}/10</span>
                </div>
              </div>
              <div className="location-breakdown">
                {Object.entries(
                  stats.events.reduce((acc, type) => {
                    acc[type] = (acc[type] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([type, count]) => (
                  <div key={type} className="breakdown-item">
                    <span className="breakdown-icon">{eventTypes[type]?.icon}</span>
                    <span className="breakdown-name">{eventTypes[type]?.name}</span>
                    <span className="breakdown-count">×{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
