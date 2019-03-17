/* eslint-disable no-console */

import { register } from 'register-service-worker'
import alertify from 'alertify.js'

const notifyUserAboutUpdate = function(worker){
  alertify.confirm("New content is available; please refresh", () => {
    worker.postMessage({action:"skipWaiting"})
  });
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.', registration)
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound (registration) {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      notifyUserAboutUpdate(registration.waiting)
      alert("update availabe, refresh the app")
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
      alert("No internet connection found. App is running in offline mode.")
    },
    error (error) {
      console.error('Error during service worker registration:', error)
      alert('Error during service worker registration:', error)
    }
  });

  let refreshing;
  navigator.serviceWorker.addEventListener("controllerchange" , function(){
    if(refreshing){
      return
    }
    window.location.reload();
    refreshing = true;
  })
}
