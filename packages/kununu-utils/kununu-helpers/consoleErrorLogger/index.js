export function consoleErrorLogger(error, label) {
  if (isClientRender()) {
    logger.log('error', {
      custom: true,
      error,
      label,
    });
  }
}

// window.onerror = (msg, url, lineNo, columnNo, error) => {
//   consoleErrorLogger({msg, url, lineNo, columnNo, error}, 'app-reviews');
//
//   return false;
// }
