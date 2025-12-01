const INLINE_BUTTON_ID = 'pgen-inline-button';
const VISIBLE_CLASS = 'pgen-inline-visible';
const ACTIVE_INPUT_ATTR = 'data-pgen-watched';
const DEFAULT_LENGTH = 16;
const DEFAULT_OPTIONS = {
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
};

let floatingButton = null;
let activeInput = null;
let hoveringButton = false;

function buildCharacterPool(options) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let characters = lowercase;
  if (options.includeUppercase) characters += uppercase;
  if (options.includeNumbers) characters += numbers;
  if (options.includeSymbols) characters += symbols;
  return characters;
}

function generatePasswordString(length, options) {
  const characters = buildCharacterPool(options);
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

async function copyToClipboard(text) {
  if (!text) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (_) {
      // fallback below
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function ensureFloatingButton() {
  if (floatingButton) return floatingButton;

  const button = document.createElement('button');
  button.id = INLINE_BUTTON_ID;
  button.type = 'button';
  button.className = 'pgen-inline-button';
  button.setAttribute('aria-label', 'Сгенерировать и вставить пароль');
  button.textContent = '⚡';

  button.addEventListener('mousedown', (event) => {
    event.preventDefault();
  });

  button.addEventListener('mouseenter', () => {
    hoveringButton = true;
  });

  button.addEventListener('mouseleave', () => {
    hoveringButton = false;
  });

  button.addEventListener('click', async () => {
    if (!activeInput) return;
    const password = generatePasswordString(DEFAULT_LENGTH, DEFAULT_OPTIONS);
    activeInput.value = password;
    activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    activeInput.dispatchEvent(new Event('change', { bubbles: true }));
    await copyToClipboard(password);
  });

  document.body.appendChild(button);
  floatingButton = button;
  return button;
}

function hideButton() {
  const button = ensureFloatingButton();
  button.classList.remove(VISIBLE_CLASS);
  activeInput = null;
}

function repositionButton() {
  if (!activeInput) return;
  const button = ensureFloatingButton();
  if (!button.classList.contains(VISIBLE_CLASS)) return;

  const rect = activeInput.getBoundingClientRect();
  const size = 32;
  const gap = 6;

  const top = window.scrollY + rect.top + (rect.height - size) / 2;
  const left = window.scrollX + rect.right - size - gap;

  button.style.top = `${top}px`;
  button.style.left = `${Math.max(0, left)}px`;
}

function handleFocus(event) {
  const target = event.target;
  if (target.disabled || target.readOnly) return;

  activeInput = target;
  const button = ensureFloatingButton();
  button.classList.add(VISIBLE_CLASS);
  repositionButton();
}

function handleBlur() {
  setTimeout(() => {
    if (hoveringButton) return;
    hideButton();
  }, 120);
}

function attachToInput(input) {
  if (input.getAttribute(ACTIVE_INPUT_ATTR)) return;
  input.setAttribute(ACTIVE_INPUT_ATTR, 'true');
  input.addEventListener('focus', handleFocus);
  input.addEventListener('blur', handleBlur);
}

function scanForPasswordInputs(root = document) {
  const inputs = root.querySelectorAll('input[type="password"]');
  inputs.forEach(attachToInput);
}

function observeNewFields() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches && node.matches('input[type="password"]')) {
          attachToInput(node);
        }
        if (node.querySelectorAll) {
          scanForPasswordInputs(node);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function setupGlobalListeners() {
  window.addEventListener('resize', repositionButton, { passive: true });
  window.addEventListener(
    'scroll',
    () => {
      repositionButton();
    },
    { passive: true, capture: true }
  );
}

function init() {
  ensureFloatingButton();
  scanForPasswordInputs();
  observeNewFields();
  setupGlobalListeners();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
