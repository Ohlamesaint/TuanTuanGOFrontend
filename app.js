const vapidKey = 'BGxHf6ZQkHVoIdROO4Fir61eouPlqUp3IzxsV4ud10FeXgS5vvG9q3Gw5J7lsp2XHnF_49aJ9RxWNV99_TD9--8';

if("serviceWorker" in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    });
}

// const send = async () => {
//     try{
        
//         console.log(123);
//         const userChoice = askForNotificationPermission();
//         setPushSubcribe();
//         // console.log(userChoice);
//         // console.log(123)
//         // if(userChoice){
//         //     const subscription = await register.pushManager.subscribe({
//         //         userVisibleOnly: true,
//         //         applicationServerKey: urlBase64ToUint8Array(vapidKey)
//         //     })
//         //     console.log(JSON.stringify(subscription))
//         //     await fetch('https://tuantuango.herokuapp.com/subscribe', {
//         //     method: 'POST',
//         //     headers: {
//         //         'content-type': 'application/json'
//         //     },
//         //     body: JSON.stringify(subscription) 
//         //     })
//         // } else {
//         //     console.log('user denied');
//         // }
//     } catch (err) {
//         console.log('something went wrong => app => send', err);
//     }
// }












