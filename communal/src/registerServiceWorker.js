export default function registerSw() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('../../sw.js')
                .then(
                    (registration) => {
                        console.log(`Service Worker registered! Scope: ${registration.scope}`);
                    },
                    (err) => {
                        console.log('Service Worker registration failed', err);
                    }
                )
                .catch(err => {
                    console.log(`Service Worker registration failed: ${err}`);
                });
        });
    } else {
        console.log('Service Worker is not supported by browser.');
    }
};
