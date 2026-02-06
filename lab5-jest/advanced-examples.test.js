const { Builder, By, Key, until } = require('selenium-webdriver');

/**
 * Додатковий приклад: Розширені техніки роботи з Selenium WebDriver
 * Цей файл демонструє додаткові можливості, які можуть бути корисними
 */

describe('Розширені приклади роботи з Selenium', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Робота з множинними елементами та фільтрація', async () => {
    await driver.get('https://en.wikipedia.org/wiki/Selenium');
    
    // Знаходимо всі посилання на сторінці
    const allLinks = await driver.findElements(By.css('a'));
    console.log(`Всього посилань на сторінці: ${allLinks.length}`);

    // Фільтруємо та працюємо тільки з видимими посиланнями
    let visibleLinks = 0;
    for (const link of allLinks.slice(0, 10)) { // Перевіряємо перші 10 для швидкості
      if (await link.isDisplayed()) {
        visibleLinks++;
      }
    }
    console.log(`Видимих посилань (з перших 10): ${visibleLinks}`);
  });

  test('Робота з вікнами та вкладками', async () => {
    await driver.get('https://www.wikipedia.org');

    // Отримуємо поточний дескриптор вікна
    const originalWindow = await driver.getWindowHandle();

    // Знаходимо посилання, яке відкривається в новій вкладці
    const link = await driver.findElement(By.css('#js-link-box-en a'));
    
    // Відкриваємо посилання в новій вкладці (Ctrl+Click або Cmd+Click)
    const actions = driver.actions({ async: true });
    await actions.keyDown(Key.CONTROL).click(link).keyUp(Key.CONTROL).perform();

    // Чекаємо, поки з'явиться нова вкладка
    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length === 2;
    }, 10000);

    // Отримуємо всі дескриптори вікон
    const windows = await driver.getAllWindowHandles();
    
    // Переключаємось на нову вкладку
    for (const window of windows) {
      if (window !== originalWindow) {
        await driver.switchTo().window(window);
        break;
      }
    }

    // Перевіряємо, що ми на новій сторінці
    const newUrl = await driver.getCurrentUrl();
    console.log(`Новий URL у вкладці: ${newUrl}`);
    expect(newUrl).toContain('en.wikipedia.org');

    // Повертаємось до оригінального вікна
    await driver.switchTo().window(originalWindow);
  });

  test('Скролінг сторінки', async () => {
    await driver.get('https://en.wikipedia.org/wiki/Selenium');

    // Скролінг до низу сторінки
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(1000);

    // Скролінг до верху сторінки
    await driver.executeScript('window.scrollTo(0, 0)');
    await driver.sleep(1000);

    // Скролінг до конкретного елемента
    const element = await driver.findElement(By.css('#toc'));
    await driver.executeScript('arguments[0].scrollIntoView(true);', element);
    
    console.log('✓ Виконано різні види скролінгу');
  });

  test('Отримання та встановлення cookies', async () => {
    await driver.get('https://www.wikipedia.org');

    // Отримуємо всі cookies
    const cookies = await driver.manage().getCookies();
    console.log(`Знайдено ${cookies.length} cookies`);
    
    if (cookies.length > 0) {
      console.log('Перший cookie:', cookies[0]);
    }

    // Додаємо новий cookie
    await driver.manage().addCookie({
      name: 'test_cookie',
      value: 'test_value_123'
    });

    // Перевіряємо, що cookie додано
    const testCookie = await driver.manage().getCookie('test_cookie');
    expect(testCookie.value).toBe('test_value_123');
    console.log('✓ Cookie успішно додано та перевірено');

    // Видаляємо конкретний cookie
    await driver.manage().deleteCookie('test_cookie');

    // Перевіряємо, що cookie видалено
    const deletedCookie = await driver.manage().getCookie('test_cookie');
    expect(deletedCookie).toBeNull();
  });

  test('Виконання JavaScript на сторінці', async () => {
    await driver.get('https://www.wikipedia.org');

    // Виконуємо JavaScript для отримання даних
    const pageTitle = await driver.executeScript('return document.title;');
    console.log(`Заголовок сторінки через JS: ${pageTitle}`);

    // Змінюємо вміст елемента через JavaScript
    await driver.executeScript(`
      const heading = document.querySelector('.central-textlogo');
      if (heading) {
        heading.style.color = 'red';
      }
    `);

    await driver.sleep(1000);

    // Отримуємо інформацію про сторінку
    const pageInfo = await driver.executeScript(`
      return {
        url: window.location.href,
        title: document.title,
        linksCount: document.querySelectorAll('a').length,
        imagesCount: document.querySelectorAll('img').length
      };
    `);

    console.log('Інформація про сторінку:', pageInfo);
    expect(pageInfo.linksCount).toBeGreaterThan(0);
  });

  test('Робота з алертами та діалогами (якщо є)', async () => {
    await driver.get('https://www.wikipedia.org');

    // Створюємо alert через JavaScript
    await driver.executeScript('window.testAlert = function() { alert("Test Alert"); }');
    
    // Викликаємо alert
    await driver.executeScript('window.testAlert()');

    // Чекаємо на появу alert
    await driver.wait(until.alertIsPresent(), 5000);

    // Переключаємось на alert та приймаємо його
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    
    console.log(`Текст alert: ${alertText}`);
    expect(alertText).toBe('Test Alert');

    // Приймаємо alert
    await alert.accept();
    
    console.log('✓ Alert успішно оброблено');
  });

  test('Перевірка стану елементів', async () => {
    await driver.get('https://www.wikipedia.org');

    const searchInput = await driver.findElement(By.id('searchInput'));

    // Різні перевірки стану елемента
    const isDisplayed = await searchInput.isDisplayed();
    const isEnabled = await searchInput.isEnabled();
    const tagName = await searchInput.getTagName();
    const location = await searchInput.getRect();

    console.log('\nІнформація про елемент:');
    console.log(`  Видимий: ${isDisplayed}`);
    console.log(`  Активний: ${isEnabled}`);
    console.log(`  Тег: ${tagName}`);
    console.log(`  Позиція: x=${location.x}, y=${location.y}`);
    console.log(`  Розмір: width=${location.width}, height=${location.height}`);

    expect(isDisplayed).toBe(true);
    expect(isEnabled).toBe(true);
    expect(tagName).toBe('input');
  });

  test('Очікування з кастомними умовами', async () => {
    await driver.get('https://www.wikipedia.org');

    // Кастомна умова очікування
    const customCondition = async () => {
      const elements = await driver.findElements(By.css('a'));
      return elements.length > 50; // Чекаємо, поки на сторінці буде більше 50 посилань
    };

    await driver.wait(customCondition, 10000, 'На сторінці недостатньо посилань');

    const links = await driver.findElements(By.css('a'));
    console.log(`Знайдено ${links.length} посилань після очікування`);
    expect(links.length).toBeGreaterThan(50);
  });
});
