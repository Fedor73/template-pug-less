
## Должно быть установлено ##

node.js - https://nodejs.org/ Ставим последнюю версию

**npm**

```bash
$ npm i npm -g --allow-root
```

**bower**

```bash
$ npm i bower -g --allow-root
```

**gulp**

```bash
$ npm i gulp -g --allow-root
```

*обновить версию gulp*
```bash
npm install gulp@next
``` 
```
## Как и где работаем ##
------------------------------------------------------------------------------------
Вся работа ведется в src/

### Сборка ###

## Собираем проект ###

```bash
$ npm i 
```

```bash
$ npm i 
```

По дефолту сборка происходит в build/, вебсервер так же смотрит в эту папку.
------------------------------------------------------------------------------------

*для production*
```bash
$ gulp build
```
*для работы*
```bash
$ gulp dev
```

## Основные команды ###

*подключение миксинов инклюдами*
```bash
$ gulp addInc2pug
```
*Создание папки с стилями в bem-blocks*
```bash
$ gulp create-style --name b-block-name
```
*Проверка js*
```bash
$ gulp eslint
```
*Создание переменной с цветов в variables*
```bash
$ gulp color-create --color --ffffff
```

## Создаем шрифт из иконок ##
------------------------------------------------------------------------------------
в папку добавляем svg файлы.
/src/images/svg_for_icon/

их нужно сохранить определенным образом через illustrator

При сохранении svg следующие настройки

Save your file as SVG with the following settings:

SVG Profiles: SVG 1.1
Fonts Type: SVG
Fonts Subsetting: None
Options Image Location: Embed
Advanced Options
CSS Properties: Presentation Attributes
Decimal Places: 1
Encoding: UTF-8
Output fewer elements: check
Leave the rest unchecked.

