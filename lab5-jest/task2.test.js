const { Builder, By, until } = require('selenium-webdriver');

describe('Завдання 2: Базовий тест для Wikipedia', () => {
  let driver;

  
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

 
  afterAll(async () => {
    await driver.quit();
  });

  test('Відкриття сторінки Wikipedia та перевірка елементів', async () => {
    
    await driver.get('https://www.wikipedia.org');

    
    await driver.wait(until.titleContains('Wikipedia'), 10000);


    
    const searchInputById = await driver.findElement(By.id('searchInput'));
    expect(await searchInputById.isDisplayed()).toBe(true);

   
    const searchInputByCss = await driver.findElement(By.css('#searchInput'));
    expect(await searchInputByCss.isDisplayed()).toBe(true);

    
    const searchInputByName = await driver.findElement(By.name('search'));
    expect(await searchInputByName.isDisplayed()).toBe(true);

   
    const logo = await driver.findElement(By.css('img.central-featured-logo'));
    expect(await logo.isDisplayed()).toBe(true);

    
    const altText = await logo.getAttribute('alt');
    expect(altText).toContain('Wikipedia');

    console.log('✓ Всі елементи успішно знайдені на сторінці');
  });
});
