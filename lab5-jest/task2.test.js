const { Builder, By, until } = require('selenium-webdriver');

describe('Завдання 2: Базовий тест для Wikipedia', () => {
  let driver;

  // Налаштування перед кожним тестом
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // Очищення після всіх тестів
  afterAll(async () => {
    await driver.quit();
  });

  test('Відкриття сторінки Wikipedia та перевірка елементів', async () => {
    // Відкриваємо головну сторінку Wikipedia
    await driver.get('https://www.wikipedia.org');

    // Очікуємо завантаження сторінки
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    // Пошук поля пошуку за різними локаторами
    // Варіант 1: За ID
    const searchInputById = await driver.findElement(By.id('searchInput'));
    expect(await searchInputById.isDisplayed()).toBe(true);

    // Варіант 2: За CSS селектором
    const searchInputByCss = await driver.findElement(By.css('#searchInput'));
    expect(await searchInputByCss.isDisplayed()).toBe(true);

    // Варіант 3: За name атрибутом
    const searchInputByName = await driver.findElement(By.name('search'));
    expect(await searchInputByName.isDisplayed()).toBe(true);

    // Пошук логотипу Wikipedia
    // Варіант 1: За тегом img та атрибутом alt
    const logo = await driver.findElement(By.css('img.central-featured-logo'));
    expect(await logo.isDisplayed()).toBe(true);

    // Перевірка атрибуту alt логотипу
    const altText = await logo.getAttribute('alt');
    expect(altText).toContain('Wikipedia');

    console.log('✓ Всі елементи успішно знайдені на сторінці');
  });
});
