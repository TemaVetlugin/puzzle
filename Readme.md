<h1>Запуск проекта локально</h1>

<p>1. cd .docker & docker-compose -f docker-compose.local.yml up --build</p>
<p>2. sh ../enter.sh</p>
<p>3. перейти на http://localhost:3000/</p>

<h2>Описание</h2>

<p>Так как интеграция с чат гпт платная пришлось искать обходные пути. В данном проекте был прикручен микросервис на питоне, задача которого через питоновскую опенсорсную библиотеку пиратить запросы в чат гпт 4-mini :)</p>
<p>Бэкенд на Ларавел предназначен для роли основного сервера, который будет связываться с другими (при масштабировании)</p>
<p>Фронт написал на next</p>