# ANDROID-APKS

## WTF

— HTTP-сервер\
— По крону скачивает Android-приложения\
— Отдаёт страницу с текущими версиями и ссылками на скачивание\
— Используется [в Obtainium](https://github.com/ImranR98/Obtainium)

## Зависимости

— aapt\
— aria2c

## Запуск

```bash
npm run start --port=3030
open http://localhost:3030/apps
```

## Obtainium

### Общие настройки

— URL-источник: `http://ваш-домен:3030/apps`\
— Группа для извлечения версии: `1`
— Применять регулярное выражение версии ко всей страницы

### Фильтры для конкретных приложений (пример)

— Фильтр ссылок: `tinkoff-bank`\
— Извлечение версии: `Тинькофф ([\d.]+)`
