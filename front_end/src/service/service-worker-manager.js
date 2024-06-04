class ServiceWorkerManager {
  constructor() {
    this.registration = null;
  }

  register() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log(
              "Service Worker enregistré avec succès : ",
              registration.scope
            );
            this.registration = registration;
          })
          .catch((error) => {
            console.error(
              "Échec de l'enregistrement du Service Worker : ",
              error
            );
          });
      });
    }
  }
}

const serviceWorkerManager = new ServiceWorkerManager();
export default serviceWorkerManager;
