var belowBar = document.querySelectorAll(".below>ul>li");
var tuanGoer = document.querySelector("#tuanGoer");


function element(ele){
    document.querySelector(`#${ele}`);
}

$(document).ready(function(){
    $("#TuanGOerJoinPage>div").on("transitionend", (e) => {
        e.stopPropagation();
    })
    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", (e)=>{
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
                localStorage.setItem("target", i)
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
        checkNum(document.querySelector("#TuanGOerPurchaseAmountInUnpack").value = 0;
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
                    method: "post",
                    url: "http://localhost:3000/api/v1/tuango/joinTuango",
                    withCredentials: true,
                    data: {
                        tuangoID: TuanGOInform._id,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInUnpack").value,
                    }
                }).then((res)=>{
                    alert(res);
                    setTimeout(()=>{
                        document.querySelector("#TuanGOerJoinPage").classList.remove("show");
                        document.querySelector("#TuanGOerJoinPageWrap").classList.remove("show");
                        document.querySelector("#unpackedTabInJoin").classList.remove('active')
                        document.querySelector("#JoinPageTopNav").classList.remove('show')
                        document.querySelector("#footerInJoin").classList.remove('show')
                        document.querySelector("#promoteTabInJoin").classList.remove('active')
                        $("body").css('overflow', '');
                    }, 1000);
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }
    })
    document.querySelector("#TuanGOerPurchaseAmountInPromote").addEventListener("change", ()=>{
        let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
        if(!checkNum(document.querySelector("#TuanGOerPurchaseAmountInPromote").value, JSON.parse(localStorage.getItem('unsoldProductAmount')))){
            document.querySelector("#unpackedWarningText").textContent = 'invalid number!'
            document.querySelector("#footerInJoin").classList.remove('show')
        } else {
            document.querySelector("#unpackedWarningText").textContent = ''
            document.querySelector("#footerInJoin").classList.add('show');
            document.querySelector("#comfirmMoveOnInJoin").addEventListener("click", (event)=>{
                event.preventDefault();
                event.stopPropagation();
                axios({
                    method: "post",
                    url: "http://localhost:3000/api/v1/tuango/joinTuango",
                    withCredentials: true,
                    data: {
                        tuangoID: TuanGOInform._id,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInPromote").value,
                    }
                }).then((res)=>{
                    alert("JOIN TUANGO SUCCESS");
                    setTimeout(()=>{
                        document.querySelector("#TuanGOerJoinPage").classList.remove("show");
                        document.querySelector("#TuanGOerJoinPageWrap").classList.remove("show");
                        document.querySelector("#unpackedTabInJoin").classList.remove('active')
                        document.querySelector("#JoinPageTopNav").classList.remove('show')
                        document.querySelector("#footerInJoin").classList.remove('show')
                        document.querySelector("#promoteTabInJoin").classList.remove('active')
                        $("body").css('overflow', '');                    
                    }, 3000);
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }
    })
})

function checkNum(num, border){
    console.log(num, border);
    if(num == undefined||num == 0||num>border){
        return false;
    } else {
        return true;
    }
}