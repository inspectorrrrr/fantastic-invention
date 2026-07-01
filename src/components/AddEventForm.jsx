import { useState } from 'react';

function AddEventForm({ eventTypes, locations, rabbits, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    event: Object.keys(eventTypes)[0],
    location: locations[0],
    rabbit_id: '',
    count: 1,
    intensity: 5,
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      rabbit_id: formData.rabbit_id || null,
      count: parseInt(formData.count),
      intensity: parseInt(formData.intensity)
    });
    // Сброс формы
    setFormData({
      event: Object.keys(eventTypes)[0],
      location: locations[0],
      rabbit_id: '',
      count: 1,
      intensity: 5,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    });
    setIsOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="add-event-container">
      {!isOpen ? (
        <button className="btn-add" onClick={() => setIsOpen(true)}>
          ➕ Добавить событие
        </button>
      ) : (
        <div className="add-event-form">
          <div className="form-header">
            <h3>Новое событие</h3>
            <button className="btn-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="event-type">Тип события</label>
                <select
                  id="event-type"
                  value={formData.event}
                  onChange={(e) => handleChange('event', e.target.value)}
                >
                  {Object.entries(eventTypes).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.icon} {value.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rabbit">Кролик</label>
                <select
                  id="rabbit"
                  value={formData.rabbit_id}
                  onChange={(e) => handleChange('rabbit_id', e.target.value)}
                >
                  <option value="">Не привязан</option>
                  {rabbits.map((rabbit) => (
                    <option key={rabbit.id} value={rabbit.id}>
                      🐰 {rabbit.name} ({rabbit.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Локация</label>
                <select
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="count">Количество</label>
                <input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.count}
                  onChange={(e) => handleChange('count', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="intensity">Интенсивность (1-10)</label>
                <div className="intensity-input">
                  <input
                    id="intensity"
                    type="range"
                    min="1"
                    max="10"
                    value={formData.intensity}
                    onChange={(e) => handleChange('intensity', e.target.value)}
                  />
                  <span className="intensity-value">{formData.intensity}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="time">Время</label>
                <input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setIsOpen(false)}>
                Отмена
              </button>
              <button type="submit" className="btn-submit">
                Добавить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddEventForm;
