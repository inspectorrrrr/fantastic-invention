// Начальные данные о кроликах (обнаруженных по косвенным сигналам)
export const initialRabbits = [
  {
    id: "rabbit_001",
    name: "Рыжик",
    location: "Огород",
    confidence: 85,
    status: "active",
    lastSeen: "08:30",
    signals: ["missing_carrot", "footprints"],
    notes: "Часто появляется у морковных грядок"
  },
  {
    id: "rabbit_002",
    name: "Тень",
    location: "Сарай",
    confidence: 72,
    status: "active",
    lastSeen: "10:20",
    signals: ["motion_sensor", "rustle_detected"],
    notes: "Предпочитает прятаться в сарае"
  },
  {
    id: "rabbit_003",
    name: "Полоска",
    location: "У забора",
    confidence: 68,
    status: "active",
    lastSeen: "09:10",
    signals: ["new_hole", "footprints"],
    notes: "Роет ямки у забора"
  },
  {
    id: "rabbit_004",
    name: "Пушистик",
    location: "Теплица",
    confidence: 45,
    status: "suspected",
    lastSeen: "11:45",
    signals: ["footprints"],
    notes: "Мало данных, но следы обнаружены"
  }
];

// Начальные данные о событиях на ферме
export const initialEvents = [
  {
    id: "evt_001",
    event: "missing_carrot",
    location: "Огород",
    count: 5,
    intensity: 4,
    time: "08:30"
  },
  {
    id: "evt_002",
    event: "new_hole",
    location: "У забора",
    count: 2,
    intensity: 7,
    time: "09:10"
  },
  {
    id: "evt_003",
    event: "motion_sensor",
    location: "Сарай",
    count: 1,
    intensity: 8,
    time: "10:05"
  },
  {
    id: "evt_004",
    event: "rustle_detected",
    location: "Сарай",
    count: 3,
    intensity: 5,
    time: "10:20"
  },
  {
    id: "evt_005",
    event: "footprints",
    location: "Теплица",
    count: 6,
    intensity: 6,
    time: "11:45"
  }
];

// Типы событий и их описания
export const eventTypes = {
  missing_carrot: {
    name: "Пропажа морковки",
    icon: "🥕",
    description: "Обнаружено исчезновение морковки с грядки"
  },
  new_hole: {
    name: "Новая ямка",
    icon: "🕳️",
    description: "Найдена свежая ямка"
  },
  motion_sensor: {
    name: "Датчик движения",
    icon: "📡",
    description: "Сработал датчик движения"
  },
  rustle_detected: {
    name: "Шуршание",
    icon: "🍃",
    description: "Обнаружено шуршание или звук"
  },
  footprints: {
    name: "Следы",
    icon: "🐾",
    description: "Обнаружены следы кроликов"
  }
};

// Локации на ферме
export const locations = [
  "Огород",
  "У забора",
  "Сарай",
  "Теплица",
  "Дом",
  "Сад"
];

// Начальные веса для типов событий (влияют на расчёт количества кроликов)
export const defaultWeights = {
  missing_carrot: 0.3,
  new_hole: 0.25,
  motion_sensor: 0.2,
  rustle_detected: 0.15,
  footprints: 0.1
};
