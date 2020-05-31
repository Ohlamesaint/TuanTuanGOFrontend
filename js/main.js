var belowBar = document.querySelectorAll(".below>ul>li");
var tuanGoer = document.querySelector("#tuanGoer");
const vapidKey = 'BGxHf6ZQkHVoIdROO4Fir61eouPlqUp3IzxsV4ud10FeXgS5vvG9q3Gw5J7lsp2XHnF_49aJ9RxWNV99_TD9--8';
let mutex = true;


function element(ele){
    document.querySelector(`#${ele}`);
}

$(document).ready(function(){

    // get the token store in localstorage
    const TOKEN = 'Bearer '+localStorage.getItem('token');    

    // ask for the notification authorization
    if(localStorage.getItem('token')!= undefined) {
        setPushSubcribe();
    }

    // set the default axios authorization header
    axios.defaults.headers.common['Authorization'] = TOKEN;
    $("#TuanGOerJoinPage>div").on("transitionend", (e) => {
        e.stopPropagation();
    })

    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", async (e)=>{
            if(!localStorage.getItem('token')){   
                $("body").addClass("modal-open");
                $("#loginPrompt").addClass("show").css("display", "block");
                $("#not").on('click', ()=>{
                    $("body").removeClass("modal-open");
                    $("#loginPrompt").removeClass("show").css("display", "none");
                })
                $("#yes").on('click', ()=>{
                    setTimeout(() => {
                        window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html');
                    }, );
                })
            }else{
                console.log(belowBar[i].children[1].textContent);
                await indexedDBStoreTargetPage(i);
                window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/func.html');
            }
        }, false)
    }
    
    belowBar[4].addEventListener("click", ()=>{
        if(!localStorage.getItem('token')){    //可以順便獲得會員profile
            $("body").addClass("modal-open");
            $("#loginPrompt").addClass("show").css("display", "block");
            $("#not").on('click', ()=>{
                $("body").removeClass("modal-open");
                $("#loginPrompt").removeClass("show").css("display", "none");
            })
            $("#yes").on('click', ()=>{
                setTimeout(() => {
                    window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html');
                }, );
            })
        }else{
            $(tuanGoer).addClass("tuanGoeranimate");
            tuanGoer.addEventListener("animationend", ()=>{
                window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/tuanGo.html');
            })
        }
    }, false)
    
    var signOut = document.querySelector("#signOut");
    signOut.addEventListener("click", (e)=>{
        localStorage.removeItem('token');
    }, false)
    
    document.querySelector("#JoinTuanGO").addEventListener("click", ()=>{
        if(!localStorage.getItem('token')){    
            $("body").addClass("modal-open");
            $("#loginPrompt").addClass("show").css("display", "block");
            $("#not").on('click', ()=>{
                $("body").removeClass("modal-open");
                $("#loginPrompt").removeClass("show").css("display", "none");
            })
            $("#yes").on('click', ()=>{
                setTimeout(() => {
                    window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html');
                }, );
            })
        } else {
            document.querySelector("#TuanGOerJoinPage").classList.add("show");
            document.querySelector('body').setAttribute('style', "overflow: hidden");
        }
    })
    document.querySelector("#back").addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector("#TuanGOerJoinPage").classList.remove("show");
        document.querySelector("#TuanGOerJoinPageWrap").classList.remove("show");
        document.querySelector("#unpackedTabInJoin").classList.remove('active')
        document.querySelector("#JoinPageTopNav").classList.remove('show')
        document.querySelector("#footerInJoin").classList.remove('show')
        document.querySelector("#promoteTabInJoin").classList.remove('active')
        document.querySelector("#TuanGOerPurchaseAmountInPromote").value = 0;
        document.querySelector("#TuanGOerPurchaseAmountInUnpack").value = 0;
        $("body").css('overflow', '');
    })
    document.querySelector("#TuanGOerJoinPage").addEventListener("transitionend", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if($("#TuanGOerJoinPage").hasClass("show")) {
            let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
            document.querySelector("#TuanGOerJoinPageWrap>#topPhoto").style.backgroundImage = `url("${TuanGOInform.productPhoto}")`;
            document.querySelector("#TuanGOerJoinPageWrap>#name").textContent = TuanGOInform.productName;
            document.querySelector("#TuanGOerJoinPageWrap>#TuanGOType").textContent = TuanGOInform.TuanGOType?'unpack':'promote';
            if(TuanGOInform.TuanGOType){
                // unpack
                document.querySelector("#availableAmountInUnpack").textContent = `less than ${JSON.parse(localStorage.getItem('unsoldProductAmount'))+1}`
                document.querySelector("#unpackedTabInJoin").addEventListener('transitionend', (e) => {
                    e.stopPropagation();
                })
                document.querySelector("#unpackedTabInJoin").classList.add('active')
                
            } else{
                document.querySelector("#availableAmountInPromote").textContent = `less than ${JSON.parse(localStorage.getItem('unsoldProductAmount'))+1}`
                document.querySelector("#promoteTabInJoin").addEventListener('transitionend', (e) => {
                    e.stopPropagation();
                })
                document.querySelector("#promoteTabInJoin").classList.add('active')
                
            }
            document.querySelector("#JoinPageTopNav").classList.add('show');
            document.querySelector("#TuanGOerJoinPageWrap").classList.add('show');
        }
    })
    document.querySelector("#TuanGOerPurchaseAmountInUnpack").addEventListener("change", ()=>{
        let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
        if(!checkNum(document.querySelector("#TuanGOerPurchaseAmountInUnpack").value, JSON.parse(localStorage.getItem('unsoldProductAmount')))){
            document.querySelector("#unpackedWarningText").textContent = 'invalid number!'
            document.querySelector("#footerInJoin").classList.remove('show')
        } else {
            document.querySelector("#unpackedWarningText").textContent = ''
            document.querySelector("#footerInJoin").classList.add('show')
            document.querySelector("#comfirmMoveOnInJoin").addEventListener("click", (e)=>{
                axios({
                    method: "put",
                    url: "https://tuantuango-backend.herokuapp.com/api/v1/tuango/joinTuango",
                    withCredentials: true,
                    data: {
                        tuangoID: TuanGOInform.id,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInUnpack").value,
                    }
                }).then((res)=>{
                    alert(res);
                    setTimeout(()=>{
                        window.location.replace("https://ohlamesaint.github.io/TuanTuanGOFrontend/main.html");
                    }, 100);
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }
    })
    document.querySelector("#TuanGOerPurchaseAmountInPromote").addEventListener("change", ()=>{
        if(!checkNum(document.querySelector("#TuanGOerPurchaseAmountInPromote").value, JSON.parse(localStorage.getItem('unsoldProductAmount')))){
            document.querySelector("#unpackedWarningText").textContent = 'invalid number!'
            document.querySelector("#footerInJoin").classList.remove('show')
        } else {
            document.querySelector("#unpackedWarningText").textContent = ''
            document.querySelector("#footerInJoin").classList.add('show');
        }
    })
    document.querySelector("#comfirmMoveOnInJoin").addEventListener("click", (event)=>{
        let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
        event.preventDefault();
        event.stopPropagation();
        if(mutex){
            mutex = false;
            axios({
                method: "put",
                url: "https://tuantuango-backend.herokuapp.com/api/v1/tuango/joinTuango",
                withCredentials: true,
                data: {
                    tuangoID: TuanGOInform.id,
                    amount: document.querySelector("#TuanGOerPurchaseAmountInPromote").value,
                }
            }).then((res)=>{
                alert("JOIN TUANGO SUCCESS");
                setTimeout(()=>{
                    window.location.replace("https://ohlamesaint.github.io/TuanTuanGOFrontend/main.html");
                }, 100);
            }).catch((err)=>{
                console.log(err);
            })
            mutex = true;
        }
    })
})



async function indexedDBStoreTargetPage(num){
    
    var db = new Dexie("targetPageDB");
    db.version(1).stores({
        targetPage: "++id,target"
    });
    db.open();
    
    
    if(await db.targetPage.count() == 0){
        db.targetPage.add({ target: num })
        return 
    }
    db.targetPage.update(1, { target: num })
    console.log(await db.targetPage.get(1));
}

function checkNum(num, border){
    console.log(num, border);
    if(num == undefined||num == 0||num>border){
        return false;
    } else {
        return true;
    }
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
            let vapidKey = 'BJR-j2fVxc_Y-Th-YJ2l6w1n3LmdGzNZVVYn5JgSnEp_n-pBSF9A7CnfPz26jHtCq3RAUyQWhKwdCHivTF8U7eE';
            let convertedVapidKey = urlBase64ToUint8Array(vapidKey);
            serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            }).then((newSub) => {
                console.log(newSub);
                return axios({
                    method:'post',
                    url: "https://tuantuango-backend.herokuapp.com/api/v1/subscription/addSub",
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: { newSub }
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