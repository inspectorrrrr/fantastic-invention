function AIWorklog() {
  const checkpoints = [
    {
      id: 1,
      title: "Формулировка задачи для AI",
      icon: "🎯",
      description: "Первый промпт",
      content: `Попросил AI создать интерактивное приложение "Ферма невидимых кроликов" на React + Vite.

Задача: Сделать дашборд для фермера, который получает косвенные сигналы о присутствии невидимых кроликов (пропажа морковки, новые ямки, сработавшие датчики). Система должна оценивать количество кроликов и давать рекомендации.

Ключевые требования из ТЗ:
- Стартовые данные из JSON
- Интерактивность: добавление/редактирование событий
- Настройка параметров расчёта
- Раздел AI Worklog`,
      aiResponse: "AI предложил структуру: Dashboard, EventList, AddEventForm, Analytics, Settings. Выбрал React hooks (useState, useMemo) для управления состоянием и оптимизации пересчётов.",
      myDecision: "Принял предложенную структуру, но решил добавить отдельный компонент AIWorklog вместо встраивания в Settings."
    },
    {
      id: 2,
      title: "Проектирование архитектуры",
      icon: "🏗️",
      description: "Структура приложения",
      content: `Попросил AI помочь спроектировать:
1. Архитектуру компонентов
2. Структуру данных
3. Логику расчёта кроликов
4. Систему весов для типов событий`,
      aiResponse: `AI предложил:
- Централизованное состояние в App.jsx
- useMemo для мемоизации расчётов
- Отдельные утилиты для бизнес-логики (calculator.js)
- Систему весов с настраиваемыми коэффициентами
- Формулу: rabbits = Σ(count × intensity × weight) / 10`,
      myDecision: "Принял архитектуру. Решил нормализовать веса в UI для удобства восприятия, хотя в расчёте используются абсолютные значения."
    },
    {
      id: 3,
      title: "Разработка бизнес-логики",
      icon: "⚙️",
      description: "Алгоритмы расчёта",
      content: `Задача для AI: Написать функции расчёта:
1. calculateRabbitCount - количество кроликов
2. calculateConfidence - уверенность системы (0-100%)
3. getTopSignals - самые влиятельные сигналы
4. generateRecommendations - рекомендации для фермера
5. getLocationStats - статистика по локациям`,
      aiResponse: `AI написал модуль calculator.js с 5 функциями.

Для уверенности предложил формулу из 4 факторов:
- Разнообразие типов событий (до 40%)
- Количество локаций (до 30%)
- Общее количество событий (до 20%)
- Средняя интенсивность (до 10%)`,
      myDecision: "Принял логику. Добавил min(1, rabbits) чтобы избежать нулевого значения при наличии событий. Проверил граничные случаи."
    },
    {
      id: 4,
      title: "Разработка UI компонентов",
      icon: "🎨",
      description: "Создание интерфейса",
      content: `Задача: Создать 6 компонентов:
1. Dashboard - главная с метриками
2. EventList - таблица событий с сортировкой/фильтрацией
3. AddEventForm - форма добавления
4. Analytics - аналитика и временная шкала
5. Settings - настройка весов
6. AI Worklog - этот раздел`,
      aiResponse: `AI создал все компоненты с использованием:
- CSS Grid и Flexbox для верстки
- Semantic HTML для доступности
- Иконки-эмодзи для визуализации
- Адаптивный дизайн`,
      myDecision: "Попросил AI улучшить визуал: добавил цветовую индикацию уверенности (зелёный/жёлтый/красный), hover-эффекты, плавные анимации. Добавил валидацию формы."
    },
    {
      id: 5,
      title: "Доработка UX/UI",
      icon: "✨",
      description: "Улучшения интерфейса",
      content: `После первичной реализации попросил AI:
1. Улучшить навигацию (добавить иконки к вкладкам)
2. Добавить подсказки и описания
3. Сделать таблицу событий более читаемой
4. Добавить визуализацию интенсивности (progress bars)`,
      aiResponse: `AI доработал:
- Навигацию с эмодзи-иконками
- Описания для каждого раздела
- Полоски интенсивности с цветовой кодировкой
- Адаптивную сетку карточек
- Пустые состояния для списков`,
      myDecision: "Проверил на мобильных размерах. Попросил добавить тултипы для кнопки удаления и подтверждение действия."
    },
    {
      id: 6,
      title: "Поиск и исправление ошибок",
      icon: "🐛",
      description: "Тестирование и отладка",
      content: `Провёл тестирование:
1. Добавление нового события
2. Удаление событий
3. Изменение весов в настройках
4. Проверка пересчёта метрик
5. Проверка граничных случаев (0 событий, max интенсивность)`,
      aiResponse: `AI помог найти и исправить:
- Проблему с нормализацией весов при сумме ≠ 1
- Отсутствие валидации в форме (пустые поля)
- Некорректное отображение при 0 событий
- Проблему с обновлением времени в форме`,
      myDecision: "Добавил проверки в calculator.js, валидацию в AddEventForm, обработку пустых состояний во всех компонентах."
    },
    {
      id: 7,
      title: "Финальная проверка и полировка",
      icon: "🚀",
      description: "Подготовка к сдаче",
      content: `Финальные задачи:
1. Проверить все сценарии использования
2. Убедиться, что AI Worklog заполнен
3. Проверить README
4. Убедиться в работоспособности деплоя`,
      aiResponse: `AI помог:
- Составить README с инструкциями
- Проверить консистентность UI
- Добавить футер с копирайтом
- Оптимизировать производительность (useMemo)`,
      myDecision: "Провёл финальное ручное тестирование всех функций. Убедился, что интерфейс интуитивно понятен и все расчёты прозрачны."
    }
  ];

  return (
    <div className="ai-worklog">
      <div className="worklog-header">
        <h2>🤖 AI Worklog</h2>
        <p className="worklog-description">
          Как я работал с AI над проектом "Ферма невидимых кроликов".
          7 ключевых чекпоинтов, показывающих процесс разработки.
        </p>
      </div>

      <div className="worklog-timeline">
        {checkpoints.map((checkpoint, index) => (
          <div key={checkpoint.id} className="worklog-item">
            <div className="worklog-connector">
              <div className="worklog-dot">
                <span>{checkpoint.icon}</span>
              </div>
              {index < checkpoints.length - 1 && <div className="worklog-line" />}
            </div>

            <div className="worklog-content">
              <div className="worklog-header-item">
                <h3>{checkpoint.title}</h3>
                <span className="worklog-badge">{checkpoint.description}</span>
              </div>

              <div className="worklog-section">
                <h4>📝 Задача для AI:</h4>
                <pre className="worklog-code">{checkpoint.content}</pre>
              </div>

              <div className="worklog-section">
                <h4>🤖 Ответ AI:</h4>
                <pre className="worklog-code ai-response">{checkpoint.aiResponse}</pre>
              </div>

              <div className="worklog-section">
                <h4>✅ Моё решение:</h4>
                <pre className="worklog-code my-decision">{checkpoint.myDecision}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="worklog-summary">
        <h3>📊 Итоги работы с AI</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-icon">⏱️</div>
            <div className="summary-content">
              <h4>Время разработки</h4>
              <p>~3-4 часа активной работы</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">🔄</div>
            <div className="summary-content">
              <h4>Итераций с AI</h4>
              <p>7 основных чекпоинтов + множество уточнений</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">💡</div>
            <div className="summary-content">
              <h4>Ключевые решения</h4>
              <p>Архитектура, формулы расчёта, UX/UI</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">🎯</div>
            <div className="summary-content">
              <h4>Роль AI</h4>
              <p>Генерация кода, дизайн, отладка, документация</p>
            </div>
          </div>
        </div>

        <div className="lessons-learned">
          <h4>📚 Чему научился:</h4>
          <ul>
            <li>AI эффективен для генерации boilerplate кода и UI компонентов</li>
            <li>Важно проверять логику расчётов вручную</li>
            <li>Итеративный подход с AI быстрее, чем написание с нуля</li>
            <li>AI помогает с документацией и тест-кейсами</li>
            <li>Критически важно проверять результат и вносить корректировки</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AIWorklog;
