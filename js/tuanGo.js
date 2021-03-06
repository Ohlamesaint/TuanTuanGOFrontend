// import { resolve } from "dns";
let svg1 = document.querySelector('svg#blockchain');
let nodelist1 = svg1.querySelectorAll(".path")
let pathes1 = Array.prototype.slice.call(nodelist1);

let svg2 = document.querySelector('svg#buy-sign');
let nodelist2 = svg2.querySelectorAll(".path")
let pathes2 = Array.prototype.slice.call(nodelist2);

let svg3 = document.querySelector('svg#buycar');
let nodelist3 = svg3.querySelectorAll(".path")
let pathes3 = Array.prototype.slice.call(nodelist3);

let svg4 = document.querySelector('svg#buydate');
let nodelist4 = svg4.querySelectorAll(".path")
let pathes4 = Array.prototype.slice.call(nodelist4);

let svg5 = document.querySelector('svg#ethereum');
let nodelist5 = svg5.querySelectorAll(".path")
let pathes5 = Array.prototype.slice.call(nodelist5);

let svg6 = document.querySelector('svg#icon_buy');
let nodelist6 = svg6.querySelectorAll(".path")
let pathes6 = Array.prototype.slice.call(nodelist6);

let svg7 = document.querySelector('svg#smart-contract');
let nodelist7 = svg7.querySelectorAll(".path")
let pathes7 = Array.prototype.slice.call(nodelist7);

let pathALL = [pathes1, pathes2, pathes3, pathes4, pathes5, pathes6, pathes7];
let lengths = [];





var QRcode = document.querySelector("#QRcode");
var tuanGoer = document.querySelectorAll("body>i");
var footer = document.querySelectorAll("footer");
var title = document.querySelector("#title");
var contentOne = document.querySelector("#contentOne");
var contentTwo = document.querySelector("#contentTwo");
var contentThree = document.querySelector("#contentThree");
let productDetail = {};

var formArray = document.querySelectorAll("form");
var productInform = {};
var TuanGOType = 0;

for(let i=0; i<formArray.length; i++){
    $(formArray).submit(function (e) { 
        e.preventDefault();
    })
}

let options = {
    continuous: true,
    video: document.getElementById('preview'),
    mirror: true,
    refractoryPeriod: 5000,
    scanPeriod: 3000,
}

function showEventOne(){
    tuanGoer[0].setAttribute("style", "color: whitesmoke; left: 23%;")
    $(contentOne).addClass("showUp");
    $(footer[0]).addClass("showFooter");
}
function showEventTwo(){
    tuanGoer[1].setAttribute("style", "color: whitesmoke; left: 23%;")
    $(contentTwo).addClass("showUp");
    $(footer[1]).addClass("showFooter");
}
function showEventThree(){
    tuanGoer[2].setAttribute("style", "color: whitesmoke; left: 23%;")
    $("#contentThree").removeClass("zeroHeight");
    $("#contentThree").addClass("showUp");
    $(footer[2]).addClass("showFooter");
}

function animateCSS(element, animationName, callback) {
    const node = element;
    node.classList.add('animated', animationName);
    
    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);
        
        if (typeof callback === 'function') callback();
    }
    
    node.addEventListener('animationend', handleAnimationEnd);
}

