const vapidKey = 'BGxHf6ZQkHVoIdROO4Fir61eouPlqUp3IzxsV4ud10FeXgS5vvG9q3Gw5J7lsp2XHnF_49aJ9RxWNV99_TD9--8';

const send = async () => {
    try{
        const register = await navigator.serviceWorker.register('./sw.js');
        const userChoice = await askForNotificationPermission();
        if(userChoice){
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey)
            })
            await fetch('https://localhost:3000/api/v1/subscription', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(subscription) 
        })
    } else {
        console.log('user denied');
    }
} catch (err) {
    console.log('something went wrong => app => send', err);
}
}

if("serviceWorker" in navigator){
    send().catch(err => console.log(err));
    // navigator.serviceWorker.register("./sw.js")
    // .then((reg) => {
    //     console.log("service worker registered", reg) 
    //     let enableNotifications = document.querySelectorAll('.enable-notification');
    //     if('Notification' in window) {
    //         for(let i=0; i<enableNotifications.length; i++){
    //             enableNotifications[i].style.display = 'inline-block';
    //             enableNotifications[i].addEventListener('click', askForNotificationPermission);
    //         }
    //     }
    // }).catch((err) => {
    //     console.log(new Error("service worker not registered"), err)
    // })
}




function askForNotificationPermission() {
    Notification.requestPermission((status) => {
        console.log('User choice', status);
        if(status!=='granted'){
            console.log('user denied');
            return false;
        } else {
            return true;
        }
    })
} 

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function setPushSubcribe() {
    let serviceWorkerRegistration;
    navigator.serviceWorker.ready
    .then((sw) => {
        serviceWorkerRegistration = sw;
        return sw.pushManager.getSubscription();
    }).then((sub) => {
        console.log(sub);
        if(sub === null){
            let vapidKey = 'BBm9Lg4XNHlqrXibp3jvAOUQQ4QrFSV-ibDBznIqWku2ygTmH6Siy25n_koaK6NGmhfvLxCmnqkqKtG-WrHi2ts';
            let convertedVapidKey = urlBase64ToUint8Array(vapidKey);
            serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            }).then((newSub) => {
                console.log(newSub);
                return axios({
                    method:'post',
                    url: "https://tuantuango.herokuapp.com/subscribe",
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: newSub
                }).then((res) => {
                    console.log('push registration success', res);
                }).catch((err) => {
                    console.log('Something went wrong => fallback => newSub', err);
                })
            });
        } else {
            console.log(sub);
        }
    })
}

