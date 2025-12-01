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

function updateLengthValue(length) {
  document.getElementById('length-value').textContent = length;
}

function setCopyHint(text, success = false) {
  const hint = document.getElementById('copy-hint');
  hint.textContent = text;
  hint.classList.toggle('success', success);
}

function generatePassword() {
  const length = Number(document.getElementById('password-length').value) || 12;
  const options = {
    includeUppercase: document.getElementById('include-uppercase').checked,
    includeNumbers: document.getElementById('include-numbers').checked,
    includeSymbols: document.getElementById('include-symbols').checked,
  };

  const password = generatePasswordString(length, options);
  document.getElementById('password').value = password;
  setCopyHint('Не скопирован');

  return password;
}

function copyPassword() {
  const passwordField = document.getElementById('password');
  if (!passwordField.value) {
    setCopyHint('Сначала сгенерируйте пароль');
    return;
  }

  navigator.clipboard.writeText(passwordField.value).then(() => {
    setCopyHint('Скопировано', true);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lengthInput = document.getElementById('password-length');
  const passwordField = document.getElementById('password');
  const inlineGenerateBtn = document.getElementById('inline-generate');
  const resultField = document.querySelector('.result-field');

  updateLengthValue(lengthInput.value);

  lengthInput.addEventListener('input', (event) => {
    updateLengthValue(event.target.value);
    setCopyHint('Не скопирован');
  });

  document.getElementById('generate-btn').addEventListener('click', generatePassword);
  document.getElementById('copy-btn').addEventListener('click', copyPassword);

  inlineGenerateBtn.addEventListener('click', () => {
    generatePassword();
    passwordField.focus();
  });

  resultField.addEventListener('focusin', () => {
    inlineGenerateBtn.classList.add('visible');
  });

  resultField.addEventListener('focusout', (event) => {
    if (!resultField.contains(event.relatedTarget)) {
      inlineGenerateBtn.classList.remove('visible');
    }
  });
});
