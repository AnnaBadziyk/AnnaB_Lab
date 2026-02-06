const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Завдання 3: Виконання інтерактивних дій', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Пошук на Wikipedia з використанням sendKeys та Enter', async () => {
    // Відкриваємо головну сторінку Wikipedia
    await driver.get('https://www.wikipedia.org');
    
    // Очікуємо завантаження сторінки
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    // Знаходимо поле пошуку
    const searchInput = await driver.findElement(By.id('searchInput'));
    
    // Перевіряємо, що поле пошуку видиме
    expect(await searchInput.isDisplayed()).toBe(true);

    // Вводимо текст "Selenium" у пошукове поле
    await searchInput.sendKeys('Selenium');
    
    // Варіант 1: Використання клавіші Enter
    await searchInput.sendKeys(Key.RETURN);

    // Очікуємо завантаження результатів
    await driver.wait(until.titleContains('Selenium'), 10000);

    // Перевіряємо, що заголовок сторінки містить слово "Selenium"
    const title = await driver.getTitle();
    expect(title).toContain('Selenium');

    console.log(`✓ Заголовок сторінки: ${title}`);
  });

  test('Пошук на Wikipedia з використанням кнопки пошуку', async () => {
    // Відкриваємо головну сторінку Wikipedia
    await driver.get('https://www.wikipedia.org');
    
    // Очікуємо завантаження сторінки
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    // Знаходимо поле пошуку
    const searchInput = await driver.findElement(By.id('searchInput'));

    // Вводимо текст "JavaScript"
    await searchInput.sendKeys('JavaScript');

    // Знаходимо кнопку пошуку за CSS селектором
    const searchButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Натискаємо кнопку пошуку
    await searchButton.click();

    // Очікуємо завантаження результатів
    await driver.wait(until.titleContains('JavaScript'), 10000);

    // Перевіряємо заголовок
    const title = await driver.getTitle();
    expect(title).toContain('JavaScript');

    console.log(`✓ Пошук виконано успішно. Заголовок: ${title}`);
  });
});
