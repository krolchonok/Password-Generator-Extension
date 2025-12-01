

---

# Password Generator Chrome Extension

Расширение для генерации надёжных паролей прямо в браузере. Интерфейс переведён в тёмную тему и сосредоточен только на создании пароля с нужными вам параметрами.

## Features

- Генерация случайных паролей с настраиваемой длиной.
- Опции включения заглавных букв, цифр и спецсимволов.
- Быстрое копирование в буфер обмена.
- Мини-кнопка внутри поля, которая генерирует и сразу подставляет пароль.
- Компактный интерфейс в тёмной теме.

## Screenshots

![Extension Screenshot](https://res.cloudinary.com/dzdxnfmal/image/upload/v1732346489/my/r1gcqf4ihirxqcugicho.png)

## Installation

### Prerequisites
- Google Chrome browser (latest version).

### Steps
1. Clone this repository or download the source code.
    ```bash
    git clone https://github.com/ravindulakmina/password-generator-extension.git
    cd password-generator-extension
    ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click on **Load unpacked** and select the folder containing the extension files.
5. The extension will now appear in your browser's extension bar.

## Usage

1. Click the extension icon in your browser toolbar.
2. Customize the password settings:
   - Enter the desired password length.
   - Select options to include uppercase letters, numbers, or symbols.
3. Click **Generate** to create a password.
4. Use the **Copy** button to copy the password to your clipboard.
5. В поле результата появится небольшая кнопка при фокусе — нажмите её, чтобы мгновенно сгенерировать и подставить новый пароль.

## File Structure

```
password-generator-extension/
├── assets/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── screenshot.png
├── popup.html
├── popup.css
├── popup.js
└── manifest.json
```

- **assets/**: Contains icons and other media assets.
- **popup.html**: The main HTML file for the extension interface.
- **popup.css**: Styles for the extension interface.
- **popup.js**: JavaScript логика генерации паролей и копирования в буфер обмена.
- **manifest.json**: Chrome extension configuration.

## Development

To modify or enhance the extension:
1. Edit the code files (`popup.html`, `popup.js`, `popup.css`) as needed.
2. Reload the extension in Chrome by clicking the **Reload** button in `chrome://extensions/`.

## Roadmap

- Add options for storing and managing multiple passwords.
- Доработать дополнительные визуальные темы.
- Добавить новые режимы генерации (например, только слова или только цифры).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Let me know if you'd like additional sections or edits to the README!
