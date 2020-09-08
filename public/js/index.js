
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log(`sw success`, reg))
      .catch((e) => console.log(`SW registration failed`, e));
}
