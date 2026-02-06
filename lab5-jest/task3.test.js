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
    
    await driver.get('https://www.wikipedia.org');
    
    
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    
    const searchInput = await driver.findElement(By.id('searchInput'));
    
    
    expect(await searchInput.isDisplayed()).toBe(true);

    
    await searchInput.sendKeys('Selenium');
    
    
    await searchInput.sendKeys(Key.RETURN);

    
    await driver.wait(until.titleContains('Selenium'), 10000);

    
    const title = await driver.getTitle();
    expect(title).toContain('Selenium');

    console.log(`✓ Заголовок сторінки: ${title}`);
  });

  test('Пошук на Wikipedia з використанням кнопки пошуку', async () => {
    
    await driver.get('https://www.wikipedia.org');
    
    
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    
    const searchInput = await driver.findElement(By.id('searchInput'));

    
    await searchInput.sendKeys('JavaScript');

    
    const searchButton = await driver.findElement(By.css('button[type="submit"]'));
    
    
    await searchButton.click();

    
    await driver.wait(until.titleContains('JavaScript'), 10000);

    
    const title = await driver.getTitle();
    expect(title).toContain('JavaScript');

    console.log(`✓ Пошук виконано успішно. Заголовок: ${title}`);
  });
});
