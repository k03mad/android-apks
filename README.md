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

— AAPKS_DOMAIN: внешний домен, по которому доступен сервер, для ссылок импорта в Obtainium (например: `https://my-apks-domain.ru:3030`)\
— AAPKS_GITHUB_TOKEN: `personal access token`, для приложений с GitHub\
— AAPKS_ARIA_PROXY: добавляет в `aria2c` аргумент `--all-proxy` с содержимым переменной\
— AAPKS_4PDA_MEMBER_ID: кука `member_id`, для приложений с 4PDA\
— AAPKS_4PDA_PASS_HASH: кука `pass_hash`, для приложений с 4PDA

### Запуск

```bash
# предварительно скачать апк-файлы
# только при первом запуске, далее будут скачиваться по крону
npm run apk:dl

# старт сервера
npm run start --port=3030
open http://localhost:3030/apps

# экспорт метрик для prometheus
open http://localhost:3030/metrics
```
