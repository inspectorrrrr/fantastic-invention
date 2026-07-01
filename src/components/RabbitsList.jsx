import { useState } from 'react';

function RabbitsList({ rabbits, onAdd, onDelete, onStatusChange, locations }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newRabbit, setNewRabbit] = useState({
    name: '',
    location: locations[0],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newRabbit.name.trim()) {
      alert('Введите кличку кролика');
      return;
    }

    onAdd({
      ...newRabbit,
      confidence: 50,
      status: 'suspected',
      lastSeen: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      signals: []
    });

    setNewRabbit({ name: '', location: locations[0], notes: '' });
    setIsAdding(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'suspected': return '#eab308';
      case 'inactive': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'suspected': return 'Подозревается';
      case 'inactive': return 'Неактивен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="rabbits-container">
      <div className="rabbits-header">
        <h3>🐰 Обнаруженные кролики</h3>
        <p className="card-description">
          Кролики, обнаруженные по косвенным сигналам
        </p>
        <button
          className="btn-add-rabbit"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? '✕ Отмена' : '➕ Добавить кролика'}
        </button>
      </div>

      {isAdding && (
        <form className="add-rabbit-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Кличка</label>
              <input
                type="text"
                placeholder="Введите кличку кролика"
                value={newRabbit.name}
                onChange={(e) => setNewRabbit(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Локация</label>
              <select
                value={newRabbit.location}
                onChange={(e) => setNewRabbit(prev => ({ ...prev, location: e.target.value }))}
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Заметки</label>
            <input
              type="text"
              placeholder="Описание или особенности"
              value={newRabbit.notes}
              onChange={(e) => setNewRabbit(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn-submit-rabbit">
            Добавить
          </button>
        </form>
      )}

      <div className="rabbits-grid">
        {rabbits.length === 0 ? (
          <div className="empty-rabbits">
            <span className="empty-icon">🔍</span>
            <p>Кролики пока не обнаружены</p>
            <p className="empty-hint">Добавьте наблюдения, чтобы обнаружить кроликов</p>
          </div>
        ) : (
          rabbits.map(rabbit => (
            <div key={rabbit.id} className="rabbit-card">
              <div className="rabbit-header">
                <div className="rabbit-avatar">
                  <span className="rabbit-emoji">🐰</span>
                </div>
                <div className="rabbit-info">
                  <h4>{rabbit.name}</h4>
                  <span className="rabbit-location">📍 {rabbit.location}</span>
                </div>
                <button
                  className="btn-delete-rabbit"
                  onClick={() => onDelete(rabbit.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>

              <div className="rabbit-details">
                <div className="rabbit-stat">
                  <span className="stat-label">Статус:</span>
                  <select
                    className="status-select"
                    style={{ backgroundColor: getStatusColor(rabbit.status) }}
                    value={rabbit.status}
                    onChange={(e) => onStatusChange(rabbit.id, e.target.value)}
                  >
                    <option value="active">Активен</option>
                    <option value="suspected">Подозревается</option>
                    <option value="inactive">Неактивен</option>
                  </select>
                </div>

                <div className="rabbit-stat">
                  <span className="stat-label">Уверенность:</span>
                  <div className="confidence-mini">
                    <div
                      className="confidence-fill"
                      style={{ width: `${rabbit.confidence}%` }}
                    />
                  </div>
                  <span className="stat-value">{rabbit.confidence}%</span>
                </div>

                <div className="rabbit-stat">
                  <span className="stat-label">Последний раз:</span>
                  <span className="stat-value">{rabbit.lastSeen}</span>
                </div>

                {rabbit.signals.length > 0 && (
                  <div className="rabbit-signals">
                    <span className="stat-label">Сигналы:</span>
                    <div className="signal-tags">
                      {rabbit.signals.map(signal => (
                        <span key={signal} className="signal-tag">
                          {signal === 'missing_carrot' && '🥕'}
                          {signal === 'new_hole' && '🕳️'}
                          {signal === 'motion_sensor' && '📡'}
                          {signal === 'rustle_detected' && '🍃'}
                          {signal === 'footprints' && '🐾'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {rabbit.notes && (
                  <div className="rabbit-notes">
                    <span className="stat-label">Заметки:</span>
                    <p>{rabbit.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RabbitsList;