const initQrCodeScanner = () => {
    return new Promise((resolve, reject)=>{
        let scanner = new Instascan.Scanner(options);
        Instascan.Camera.getCameras().then(cameras => {
            scanner.camera = cameras[cameras.length - 1];
            scanner.start();
        }).catch(console.error);
        
        scanner.addListener('scan', content => {
            let HTTPScheck = /^(https):\/\/(tuantuango-backend.herokuapp.com)\/(api)\/(v1)\/(product)\/(getProduct)\/[0-9]*$/;
            let URLresult = content;
            console.log(content);
            if(HTTPScheck.test(URLresult)){
                // let result = document.createElement("div");
                axios({
                    method: 'GET',
                    url: URLresult,
                }).then(res => {
                    var supportsVibrate = "vibrate" in navigator;
                    if(supportsVibrate){
                        navigator.vibrate(300);
                    }else{
                        console.log("can't not vibrate");
                    }
                    let getJson = JSON.stringify(res.data);
                    QRcode.innerHTML =  `
                    <div id="${res.data.data[0].productID}" class="w-100 card mt-3" style="box-shadow: 1px 1px 1px 0px silver">
                    <img src="${res.data.data[0].productPhoto}" class="card-img-top" alt="...">
                    <div class="card-body" style="text-align : left; background: white; color: rgb(145, 93, 93))">
                    <h4 class="card-title" style=" font-size: 1.5rem">${res.data.data[0].productName}</h4>
                    </div>
                    </div>
                    `;
                    // QRcode.appendChild(result);
                    scanner.stop();
                    // document.getElementById('preview').setAttribute('class', 'blur_effect');
                    $(footer[0]).children().css("color", "rgb(145, 93, 93);");
                    $(footer[0]).css("background-color", "rgba(192, 121, 121, 0.5)")
                    tuanGoer[0].removeEventListener('transitionend', showEventOne, false);
                    footer[0].addEventListener("click", ()=>{
                        $("#contentOne").removeClass("showUp");
                        $(footer[0]).removeClass("showFooter");            //此時footer[0]會沉下去
                        $(tuanGoer[0]).css("color", "rgb(145, 93, 93)");
                        document.querySelector("#contentOne").addEventListener("transitionend", ()=>{
                            $(tuanGoer[0]).addClass("tuanGoeranimate");
                            tuanGoer[0].addEventListener("animationend", ()=>{
                                $(tuanGoer[0]).removeClass('firstMove');
                                $(tuanGoer[0]).removeClass("tuanGoeranimate");
                                $(tuanGoer[0]).addClass("hide");
                                tuanGoer[0].removeAttribute("style");
                                $(footer[0]).children().css("color", "white");
                                $(footer[0]).css("background-color", "rgb(177, 177, 177)")
                                scanner.stop();
                                resolve(getJson);
                            })
                        })
                    }, false)
                })
                .catch(err=>{
                    reject(err);
                })
            }
            else {
                console.log("scan failure");
            }
        });
    })
};



