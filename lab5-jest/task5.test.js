const { Builder, By, until } = require('selenium-webdriver');

describe('Завдання 5: Додаткові дії та перевірки', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Клік по посиланню та перевірка зміни URL і заголовка', async () => {
    // Відкриваємо головну сторінку Wikipedia
    await driver.get('https://www.wikipedia.org');
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    // Запам'ятовуємо початковий URL та заголовок
    const initialUrl = await driver.getCurrentUrl();
    const initialTitle = await driver.getTitle();
    
    console.log(`Початковий URL: ${initialUrl}`);
    console.log(`Початковий заголовок: ${initialTitle}`);

    // Знаходимо посилання на англійську версію
    const englishLink = await driver.findElement(By.css('#js-link-box-en a'));
    
    // Натискаємо на посилання
    await englishLink.click();

    // Очікуємо зміни URL
    await driver.wait(until.urlContains('en.wikipedia.org'), 10000);

    // Отримуємо новий URL та заголовок
    const newUrl = await driver.getCurrentUrl();
    const newTitle = await driver.getTitle();

    console.log(`Новий URL: ${newUrl}`);
    console.log(`Новий заголовок: ${newTitle}`);

    // Перевіряємо, що URL змінився
    expect(newUrl).not.toBe(initialUrl);
    expect(newUrl).toContain('en.wikipedia.org');

    // Перевіряємо, що заголовок змінився
    expect(newTitle).not.toBe(initialTitle);
    expect(newTitle).toContain('Wikipedia');
  });

  test('Використання явних очікувань (explicit waits)', async () => {
    await driver.get('https://www.wikipedia.org');

    // Явне очікування появи елемента
    const searchInput = await driver.wait(
      until.elementLocated(By.id('searchInput')),
      10000,
      'Поле пошуку не з\'явилося протягом 10 секунд'
    );

    console.log('✓ Елемент знайдено за допомогою явного очікування');

    // Очікування, поки елемент стане видимим
    await driver.wait(
      until.elementIsVisible(searchInput),
      10000,
      'Поле пошуку не стало видимим'
    );

    console.log('✓ Елемент став видимим');

    // Вводимо текст і шукаємо
    await searchInput.sendKeys('Web automation');
    await searchInput.submit();

    // Очікуємо зміни заголовка
    await driver.wait(
      until.titleContains('Web automation'),
      10000,
      'Заголовок не змінився'
    );

    console.log('✓ Заголовок сторінки змінився після пошуку');

    // Очікуємо появи конкретного елемента на сторінці результатів
    const articleHeading = await driver.wait(
      until.elementLocated(By.css('#firstHeading')),
      10000
    );

    const headingText = await articleHeading.getText();
    console.log(`Знайдено заголовок статті: ${headingText}`);
  });

  test('Отримання CSS властивостей елементів', async () => {
    await driver.get('https://en.wikipedia.org/wiki/Selenium');
    await driver.wait(until.titleContains('Selenium'), 10000);

    // Знаходимо заголовок статті
    const heading = await driver.findElement(By.css('#firstHeading'));

    // Отримуємо CSS властивості
    const fontSize = await heading.getCssValue('font-size');
    const fontWeight = await heading.getCssValue('font-weight');
    const color = await heading.getCssValue('color');
    const fontFamily = await heading.getCssValue('font-family');
    const lineHeight = await heading.getCssValue('line-height');

    console.log('\nCSS властивості заголовка статті:');
    console.log(`  font-size: ${fontSize}`);
    console.log(`  font-weight: ${fontWeight}`);
    console.log(`  color: ${color}`);
    console.log(`  font-family: ${fontFamily}`);
    console.log(`  line-height: ${lineHeight}`);

    // Перевіряємо, що розмір шрифту є числом
    const fontSizeValue = parseFloat(fontSize);
    expect(fontSizeValue).toBeGreaterThan(0);

    // Знаходимо кнопку або посилання та отримуємо його стилі
    const link = await driver.findElement(By.css('#mw-panel a'));
    
    const linkColor = await link.getCssValue('color');
    const linkTextDecoration = await link.getCssValue('text-decoration');
    const linkDisplay = await link.getCssValue('display');

    console.log('\nCSS властивості посилання:');
    console.log(`  color: ${linkColor}`);
    console.log(`  text-decoration: ${linkTextDecoration}`);
    console.log(`  display: ${linkDisplay}`);

    // Отримуємо стилі кнопки пошуку
    const searchButton = await driver.findElement(By.css('#searchButton'));
    
    const buttonBackground = await searchButton.getCssValue('background-color');
    const buttonBorder = await searchButton.getCssValue('border');
    const buttonCursor = await searchButton.getCssValue('cursor');

    console.log('\nCSS властивості кнопки пошуку:');
    console.log(`  background-color: ${buttonBackground}`);
    console.log(`  border: ${buttonBorder}`);
    console.log(`  cursor: ${buttonCursor}`);

    expect(buttonCursor).toBe('pointer');
  });

  test('Комплексний тест: навігація, очікування та перевірка стилів', async () => {
    // Відкриваємо головну сторінку
    await driver.get('https://www.wikipedia.org');

    // Очікуємо завантаження та вводимо пошуковий запит
    const searchInput = await driver.wait(
      until.elementLocated(By.id('searchInput')),
      10000
    );

    await searchInput.sendKeys('Node.js');
    await searchInput.submit();

    // Очікуємо завантаження сторінки результатів
    await driver.wait(until.titleContains('Node'), 10000);

    // Знаходимо внутрішнє посилання в статті
    const internalLink = await driver.wait(
      until.elementLocated(By.css('#mw-content-text a[href^="/wiki/"]')),
      10000
    );

    // Отримуємо CSS властивості посилання
    const linkColorBefore = await internalLink.getCssValue('color');
    console.log(`Колір посилання до наведення: ${linkColorBefore}`);

    // Виконуємо наведення курсора (hover)
    const actions = driver.actions({ async: true });
    await actions.move({ origin: internalLink }).perform();

    // Невелика затримка для спрацювання hover-ефекту
    await driver.sleep(500);

    // Отримуємо href та переходимо за посиланням
    const linkHref = await internalLink.getAttribute('href');
    console.log(`Перехід за посиланням: ${linkHref}`);

    await internalLink.click();

    // Очікуємо зміни URL
    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl.includes('/wiki/');
    }, 10000);

    const finalUrl = await driver.getCurrentUrl();
    const finalTitle = await driver.getTitle();

    console.log(`Фінальний URL: ${finalUrl}`);
    console.log(`Фінальний заголовок: ${finalTitle}`);

    expect(finalUrl).toContain('/wiki/');
    console.log('✓ Успішно перейшли за внутрішнім посиланням');
  });
});
