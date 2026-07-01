import { useState } from 'react';

function EventList({ events, eventTypes, rabbits, locations, onDelete, onEdit }) {
  const [sortBy, setSortBy] = useState('time');
  const [filterType, setFilterType] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Создаём мапу кроликов для быстрого поиска
  const rabbitsMap = {};
  rabbits.forEach(r => { rabbitsMap[r.id] = r; });

  // Сортировка событий
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === 'time') {
      return a.time.localeCompare(b.time);
    }
    if (sortBy === 'intensity') {
      return b.intensity - a.intensity;
    }
    if (sortBy === 'count') {
      return b.count - a.count;
    }
    return 0;
  });

  // Фильтрация событий
  const filteredEvents = filterType === 'all'
    ? sortedEvents
    : sortedEvents.filter(e => e.event === filterType);

  const handleEditStart = (event) => {
    setEditingId(event.id);
    setEditData({
      event: event.event,
      location: event.location,
      rabbit_id: event.rabbit_id || '',
      count: event.count,
      intensity: event.intensity,
      time: event.time
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditSave = () => {
    onEdit(editingId, {
      ...editData,
      rabbit_id: editData.rabbit_id || null,
      count: parseInt(editData.count),
      intensity: parseInt(editData.intensity)
    });
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="event-list-container">
      <div className="list-header">
        <h3>📋 Журнал событий</h3>
        <div className="list-controls">
          <div className="control-group">
            <label>Сортировка:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="time">По времени</option>
              <option value="intensity">По интенсивности</option>
              <option value="count">По количеству</option>
            </select>
          </div>
          <div className="control-group">
            <label>Фильтр:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Все типы</option>
              {Object.entries(eventTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.icon} {value.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="events-table">
        <div className="table-header">
          <div className="col-type">Тип</div>
          <div className="col-rabbit">Кролик</div>
          <div className="col-location">Локация</div>
          <div className="col-time">Время</div>
          <div className="col-intensity">Интенсивность</div>
          <div className="col-actions">Действия</div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <p>Событий не найдено</p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isEditing = editingId === event.id;
            const rabbit = event.rabbit_id ? rabbitsMap[event.rabbit_id] : null;

            if (isEditing) {
              return (
                <div key={event.id} className="table-row editing">
                  <div className="col-type">
                    <select
                      value={editData.event}
                      onChange={(e) => handleEditChange('event', e.target.value)}
                      className="edit-select"
                    >
                      {Object.entries(eventTypes).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.icon} {value.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-rabbit">
                    <select
                      value={editData.rabbit_id}
                      onChange={(e) => handleEditChange('rabbit_id', e.target.value)}
                      className="edit-select"
                    >
                      <option value="">—</option>
                      {rabbits.map(r => (
                        <option key={r.id} value={r.id}>🐰 {r.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-location">
                    <select
                      value={editData.location}
                      onChange={(e) => handleEditChange('location', e.target.value)}
                      className="edit-select"
                    >
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-time">
                    <input
                      type="time"
                      value={editData.time}
                      onChange={(e) => handleEditChange('time', e.target.value)}
                      className="edit-input"
                    />
                  </div>
                  <div className="col-intensity">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={editData.intensity}
                      onChange={(e) => handleEditChange('intensity', e.target.value)}
                      className="edit-range"
                    />
                    <span>{editData.intensity}/10</span>
                  </div>
                  <div className="col-actions">
                    <button className="btn-save" onClick={handleEditSave} title="Сохранить">
                      ✅
                    </button>
                    <button className="btn-cancel-edit" onClick={handleEditCancel} title="Отмена">
                      ✕
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={event.id} className="table-row">
                <div className="col-type">
                  <span className="event-icon">
                    {eventTypes[event.event]?.icon}
                  </span>
                  <span className="event-name">
                    {eventTypes[event.event]?.name}
                  </span>
                </div>
                <div className="col-rabbit">
                  {rabbit ? (
                    <span className="rabbit-link">🐰 {rabbit.name}</span>
                  ) : (
                    <span className="rabbit-none">—</span>
                  )}
                </div>
                <div className="col-location">{event.location}</div>
                <div className="col-time">{event.time}</div>
                <div className="col-intensity">
                  <div className="intensity-indicator">
                    <div
                      className="intensity-fill"
                      style={{ width: `${event.intensity * 10}%` }}
                    />
                  </div>
                  <span>{event.intensity}/10</span>
                </div>
                <div className="col-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditStart(event)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(event.id)}
                    title="Удалить событие"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="list-footer">
        <p>Показано {filteredEvents.length} из {events.length} событий</p>
      </div>
    </div>
  );
}

export default EventList;
