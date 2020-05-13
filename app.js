if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js")
    .then((reg) => {
        console.log("service worker registered", reg) 
        
        let enableNotifications = document.querySelectorAll('.enable-notification');
        
        if('Notification' in window) {
            for(let i=0; i<enableNotifications.length; i++){
                enableNotifications[i].style.display = 'inline-block';
                enableNotifications[i].addEventListener('click', askForNotificationPermission);
            }
        }
    }).catch((err) => {
        console.log(new Error("service worker not registered"), err)
    })
}

function askForNotificationPermission() {
    Notification.requestPermission((status) => {
        console.log('User choice', status);
        if(status!=='granted'){
            console.log('user denied');
        } else {
            
        }
    })
}