$(document).ready(()=>{
    const TOKEN = 'Bearer '+localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = TOKEN
    back.addEventListener("click", (evt) => {
        evt.preventDefault();
        window.location.replace('../main.html');
    })
    var i = 0;
    pathALL.forEach((el)=>{
        el.forEach((el, i) => {
            let len = el.getTotalLength();
            lengths.push(len);
            el.style.strokeDasharray = len;
            el.style.strokeDashoffset = len; 
            setTimeout(()=>{
                el.classList.add("path-line");
            })
        });
    })
    var login = function(el){
        return new Promise(function(resolve, reject){
            setTimeout(()=>{
                el.forEach((el, i) => {
                    el.style.strokeDashoffset = 0;
                })
            });
            setTimeout(()=>{
                el.forEach((el, i) => {
                    let len = el.getTotalLength();
                    lengths.push(len);
                    el.style.strokeDasharray = len;
                    el.style.strokeDashoffset = len; 
                })
            }, 2330);
            setTimeout(()=>{ 
                resolve(i+1);
            }, 4800);
        });
    }
    function iconShowing(){
        login(pathALL[i])
        .then(function(res){
            i++;
            return login(pathALL[i]);
        }).then(function(res){
            i++;
            return login(pathALL[i]);
        }).then(function(res){
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i=0;
        })
    };
    iconShowing();
    window.setInterval(function(){
        iconShowing();
    }, 34200);
    
    $(tuanGoer[0]).addClass('firstMove');
    tuanGoer[0].addEventListener('transitionend', showEventOne, false)
    document.querySelector("#nav-profile-tab").addEventListener("click", ()=>{
        initQrCodeScanner().then((res)=>{
            // $(footer[1]).off();
            let productDetail = JSON.parse(res);
            productInform = productDetail;
            title.textContent = "2. TuanGO Setting";
            $(tuanGoer[1]).addClass('firstMove');
            tuanGoer[1].addEventListener('transitionend', showEventTwo, false)          //第二個畫面出現
            document.querySelector(".topPhoto").style.backgroundImage = `url("${productInform.data[0].productPhoto}")`
            document.querySelector(".name").textContent = productInform.data[0].productName;
            document.querySelector("input[name=promoteExpiration]").min = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
            document.querySelector("input[name=promoteExpiration]").value = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
            document.querySelector("input[name=promoteExpiration]").max = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+7).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
            document.querySelector("#promoteProductNumLabel").textContent = `Please input the amount that you want to purchase (less than ${productInform.data[0].promotionLowestNum}) :`;
            
            document.querySelector("input[name=Expiration]").min = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
            document.querySelector("input[name=Expiration]").value = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
            document.querySelector("input[name=Expiration]").max = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+7).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
            document.querySelector("#unpackedProductNumLabel").textContent = `Please input the amount that you want to purchase (less than ${productDetail.data[0].unpackableAmount}) :`;
            
            if(productDetail.data[0].hasPromotion === false){
                $("#promoteFallback").removeClass('hide').addClass('showUp');
                $("#promoteForm").addClass('hide');
            }
            if(productDetail.data[0].unpackable === false){
                $("#unpackedFallback").removeClass('hide').addClass('showUp');
                $("#unpackedForm").addClass('hide');
            }
            $("#promoteToggle").on("click", ()=>{
                TuanGOType = 0;     //promote
                if(productDetail.data[0].hasPromotion === false){
                    $("#promoteFallback").removeClass('hide').addClass('showUp');
                    $("#promoteForm").addClass('hide');
                }else{
                    $("#promoteForm").addClass('showUp');
                }
            })
            {        
                let check = 0;
                document.querySelector("input[name=promoteExpiration]").addEventListener("click", ()=>{
                    
                    document.querySelector("input[name=promoteExpiration]").min = moment().format('YYYY')+"-"+moment().format('MM')+"-"+'0'+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
                    document.querySelector("input[name=promoteExpiration]").max = moment().format('YYYY')+"-"+moment().format('MM')+"-"+'0'+(parseInt(moment().format('DD'))+7).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
                    if(check === 0||check === 2){
                        $("#promoteWarningText").text("尚未設定購買數量!");
                        check = 2;
                    }
                    else if(check === 1){
                        $("#promoteWarningText").text("");
                        $(footer[1]).children().css("color", "rgb(145, 93, 93);");
                        $(footer[1]).css("background-color", "rgba(192, 121, 121, 0.5)")
                        tuanGoer[1].removeEventListener("transitionend", showEventTwo);
                        footer[1].addEventListener("click", moveToThird, false);
                    }
                })
                document.querySelector("#promoteProductNum").addEventListener("change", ()=>{
                    console.log($("#promoteProductNum").val());
                    console.log(productDetail.data[0].promotionLowestNum);
                    if($("#promoteProductNum").val() > productDetail.data[0].promotionLowestNum){
                        $("#promoteWarningText").text("您超過了最多可選擇的數量!");
                        $(footer[1]).children().css("color", "white");
                        $(footer[1]).css("background-color", "rgb(177, 177, 177)")
                        footer[1].removeEventListener("click", moveToThird);
                    }else if($("#promoteProductNum").val() == undefined){
                        $("#promoteWarningText").text("請填入您所需的數量!");
                        $(footer[1]).children().css("color", "white");
                        $(footer[1]).css("background-color", "rgb(177, 177, 177)");
                        footer[1].removeEventListener("click", moveToThird);
                    }else if($("#promoteProductNum").val() == 0){
                        $("#promoteWarningText").text("團購數不可為0!");
                        $(footer[1]).children().css("color", "white");
                        $(footer[1]).css("background-color", "rgb(177, 177, 177)");
                        footer[1].removeEventListener("click", moveToThird);
                    }else{
                        if(check === 0||check === 1){
                            $("#promoteWarningText").text("尚未設定團購時限!");
                            check = 1;
                        }
                        else if(check === 2){
                            $("#promoteWarningText").text("");
                            $(footer[1]).children().css("color", "rgb(145, 93, 93);");
                            $(footer[1]).css("background-color", "rgba(192, 121, 121, 0.5)")
                            tuanGoer[1].removeEventListener("transitionend", showEventTwo);
                            footer[1].addEventListener("click", moveToThird, false);
                        }
                    }
                })
            };
            $("#unpackToggle").on("click", ()=>{
                TuanGOType = 1;     //unpack
                if(productDetail.data[0].unpackable === false){
                    console.log("productDetail.unpackable = " + productDetail.data[0].unpackable)
                    $("#unpackedFallback").removeClass('hide').addClass('showUp');
                    $("#unpackedForm").addClass('hide');
                }else{
                    $("#unpackedForm").addClass('showUp');
                }
            })
            {
                // 時間會有問題
                let check = 0;
                document.querySelector("input[name=Expiration]").addEventListener("click", ()=>{
                    console.log(moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm'));
                    document.querySelector("input[name=Expiration]").min = moment().format('YYYY')+"-"+moment().format('MM')+"-"+'0'+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
                    // document.querySelector("input[name=Expiration]").value = moment().format('YYYY')+"-"+moment().format('MM')+"-"+(parseInt(moment().format('DD'))+1).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
                    document.querySelector("input[name=Expiration]").max = moment().format('YYYY')+"-"+moment().format('MM')+"-"+'0'+(parseInt(moment().format('DD'))+7).toString()+"T"+moment().format('hh')+":"+moment().format('mm');
                    if(check === 0||check === 2){
                        $("#unpackedWarningText").text("尚未設定團購時限!");
                        check = 2;
                    }else if(check === 1){
                        $("#unpackedWarningText").text("");
                        $(footer[1]).children().css("color", "rgb(145, 93, 93);");
                        $(footer[1]).css("background-color", "rgba(192, 121, 121, 0.5)")
                        tuanGoer[1].removeEventListener("transitionend", showEventTwo);
                        footer[1].addEventListener("click", moveToThird, false);
                    }
                })
                document.querySelector("#unpackedProductNum").addEventListener("change", ()=>{
                    console.log($("#unpackedProductNum").val());
                    console.log(productDetail.data[0].unpackableAmount);
                    if($("#unpackedProductNum").val() > productDetail.data[0].unpackableAmount){
                        $("#unpackedWarningText").text("您超過了最多可選擇的數量!");
                        $(footer[1]).children().css("color", "white");
                        $(footer[1]).css("background-color", "rgb(177, 177, 177)")
                        footer[1].removeEventListener("click", moveToThird);
                    }else if($("#unpackedProductNum").val() == undefined){
                        $("#unpackedWarningText").text("請填入您所需的數量!");
                        $(footer[1]).children().css("color", "white");
                        $(footer[1]).css("background-color", "rgb(177, 177, 177)");
                        footer[1].removeEventListener("click", moveToThird);
                    }else if($("#unpackedProductNum").val() == 0){
                        $("#unpackedWarningText").text("團購數不可為0!");
                        $(footer[1]).children().css("color", "white");
                        $(footer[1]).css("background-color", "rgb(177, 177, 177)");
                        footer[1].removeEventListener("click", moveToThird);
                    }else{
                        if(check === 0||check === 1){
                            $("#unpackedWarningText").text("尚未設定團購時限!");
                            check = 1;
                        }else if(check === 2){
                            $("#promoteWarningText").text("");
                            $(footer[1]).children().css("color", "rgb(145, 93, 93);");
                            $(footer[1]).css("background-color", "rgba(192, 121, 121, 0.5)")
                            tuanGoer[1].removeEventListener("transitionend", showEventTwo);
                            footer[1].addEventListener("click", moveToThird, false);
                        }
                    }
                })
            };
        }).catch((err)=>{
            console.log(err);
        })
    })
    function moveToThird(){
        return new Promise((resolve, reject)=>{
            $("#contentTwo").removeClass("showUp");
            $(footer[1]).removeClass("showFooter");
            $(tuanGoer[1]).css("color", "rgb(145, 93, 93)");
            document.querySelector("#contentTwo").addEventListener("transitionend", ()=>{
                tuanGoer[1].classList.add("tuanGoeranimate");
                tuanGoer[1].addEventListener("animationend", ()=>{
                    $(tuanGoer[1]).removeClass('firstMove');
                    $(tuanGoer[1]).removeClass("tuanGoeranimate");
                    $(tuanGoer[1]).addClass("hide");
                    tuanGoer[1].removeAttribute("style");
                    if(TuanGOType){
                        resolve($("#unpackedProductNum").val());
                    }
                    else{
                        resolve($("#promoteProductNum").val());
                    }
                    reject("wrong in two to three");
                })
            })   
        }).then((res)=>{
            title.textContent = "3. Comfirm TuanGO";
            $("nav").css("box-shadow", "0.5px 0px 1px 0px silver")
            $(tuanGoer[2]).addClass('firstMove');
            tuanGoer[2].addEventListener('transitionend', showEventThree, false)          //第三個畫面出現
            $("#contentThree").removeClass("hide");
            let cardTextList = document.querySelectorAll("#contentThree .card-text");
            let cardPhoto = document.querySelector("#contentThree .card-img-top")
            cardPhoto.src = productInform.data[0].productPhoto;
            if(TuanGOType === 0){
                cardTextList[0].textContent = productInform.data[0].productName;
                cardTextList[1].textContent = "Promote";
                cardTextList[2].textContent = `${res}(in ${productInform.data[0].promotionLowestNum})`;
                cardTextList[3].textContent = `${productInform.data[0].promotionPrice*res}$(${productInform.data[0].promotionPrice}$/per)`;
                cardTextList[4].textContent = `${document.querySelector("input[name=promoteExpiration]").value}`;
            }else if(TuanGOType === 1){
                console.log(productInform.data[0])
                cardTextList[0].textContent = productInform.data[0].productName;
                cardTextList[1].textContent = "Unpack";
                cardTextList[2].textContent = `${res}(in ${productInform.data[0].unpackableAmount})`;
                let buffer = Math.floor((productInform.data[0].price)/(productInform.data[0].unpackableAmount))+1;
                console.log(buffer);
                cardTextList[3].textContent = `${buffer*res}$(${buffer}$/per)`;
                cardTextList[4].textContent = `${document.querySelector("input[name=Expiration]").value}`;
            }
            $(footer[2]).children().css("color", "rgb(145, 93, 93);");
            $(footer[2]).css("background-color", "rgba(192, 121, 121, 0.5)")
        }).catch((err)=>{
            return new Error(err);
        })
    }
    document.querySelector("#comfirmMoveOn").addEventListener("click", ()=>{
        $("#dialog").addClass("showDialog");
        (function(){
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    $("#wrap").addClass("hide");
                    $("#tuanGoComfirm").modal("hide");
                    $("#dialog").removeClass("showDialog");
                    $(footer[2]).addClass("hide");
                    $(tuanGoer[2]).addClass('hide');
                    resolve("good");
                }, 1000);
            }).then((res)=>{
                setTimeout(()=>{
                    $("#conclusion").addClass("showUp");
                    $("body").addClass("resize");
                    return("next");
                }, 1000)
            }).then((res)=>{
                document.querySelector("#wrapConclusion>p").textContent = "deploying contract...";
                console.log({
                    type: TuanGOType,
                    productID : productInform.data[0].productID,
                    setUpTime: moment().format('YYYY')+"-"+moment().format('MM')+"-"+moment().format('DD')+"T"+moment().format('hh')+":"+moment().format('mm'),
                    ExpirationTime : TuanGOType?document.querySelector("input[name=Expiration]").value:document.querySelector("input[name=promoteExpiration]").value,
                })
                axios({
                    method:"post",
                    withCredentials: true,
                    url:"https://tuantuango-backend.herokuapp.com/api/v1/tuango/addTuango",
                    data:{
                        type: TuanGOType,
                        productID : productInform.data[0].productID,
                        setUpTime: moment().format('YYYY')+"-"+moment().format('MM')+"-"+moment().format('DD')+"T"+moment().format('hh')+":"+moment().format('mm'),
                        ExpirationTime : TuanGOType?document.querySelector("input[name=Expiration]").value:document.querySelector("input[name=promoteExpiration]").value,
                    }
                }).then((res)=>{
                    document.querySelector("#wrapConclusion>p").textContent = "adding member...";
                    axios({
                        method: "put",
                        withCredentials: true,
                        url:"https://tuantuango-backend.herokuapp.com/api/v1/tuango/joinTuango",
                        data:{
                            tuangoID: res.data.data._id,
                            amount : TuanGOType?$("#unpackedProductNum").val():$("#promoteProductNum").val(),
                        }
                    }).then((res)=>{
                        document.querySelector("#wrapConclusion>p").textContent = "TuanGO successed!";
                        //網址
                        
                        document.querySelector('#conclusionInform').classList.remove('hide');
                        const goto = document.querySelectorAll('#conclusionInform>a')
                        goto[0].addEventListener('click', (e)=> {
                            e.preventDefault();
                            localStorage.setItem('target', 2)
                            window.location.replace('./func.html');
                        });
                        goto[1].addEventListener('click', (e) => {
                            e.preventDefault();
                            localStorage.setItem('target', 1);
                            window.location.replace('./func.html');
                        });
                    }).catch((err)=>{
                        throw new Error(err);
                    })
                }).catch((err)=>{
                    throw new Error(err);
                })
            }).catch((err)=>{
                throw new Error(err);
            })
        })()
    })
})