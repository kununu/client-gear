# kununu-icons
kununu-icons is [kununu's](https://wwww.kununu.com) collection of SVG icons used across different projects of ours. These icons can be easily imported as React components.

## Setup
### Install with `npm` or `yarn`
```sh
npm i @kununu/kununu-icons
# OR
yarn add @kununu/kununu-icons
```

### Usage
Each icon can be imported separatedly, see the list [here](https://github.com/kununu/client-gear/tree/master/packages/kununu-icons).

```javascript
import IconPlus from '@kununu/kununu-icons/dist/Plus';
import IconClose from '@kununu/kununu-icons/dist/Close';

<IconPlus />
<IconClose />
```

You can assign them classes too:
```javascript
<IconPlus className={styles.iconGreen} />
```
