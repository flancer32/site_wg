# Итерация

- Цель: перевести и адаптировать английские страницы `home` и `contact` на основе актуальных русских версий, заменив устаревшее содержание.

## Выполнено

- Полностью обновлён `tmpl/web/en/index.html`.
- Полностью обновлён `tmpl/web/en/contact.html`.
- Убрано старое содержание, связанное с прежней логикой:
  - акцент на `ADSM / GitHub Flows` как старом mixed offer;
  - старые блоки про review / setup / pilot ranges;
  - устаревшая структура домашней страницы с proof-first подачей.
- Перенесена актуальная логика:
  - `GitHub Flows` как current hot offer;
  - краткая personal positioning на home;
  - three-key-products structure на home;
  - three-step commercial offer на contact;
  - pricing:
    - `$50` test connection;
    - `from $150` VPS deployment;
    - `$35 / hour` consulting.
- Выполнена адаптация под естественный английский, а не буквальный перевод с русского.

## Артефакты

- `tmpl/web/en/index.html`
- `tmpl/web/en/contact.html`
