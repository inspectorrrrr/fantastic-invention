// Расчёт предполагаемого количества кроликов
export function calculateRabbitCount(events, weights) {
  if (events.length === 0) return 0;

  let totalScore = 0;

  events.forEach(event => {
    const weight = weights[event.event] || 0.1;
    // Формула: count * intensity * weight
    // count - сколько раз произошло
    // intensity - интенсивность (1-10)
    // weight - вес типа события
    totalScore += event.count * event.intensity * weight;
  });

  // Нормализация: каждые 10 единиц скора = ~1 кролик
  // Это эвристика, которую можно настроить
  const rabbits = Math.round(totalScore / 10);

  return Math.max(1, rabbits); // Минимум 1 кролик, если есть события
}

// Расчёт уверенности в оценке (0-100%)
export function calculateConfidence(events, weights) {
  if (events.length === 0) return 0;

  let confidence = 0;

  // 1. Количество разных типов событий (больше типов = выше уверенность)
  const uniqueTypes = new Set(events.map(e => e.event)).size;
  const typeScore = Math.min(uniqueTypes * 15, 40); // Макс 40%

  // 2. Количество разных локаций
  const uniqueLocations = new Set(events.map(e => e.location)).size;
  const locationScore = Math.min(uniqueLocations * 10, 30); // Макс 30%

  // 3. Общее количество событий
  const eventCountScore = Math.min(events.length * 5, 20); // Макс 20%

  // 4. Средняя интенсивность
  const avgIntensity = events.reduce((sum, e) => sum + e.intensity, 0) / events.length;
  const intensityScore = Math.min(avgIntensity * 2, 10); // Макс 10%

  confidence = typeScore + locationScore + eventCountScore + intensityScore;

  return Math.min(Math.round(confidence), 100);
}

// Определение самых влиятельных сигналов
export function getTopSignals(events, weights, limit = 3) {
  const scored = events.map(event => ({
    ...event,
    score: event.count * event.intensity * (weights[event.event] || 0.1)
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// Генерация рекомендаций на основе данных
export function generateRecommendations(events, rabbitCount, confidence) {
  const recommendations = [];

  // Анализ по типам событий
  const eventCounts = {};
  events.forEach(e => {
    eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
  });

  if (eventCounts.missing_carrot > 0) {
    recommendations.push({
      type: "warning",
      text: `Обнаружено ${eventCounts.missing_carrot} случаев пропажи морковки. Рекомендуется установить ловушки у грядок.`
    });
  }

  if (eventCounts.new_hole > 0) {
    recommendations.push({
      type: "info",
      text: `Найдено ${eventCounts.new_hole} новых ямок. Проверьте периметр и заделайте ямки.`
    });
  }

  if (eventCounts.motion_sensor > 0) {
    recommendations.push({
      type: "action",
      text: `Датчики движения сработали ${eventCounts.motion_sensor} раз. Установите камеру для наблюдения.`
    });
  }

  if (eventCounts.footprints > 0) {
    recommendations.push({
      type: "info",
      text: `Обнаружены следы в ${eventCounts.footprints} местах. Определите маршруты перемещения.`
    });
  }

  // Общие рекомендации
  if (rabbitCount > 5) {
    recommendations.push({
      type: "warning",
      text: `Высокая активность кроликов (${rabbitCount} шт.). Рассмотрите профессиональную помощь.`
    });
  }

  if (confidence < 50) {
    recommendations.push({
      type: "info",
      text: "Низкая уверенность в оценке. Добавьте больше наблюдений для точного подсчёта."
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      type: "success",
      text: "Активность кроликов низкая. Продолжайте наблюдение."
    });
  }

  return recommendations;
}

// Аналитика по локациям
export function getLocationStats(events) {
  const stats = {};

  events.forEach(event => {
    if (!stats[event.location]) {
      stats[event.location] = {
        count: 0,
        totalIntensity: 0,
        events: []
      };
    }

    stats[event.location].count += 1;
    stats[event.location].totalIntensity += event.intensity;
    stats[event.location].events.push(event.event);
  });

  // Добавляем среднюю интенсивность
  Object.keys(stats).forEach(location => {
    stats[location].avgIntensity = Math.round(
      stats[location].totalIntensity / stats[location].count
    );
  });

  return stats;
}
