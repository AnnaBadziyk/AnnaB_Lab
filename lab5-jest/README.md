# Лабораторна робота №5: Selenium WebDriver

## Опис проекту

Цей проект містить автоматизовані тести для веб-сайту Wikipedia з використанням Selenium WebDriver та Jest.

## Структура проекту

```
selenium-webdriver-lab5/
│
├── package.json          # Конфігурація проекту та залежності
├── task2.test.js         # Завдання 2: Базовий тест для Wikipedia
├── task3.test.js         # Завдання 3: Інтерактивні дії
├── task4.test.js         # Завдання 4: Різні способи доступу до елементів
├── task5.test.js         # Завдання 5: Додаткові дії та перевірки
└── README.md            # Документація проекту
```

## Вимоги

- **Node.js** версії 14 або вище
- **npm** (встановлюється разом з Node.js)
- **Google Chrome** браузер (або інший браузер з відповідним WebDriver)
- **ChromeDriver** (буде встановлено автоматично з selenium-webdriver)

## Встановлення

### 1. Ініціалізація проекту

```bash
# Перейдіть у директорію проекту
cd selenium-webdriver-lab5

# Встановіть залежності
npm install
```

### 2. Встановлення драйверу браузера

Selenium WebDriver автоматично завантажить потрібний драйвер для Chrome. Якщо ви хочете використовувати інший браузер:

**Для Firefox:**
```bash
npm install geckodriver --save-dev
```

**Для Edge:**
```bash
npm install edgedriver --save-dev
```

## Запуск тестів

### Запуск всіх тестів
```bash
npm test
```

### Запуск конкретного тесту
```bash
# Завдання 2
npm test task2.test.js

# Завдання 3
npm test task3.test.js

# Завдання 4
npm test task4.test.js

# Завдання 5
npm test task5.test.js
```

### Запуск тестів у режимі watch (автоматичний перезапуск при змінах)
```bash
npm run test:watch
```

### Запуск з детальним виводом
```bash
npm run test:verbose
```

## Опис завдань

### Завдання 2: Базовий тест для Wikipedia
**Файл:** `task2.test.js`

Тести перевіряють:
- Відкриття головної сторінки Wikipedia
- Пошук елементів за різними локаторами (id, css, name)
- Перевірку присутності логотипу Wikipedia
- Видимість елементів на сторінці

**Локатори:**
- `By.id('searchInput')` - пошук за ID
- `By.css('#searchInput')` - пошук за CSS селектором
- `By.name('search')` - пошук за атрибутом name

### Завдання 3: Виконання інтерактивних дій
**Файл:** `task3.test.js`

Тести демонструють:
- Використання методу `sendKeys()` для вводу тексту
- Виконання пошуку за допомогою клавіші Enter
- Використання кнопки пошуку з методом `click()`
- Перевірку зміни заголовка сторінки після пошуку

**Ключові методи:**
- `sendKeys(text)` - ввід тексту
- `sendKeys(Key.RETURN)` - натискання Enter
- `click()` - клік по елементу

### Завдання 4: Використання різних способів доступу до елементів
**Файл:** `task4.test.js`

Тести показують:
- Використання XPath для складних запитів
- CSS селектори для навігаційних елементів
- Пошук за ID та name для форм
- Отримання атрибутів елементів (href, alt, placeholder)
- Валідацію формату посилань

**Локатори:**
- `By.xpath('//h1[@id="firstHeading"]')` - XPath з умовами
- `By.css('#mw-panel .vector-menu-content-list a')` - CSS для вкладених елементів
- `By.id('searchform')` - пошук форми за ID
- `getAttribute('href')` - отримання значення атрибуту

### Завдання 5: Додаткові дії та перевірки
**Файл:** `task5.test.js`

Тести включають:
- Навігацію між сторінками з перевіркою URL
- Явні очікування (explicit waits) для динамічних елементів
- Отримання CSS властивостей (font-size, color, font-weight)
- Комплексні сценарії з множинними діями
- Hover-ефекти та інтерактивні елементи

**Ключові концепції:**
- `driver.wait(until.elementLocated())` - очікування появи елемента
- `driver.wait(until.elementIsVisible())` - очікування видимості
- `driver.wait(until.titleContains())` - очікування зміни заголовка
- `getCssValue(property)` - отримання CSS властивостей
- `getCurrentUrl()` - отримання поточного URL

## Корисні команди

### Debugging
Якщо тести падають, можна збільшити таймаут або додати паузи:

```javascript
// Збільшити загальний таймаут тесту
jest.setTimeout(60000);

// Додати паузу в тесті
await driver.sleep(2000); // 2 секунди
```

### Headless режим (без відкриття браузера)
Для запуску тестів у фоновому режимі, змініть створення драйвера:

```javascript
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('--headless');
options.addArguments('--disable-gpu');

driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
```

### Скріншоти при помилках
Для збереження скріншотів при падінні тестів:

```javascript
afterEach(async function() {
  if (this.currentTest.state === 'failed') {
    const screenshot = await driver.takeScreenshot();
    // Зберегти screenshot у файл
  }
});
```

## Типові проблеми та рішення

### 1. ChromeDriver не знайдено
**Помилка:** `SessionNotCreatedError: session not created`

**Рішення:**
- Переконайтеся, що встановлено Chrome браузер
- Оновіть selenium-webdriver: `npm update selenium-webdriver`

### 2. Елемент не знайдено
**Помилка:** `NoSuchElementError`

**Рішення:**
- Додайте явні очікування перед пошуком елемента
- Перевірте правильність локатора через DevTools браузера
- Збільште час очікування

### 3. Timeout при очікуванні
**Помилка:** `TimeoutError: Waiting for element`

**Рішення:**
- Збільште timeout в `driver.wait()`
- Перевірте, чи завантажується сторінка коректно
- Переконайтеся, що елемент дійсно з'являється на сторінці

## Додаткові ресурси

- [Selenium WebDriver документація](https://www.selenium.dev/documentation/webdriver/)
- [Jest документація](https://jestjs.io/docs/getting-started)
- [WebDriver Node.js API](https://www.selenium.dev/selenium/docs/api/javascript/)
- [CSS Selectors довідник](https://www.w3schools.com/cssref/css_selectors.asp)
- [XPath довідник](https://www.w3schools.com/xml/xpath_syntax.asp)

## Автор

Лабораторна робота №5 з веб-автоматизації

## Ліцензія

ISC
