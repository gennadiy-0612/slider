class ElementToggleService {
  // Приватні поля (Інкапсуляція)
  #triggerEl;
  #targetEl;
  #options;
  #isActive = false;
  #controller = new AbortController();

  /**
   * @param {string|HTMLElement} trigger - Елемент (або селектор), на який клацають
   * @param {string|HTMLElement} target - Елемент (або селектор), якому змінюють клас
   * @param {Object} options - Додаткові налаштування
   */
  constructor(trigger, target, options = {}) {
    // Отримуємо елементи (підтримуємо і селектор-рядок, і готовий DOM-вузол)
    this.#triggerEl = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;
    this.#targetEl = typeof target === 'string' ? document.querySelector(target) : target;

    if (!this.#triggerEl) {
      throw new Error(`[ElementToggleService] Елемент-тригер не знайдено: ${trigger}`);
    }
    if (!this.#targetEl) {
      throw new Error(`[ElementToggleService] Цільовий елемент не знайдено: ${target}`);
    }

    // Конфігурація за замовчуванням
    this.#options = {
      toggleClass: 'active', // CSS-клас, який додаємо/прибираємо
      onToggle: null,        // Колбек при кожній зміні стану
      onActivate: null,      // Колбек при активації
      onDeactivate: null,    // Колбек при деактивації
      ...options
    };

    this.#initEvents();
  }

  // --- ГЕТЕРИ ---
  get isActive() {
    return this.#isActive;
  }

  get target() {
    return this.#targetEl;
  }

  get trigger() {
    return this.#triggerEl;
  }

  // --- ПУБЛІЧНІ МЕТОДИ (Method Chaining) ---

  /**
   * Перемикає клас (додає, якщо немає / видаляє, якщо є)
   */
  toggle() {
    return this.#isActive ? this.deactivate() : this.activate();
  }

  /**
   * Примусово додає CSS-клас
   */
  activate() {
    if (this.#isActive) return this;

    this.#isActive = true;
    this.#targetEl.classList.add(this.#options.toggleClass);

    this.#triggerCallbacks('activate');
    this.#dispatchCustomEvent('element:activate');

    return this;
  }

  /**
   * Примусово прибирає CSS-клас
   */
  deactivate() {
    if (!this.#isActive) return this;

    this.#isActive = false;
    this.#targetEl.classList.remove(this.#options.toggleClass);

    this.#triggerCallbacks('deactivate');
    this.#dispatchCustomEvent('element:deactivate');

    return this;
  }

  /**
   * Змінює CSS-клас, який перемикається, "на льоту"
   */
  setToggleClass(newClass) {
    if (this.#isActive) {
      this.#targetEl.classList.remove(this.#options.toggleClass);
      this.#targetEl.classList.add(newClass);
    }
    this.#options.toggleClass = newClass;
    return this;
  }

  /**
   * Знищує екземпляр: видаляє всі слухачі подій для очищення пам'яті
   */
  destroy() {
    this.deactivate();

    // Скасовуємо слухач події click
    this.#controller.abort();

    // Очищаємо посилання
    this.#triggerEl = null;
    this.#targetEl = null;
    this.#options = null;
  }

  // --- ПРИВАТНІ МЕТОДИ ---

  #initEvents() {
    const { signal } = this.#controller;

    // Додаємо обробник події кліку з підтримкою AbortSignal
    this.#triggerEl.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    }, { signal });
  }

  #triggerCallbacks(action) {
    if (typeof this.#options.onToggle === 'function') {
      this.#options.onToggle(this.#isActive, this);
    }

    if (action === 'activate' && typeof this.#options.onActivate === 'function') {
      this.#options.onActivate(this);
    } else if (action === 'deactivate' && typeof this.#options.onDeactivate === 'function') {
      this.#options.onDeactivate(this);
    }
  }

  #dispatchCustomEvent(eventName) {
    if (!this.#targetEl) return;

    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: { 
        isActive: this.#isActive,
        instance: this 
      }
    });

    this.#targetEl.dispatchEvent(event);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = new ElementToggleService('#menuBtn', '#mobileMenu', {
    toggleClass: 'is-visible', // Власний CSS-клас замість 'active'
    onActivate: () => console.log('Меню відкрито!'),
    onDeactivate: () => console.log('Меню закрито!')
  });

  // Можна керувати програмно завдяки Method Chaining:
  // menuToggle.activate();

  // Також можна слухати кастомні події з DOM:
  document.querySelector('#mobileMenu').addEventListener('element:activate', (e) => {
    console.log('Подія DOM: елемент активовано', e.detail.instance);
  });
});