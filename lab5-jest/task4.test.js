const { Builder, By, until } = require('selenium-webdriver');

describe('Завдання 4: Використання різних способів доступу до елементів', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Перевірка елементів статті Selenium з використанням різних локаторів', async () => {
    // Відкриваємо статтю про Selenium
    await driver.get('https://en.wikipedia.org/wiki/Selenium');
    
    // Очікуємо завантаження сторінки
    await driver.wait(until.titleContains('Selenium'), 10000);

    // 1. Використання By.xpath для пошуку заголовку статті
    const headingXPath = await driver.findElement(
      By.xpath('//h1[@id="firstHeading"]')
    );
    const headingText = await headingXPath.getText();
    
    console.log(`Заголовок статті (XPath): ${headingText}`);
    expect(headingText).toBe('Selenium');

    // 2. Використання By.css для вибору посилань у меню навігації
    const navLinks = await driver.findElements(
      By.css('#mw-panel .vector-menu-content-list a')
    );
    
    expect(navLinks.length).toBeGreaterThan(0);
    console.log(`Знайдено ${navLinks.length} посилань у навігаційному меню`);

    // Перевіряємо перші кілька посилань
    for (let i = 0; i < Math.min(3, navLinks.length); i++) {
      const linkText = await navLinks[i].getText();
      const linkHref = await navLinks[i].getAttribute('href');
      
      console.log(`  Посилання ${i + 1}: ${linkText} -> ${linkHref}`);
      
      // Перевіряємо, що href містить домен wikipedia.org
      if (linkHref) {
        expect(linkHref).toContain('wikipedia.org');
      }
    }

    // 3. Використання By.id для пошуку форми пошуку
    const searchForm = await driver.findElement(By.id('searchform'));
    expect(await searchForm.isDisplayed()).toBe(true);

    // Пошук поля вводу пошуку за name
    const searchInput = await driver.findElement(By.name('search'));
    expect(await searchInput.isDisplayed()).toBe(true);
    
    const searchPlaceholder = await searchInput.getAttribute('placeholder');
    console.log(`Placeholder пошукового поля: ${searchPlaceholder}`);

    // 4. Додаткова перевірка: отримання посилань зі змісту статті
    const tocLinks = await driver.findElements(
      By.css('#toc .toc-link')
    );
    
    if (tocLinks.length > 0) {
      console.log(`\nЗміст статті містить ${tocLinks.length} розділів:`);
      
      for (let i = 0; i < Math.min(5, tocLinks.length); i++) {
        const linkText = await tocLinks[i].getText();
        const linkHref = await tocLinks[i].getAttribute('href');
        
        console.log(`  ${i + 1}. ${linkText} (${linkHref})`);
        
        // Перевіряємо формат href (має починатися з #)
        expect(linkHref).toMatch(/^#/);
      }
    }
  });

  test('Перевірка додаткових локаторів на сторінці статті', async () => {
    await driver.get('https://en.wikipedia.org/wiki/Selenium');
    await driver.wait(until.titleContains('Selenium'), 10000);

    // Використання XPath з умовами
    const infobox = await driver.findElement(
      By.xpath('//table[contains(@class, "infobox")]')
    );
    expect(await infobox.isDisplayed()).toBe(true);
    console.log('✓ Infobox знайдено за допомогою XPath');

    // Використання CSS селектора для пошуку зображень
    const images = await driver.findElements(
      By.css('img.mw-file-element')
    );
    console.log(`Знайдено ${images.length} зображень на сторінці`);
    
    if (images.length > 0) {
      const firstImageSrc = await images[0].getAttribute('src');
      const firstImageAlt = await images[0].getAttribute('alt');
      console.log(`Перше зображення: ${firstImageAlt} (${firstImageSrc})`);
    }

    // Використання CSS для категорій
    const categoryLinks = await driver.findElements(
      By.css('#mw-normal-catlinks ul li a')
    );
    
    if (categoryLinks.length > 0) {
      console.log(`\nКатегорії статті (${categoryLinks.length}):`);
      for (let i = 0; i < Math.min(5, categoryLinks.length); i++) {
        const categoryText = await categoryLinks[i].getText();
        console.log(`  - ${categoryText}`);
      }
    }
  });
});
