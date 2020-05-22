if("serviceWorker" in navigator){
    console.log('in app');
    navigator.serviceWorker.register('./sw.js')
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    });
}










