### Usage
```javascript
import consoleErrorLogger from '@kununu/kununu-utils/dist/kununu-helpers/consoleErrorLogger';

window.onerror = (msg, url, lineNo, columnNo, error) => {
  consoleErrorLogger({msg, url, lineNo, columnNo, error}, 'app-name');
  return false;
}
```
