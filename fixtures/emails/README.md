# Email fixtures для локального preview

Скопируй письма с почты сюда и проверь формат Telegram-сообщения:

```bash
npm run preview:emails          # вывод в терминал
npm run send:telegram           # отправить все фикстуры в Telegram
npm run send:telegram -- skyscanner   # только файлы с "skyscanner" в имени
```

Нужен `.env` с `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

## Формат `.email.txt` (проще всего)

Создай файл, например `google-flights.email.txt`:

```text
From: Google Flights <alerts@google.com>
Subject: Your flight price dropped

Вставь сюда тело письма (plain text или HTML)
```

## Формат `.eml`

Сохрани письмо из Gmail как `.eml` и положи в эту папку.

## Важно

- Реальные письма в git не коммитим (папка в `.gitignore`)
- Для примера есть `example.email.txt`
