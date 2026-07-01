import { useState } from 'react';

function Settings({ weights, eventTypes, onUpdate, onReset }) {
  const [localWeights, setLocalWeights] = useState({ ...weights });
  const [hasChanges, setHasChanges] = useState(false);

  const handleWeightChange = (eventType, value) => {
    setLocalWeights(prev => ({
      ...prev,
      [eventType]: parseFloat(value)
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(localWeights);
    setHasChanges(false);
  };

  const handleReset = () => {
    onReset();
    setLocalWeights({ ...weights });
    setHasChanges(false);
  };

  // Нормализация весов для отображения в процентах
  const totalWeight = Object.values(localWeights).reduce((sum, w) => sum + w, 0);
  const normalizedWeights = Object.entries(localWeights).map(([type, weight]) => ({
    type,
    weight,
    percentage: Math.round((weight / totalWeight) * 100)
  }));

  return (
    <div className="settings">
      <div className="settings-header">
        <h3>⚙️ Настройки системы</h3>
        <p className="settings-description">
          Настройте веса для разных типов сигналов. Эти параметры влияют на расчёт
          количества кроликов и уверенность системы.
        </p>
      </div>

      <div className="settings-grid">
        {/* Настройка весов */}
        <div className="card">
          <h4>⚖️ Веса типов сигналов</h4>
          <p className="card-description">
            Регулируйте, насколько каждый тип события влияет на общую оценку
          </p>

          <div className="weights-list">
            {normalizedWeights.map(({ type, weight, percentage }) => (
              <div key={type} className="weight-item">
                <div className="weight-header">
                  <span className="weight-icon">{eventTypes[type]?.icon}</span>
                  <span className="weight-name">{eventTypes[type]?.name}</span>
                  <span className="weight-percentage">{percentage}%</span>
                </div>
                <div className="weight-control">
                  <input
                    type="range"
                    min="0.05"
                    max="0.5"
                    step="0.05"
                    value={weight}
                    onChange={(e) => handleWeightChange(type, e.target.value)}
                  />
                  <span className="weight-value">{weight}</span>
                </div>
                <div className="weight-bar">
                  <div
                    className="weight-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="weights-summary">
            <p>Суммарный вес: {totalWeight.toFixed(2)}</p>
            <p className="hint">
              Веса автоматически нормализуются при расчёте. Текущее распределение показано в процентах.
            </p>
          </div>
        </div>

        {/* Информация о системе */}
        <div className="card">
          <h4>📖 О системе расчёта</h4>
          <p className="card-description">Как работает алгоритм обнаружения кроликов</p>

          <div className="info-section">
            <h5>Формула расчёта количества кроликов:</h5>
            <div className="formula">
              <code>
                rabbits = Σ (count × intensity × weight) / 10
              </code>
            </div>
            <ul className="formula-explanation">
              <li><strong>count</strong> — сколько раз произошло событие</li>
              <li><strong>intensity</strong> — интенсивность события (1-10)</li>
              <li><strong>weight</strong> — вес типа события (настраивается здесь)</li>
            </ul>
          </div>

          <div className="info-section">
            <h5>Факторы уверенности:</h5>
            <ul className="confidence-factors">
              <li>🎯 Разнообразие типов событий (до 40%)</li>
              <li>📍 Количество локаций (до 30%)</li>
              <li>📊 Общее количество событий (до 20%)</li>
              <li>💪 Средняя интенсивность (до 10%)</li>
            </ul>
          </div>

          <div className="info-section">
            <h5>Рекомендации по настройке:</h5>
            <ul className="recommendations-info">
              <li>Увеличьте вес для более надёжных сигналов (датчики, следы)</li>
              <li>Уменьшите вес для субъективных сигналов (шуршание)</li>
              <li>Экспериментируйте и наблюдайте, как меняется оценка</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Действия */}
      <div className="settings-actions">
        {hasChanges && (
          <div className="changes-warning">
            ⚠️ У вас есть несохранённые изменения
          </div>
        )}
        <div className="actions-buttons">
          <button className="btn-secondary" onClick={handleReset}>
            🔄 Сбросить всё
          </button>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            💾 Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
