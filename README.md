# ANDROID-APKS

## WTF

— HTTP-сервер\
— По крону скачивает Android-приложения\
— Отдаёт страницу с текущими версиями и ссылками на скачивание\
— Используется [в Obtainium](https://github.com/ImranR98/Obtainium)

## Локальный запуск приложения

### Зависимости

— aapt\
— aria2c

### Переменные окружения

— AAPKS_DOMAIN: домен, по которому доступен сервер, для ссылок импорта в Obtainium (например: `http://ваш-домен:3030`)\
— AAPKS_GITHUB_TOKEN: `personal access token`, для приложений с GitHub\
— AAPKS_ARIA_PROXY: добавляет в `aria2c` аргумент `--all-proxy` с содержимым переменной

### Запуск

```bash
# предварительно скачать апк-файлы
# только при первом запуске, далее будут скачиваться по крону
npm run apk:dl

# старт сервера
npm run start --port=3030
open http://localhost:3030/apps
```
