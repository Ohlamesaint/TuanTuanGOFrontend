var belowBar = document.querySelectorAll(".below>ul>li");
var title = document.querySelector("#title");
var middleWraps = document.querySelectorAll(".wrap>div");
var back = document.querySelector("#back");
var middleWrapRowList = document.querySelectorAll(".wrap>div>div>.row")  
var headPaste = document.querySelector( "#headPaste" );
var mutex = true;
const tl = new TimelineMax({repeat:-1});
tl.staggerFrom(['#block_chain > path:nth-child(1)', '#block_chain > path:nth-child(2)', '#block_chain > path:nth-child(3)', '#block_chain > path:nth-child(4)','#block_chain > path:nth-child(5)','#block_chain > path:nth-child(6)','#block_chain > path:nth-child(7)','#block_chain > path:nth-child(8)','#block_chain > path:nth-child(9)','#block_chain > path:nth-child(10)','#block_chain > path:nth-child(11)','#block_chain > path:nth-child(12)','#block_chain > path:nth-child(13)','#block_chain > path:nth-child(14)','#block_chain > path:nth-child(15)','#block_chain > path:nth-child(16)','#block_chain > path:nth-child(17)','#block_chain > path:nth-child(18)','#block_chain > path:nth-child(19)','#block_chain > path:nth-child(20)','#block_chain > path:nth-child(21)','#block_chain > path:nth-child(22)','#block_chain > path:nth-child(23)','#block_chain > path:nth-child(24)'], 0.5, 
{scaleY:0, scaleX: 0, transformOrigin: "center",ease: Bounce.easeOut, stagger:0.2});
tl.staggerTo(['#block_chain > path:nth-child(1)', '#block_chain > path:nth-child(2)', '#block_chain > path:nth-child(3)', '#block_chain > path:nth-child(4)','#block_chain > path:nth-child(5)','#block_chain > path:nth-child(6)','#block_chain > path:nth-child(7)','#block_chain > path:nth-child(8)','#block_chain > path:nth-child(9)','#block_chain > path:nth-child(10)','#block_chain > path:nth-child(11)','#block_chain > path:nth-child(12)','#block_chain > path:nth-child(13)','#block_chain > path:nth-child(14)','#block_chain > path:nth-child(15)','#block_chain > path:nth-child(16)','#block_chain > path:nth-child(17)','#block_chain > path:nth-child(18)','#block_chain > path:nth-child(19)','#block_chain > path:nth-child(20)','#block_chain > path:nth-child(21)','#block_chain > path:nth-child(22)','#block_chain > path:nth-child(23)','#block_chain > path:nth-child(24)'], 0.5, 
{scaleY:0, scaleX: 0, transformOrigin: "center",ease: Bounce.easeOut, stagger:0.2});
tl.pause();
let complete_list = [{
    name: "toilet",
    img:"https://www.costco.com.tw/medias/sys_master/images/h19/hd6/11953562714142.jpg",
    count: 2,
    price: 30,
    contract_address: 0x01,
    TuanGOType:'unpack',
    TotalAmount:12,
    SoldAmounts:12,
    ExpirationTime:1587743302000,
    disccountPrice:60
},{
    name: "wine",
    img:"https://www.costco.com.tw/medias/sys_master/images/h06/hef/16020188528670.jpg",
    count: 2,
    price: 100,
    contract_address: 0x02,
    TuanGOType:'promote',
    TotalAmount:5,
    SoldAmounts:5,
    ExpirationTime:1587513600000,
    disccountPrice:250
}
];
let ongoing_list = [{
    name: "noodle",
    img:"https://www.costco.com.tw/medias/sys_master/images/h83/h85/27140120117278.jpg",
    count: 2,
    price: 100,
    contract_address: 0x06,
    TuanGOType:'promote',
    TotalAmount:12,
    SoldAmounts:5,
    ExpirationTime:1587743302000,
    disccountPrice:100
},{
    name: "cloth",
    img:"https://www.costco.com.tw/medias/sys_master/images/ha5/hbc/26500719312926.jpg",
    count: 2,
    price: 69,
    contract_address: 0x07,
    TuanGOType:'unpack',
    TotalAmount:2,
    SoldAmounts:1,
    ExpirationTime:1587743302000,
    disccountPrice:99
},{
    name: "brush",
    img:"https://www.costco.com.tw/medias/sys_master/images/h44/he1/14072295915550.jpg",
    count: 2,
    price: 87,
    contract_address: 0xa08,
    TuanGOType:'unpack',
    TotalAmount:6,
    SoldAmounts:4,
    ExpirationTime:1587743302000,
    disccountPrice:87
},{
    name: "bag",
    img:"https://www.costco.com.tw/medias/sys_master/images/hc1/hb2/10151705411614.jpg",
    count: 2,
    price: 87,
    contract_address: 0xd87,
    TuanGOType:'promote',
    TotalAmount:3,
    SoldAmounts:1,
    ExpirationTime:1587743302000,
    disccountPrice:666
}
];
let transfer_list = [{
    name: "noodle",
    img:"https://www.costco.com.tw/medias/sys_master/images/h83/h85/27140120117278.jpg",
    count: 2,
    price: 100,
    contract_address: 0x06,
    TuanGOType:'promote',
    TotalAmount:12,
    SoldAmounts:12,
    ExpirationTime:1587743302000,
    disccountPrice:100
}];
// function t(){
//     return new Promise((resolve, reject) => {
//         // 傳入 resolve 與 reject，表示資料成功與失敗
//         if (true) {
//         setTimeout(function () {
//             // 3 秒時間後，透過 resolve 來表示完成
//             resolve();
//     }, 3000);
// }
// })}
$(document).ready(function(){
    var targetPage = localStorage.getItem("target");
    $(belowBar[targetPage]).addClass("actived");
    $(belowBar[targetPage]).children().addClass("actived-word");
    title.innerHTML=`
    ${belowBar[targetPage].dataset.name}
    `;
    $(middleWraps[targetPage]).siblings().removeClass("activePage");
    $(middleWraps[targetPage]).addClass("activePage");
    back.addEventListener("click", (evt)=>{
        evt.preventDefault();
        window.location.replace('../main.html');
    })
    let init = middleWrapRowList[targetPage].children;
    console.log(init);
    $(init).addClass("fadeIn");
    
    
    if(targetPage == 0){     //my profile 利用req.session來查詢並獲得
        axios({
            method: "GET",
            url: "https://tuantuango.herokuapp.com/profile",
            withCredentials: true,
        }).then(res=>{
            
            if(!res.data.signin){    //做保險
                console.log(res);
                console.log("789");
                setTimeout(() => {
                    window.location.replace('./login.html');
                }, );
            }else{
                
                console.log(res.data.headPaste);
                console.log(res);
                document.querySelector("#user").textContent = res.data.user;
                document.querySelector("#username").textContent = res.data.username;
                document.querySelector("#phoneNumber").textContent = res.data.phoneNumber;
                document.querySelector("#email").textContent = res.data.email;
                document.querySelector("#address").textContent = res.data.address;
                // document.querySelector("#region").textContent = res.data.username;
                var blob = new Blob( [res.data.headPaste], { type: "image/jpg" } );
                console.log(blob);
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL( blob );
                var reader = new FileReader();
                reader.onload = (()=>{
                    console.log(reader.result);
                    var image = new Image();
                    image.src = reader.result;
                    document.body.appendChild(image);
                    // headPaste.setAttribute("style", `backgound-image: url(${reader.result})`);
                })
                reader.readAsDataURL(blob);
            }
        }).catch(err=>{
            throw new Error(err);  
        })
    }
    else if(targetPage == 1){
        axios({
            method: "GET",
            url: "https://tuantuango.herokuapp.com/userTuangoList",
            withCredentials: true,
        }).then(res=>{
            if(!res.data.signin){    //做保險
                console.log(res);
                setTimeout(() => {
                    window.location.replace('./login.html');
                }, );
            }else{
                console.log("success");
                //console.log(res);
                var target = document.querySelector( "#complete_list" );
                complete_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){ 
                        target.innerHTML += `<div style="margin-bottom:6rem;" class = "joinlist_complete">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src="${element.img}" alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                    else{
                        target.innerHTML += `<div class="mb-4 joinlist_complete">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                });
                let cardList = document.querySelectorAll('.joinlist_complete');
                for(let i=0; i<cardList.length; i++){
                    $(cardList[i]).on('click', (e)=>{      //注意id綁定不包含0x
                        e.preventDefault();
                        document.querySelector("#JoinTuanGOProductName").textContent = complete_list[i].name;
                        document.querySelector("#ProductImg").src = complete_list[i].img;
                        document.querySelector("#JoinTuanGOTuanGOType").textContent = complete_list[i].TuanGOType?'unpack':'promote';
                        document.querySelector("#JoinTuanGOExpirationDate").textContent = new Date(complete_list[i].ExpirationTime).toString().slice(0, 24);
                        document.querySelector("#JoinTuanGOCost").textContent = complete_list[i].disccountPrice +　"$ /per";
                        document.querySelector("#JoinTuanGOContractAddress").textContent = complete_list[i].contract_address;
                        var num = 0;
                        var TuanGOerLine = "";
                        num = complete_list[i].SoldAmounts;
                        localStorage.setItem('unsoldProductAmount', complete_list[i].TotalAmount-num);
                        for(let j=0; j<complete_list[i].TotalAmount; j++){
                            if(j<num) TuanGOerLine += '<i class="fas fa-user"></i>';
                            else TuanGOerLine += '<i class="far fa-user"></i>';
                        }
                        document.querySelector("#JoinTuanGOTuanGOerLine").innerHTML = TuanGOerLine + ' ' + num + '/' + complete_list[i].TotalAmount;
                    })
                };
                target = document.querySelector( "#ongoing_list" );
                ongoing_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){
                        target.innerHTML += `<div style="margin-bottom:6rem;" class = "joinlist_ongoing">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                    else{
                        target.innerHTML += `<div class="mb-4 joinlist_ongoing">
                        <div class="colorgraph"></div>
                        <div class="card" data-toggle="modal" data-target="#productModal">
                        <div class="text-center" style="padding-right: 1rem;">
                        <div class="row" style="padding: 1rem;">
                            <div class="col-4">
                                <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                        Product Name
                                    </div>
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                        ${element.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>  
                        </div>
                        <div class="colorgraph"></div>
                    </div>`
                    }
                })
                let cardList2 = document.querySelectorAll('.joinlist_ongoing');
                    for(let i=0; i<cardList2.length; i++){
                        $(cardList2[i]).on('click', (e)=>{      //注意id綁定不包含0x
                            e.preventDefault();
                            document.querySelector("#JoinTuanGOProductName").textContent = ongoing_list[i].name;
                            document.querySelector("#ProductImg").src = ongoing_list[i].img;
                            document.querySelector("#JoinTuanGOTuanGOType").textContent = ongoing_list[i].TuanGOType?'unpack':'promote';
                            document.querySelector("#JoinTuanGOExpirationDate").textContent = new Date(ongoing_list[i].ExpirationTime).toString().slice(0, 24);
                            document.querySelector("#JoinTuanGOCost").textContent = ongoing_list[i].disccountPrice +　"$ /per";
                            document.querySelector("#JoinTuanGOContractAddress").textContent = ongoing_list[i].contract_address;
                            var num = 0;
                            var TuanGOerLine = "";
                            num = ongoing_list[i].SoldAmounts;
                            localStorage.setItem('unsoldProductAmount', ongoing_list[i].TotalAmount-num);
                            for(let j=0; j<ongoing_list[i].TotalAmount; j++){
                                if(j<num) TuanGOerLine += '<i class="fas fa-user"></i>';
                                else TuanGOerLine += '<i class="far fa-user"></i>';
                            }
                            document.querySelector("#JoinTuanGOTuanGOerLine").innerHTML = TuanGOerLine + ' ' + num + '/' + ongoing_list[i].TotalAmount;
                        })
                    };
                target = document.querySelector( "#transfer_list" );
                transfer_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){
                        target.innerHTML += `<div style="margin-bottom:6rem;" class = "joinlist_transfer">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                    else{
                        target.innerHTML += `<div class="mb-4 joinlist_transfer">
                        <div class="colorgraph"></div>
                        <div class="card" data-toggle="modal" data-target="#productModal">
                        <div class="text-center" style="padding-right: 1rem;">
                        <div class="row" style="padding: 1rem;">
                            <div class="col-4">
                                <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                        Product Name
                                    </div>
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                        ${element.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>  
                        </div>
                        <div class="colorgraph"></div>
                    </div>`
                    }
                })
                let cardList3 = document.querySelectorAll('.joinlist_transfer');
                    for(let i=0; i<cardList3.length; i++){
                        $(cardList3[i]).on('click', (e)=>{      //注意id綁定不包含0x
                            e.preventDefault();
                            document.querySelector("#JoinTuanGOProductName").textContent = transfer_list[i].name;
                            document.querySelector("#ProductImg").src = transfer_list[i].img;
                            document.querySelector("#JoinTuanGOTuanGOType").textContent = transfer_list[i].TuanGOType?'unpack':'promote';
                            document.querySelector("#JoinTuanGOExpirationDate").textContent = new Date(transfer_list[i].ExpirationTime).toString().slice(0, 24);
                            document.querySelector("#JoinTuanGOCost").textContent = transfer_list[i].disccountPrice +　"$ /per";
                            document.querySelector("#JoinTuanGOContractAddress").textContent = transfer_list[i].contract_address;
                            var num = 0;
                            var TuanGOerLine = "";
                            num = transfer_list[i].SoldAmounts;
                            localStorage.setItem('unsoldProductAmount', transfer_list[i].TotalAmount-num);
                            for(let j=0; j<transfer_list[i].TotalAmount; j++){
                                if(j<num) TuanGOerLine += '<i class="fas fa-user"></i>';
                                else TuanGOerLine += '<i class="far fa-user"></i>';
                            }
                            document.querySelector("#JoinTuanGOTuanGOerLine").innerHTML = TuanGOerLine + ' ' + num + '/' + transfer_list[i].TotalAmount;
                        })
                    };
            }
        }).catch(err=>{
            throw new Error(err);
        })
    }
    else if(targetPage == 2){
        axios({
            method: "GET",
            url: "https://tuantuango.herokuapp.com/userWallet",
            withCredentials: true,
        }).then(res=>{
            if(!res.data.signin){    //做保險
                console.log(res);
                setTimeout(() => {
                    window.location.replace('./login.html');
                }, );
            }else{
                console.log("success");
                console.log(res);
                document.querySelector("#walletCash").textContent = res.data.balance + "NT$";
                document.querySelector("#accounthere").textContent =  res.data.account;
                $('#userForm').bootstrapValidator();
                tl.resume();
            }
        }).catch(err=>{
            throw new Error(err);
        })
        document.querySelector( "#money_send" ).addEventListener("click", async()=>{
            if(mutex){
                mutex = false;
                var flag = $('#userForm').data("bootstrapValidator").isValid();
                var message = document.createElement("p");
                if(flag) {
                    document.querySelector( "#money_send" ).disabled = true;
                    message.innerText = "Wait for sending ...";
                    document.querySelector( "#send_message" ).appendChild(message);
                    axios({
                        method: "POST",
                        url: "https://tuantuango.herokuapp.com/sendMoney",
                        withCredentials: true,
                        data: {
                            money: document.querySelector( "#nn" ).value
                        }
                    }).then((res) => {
                        if(res.data.success == false){
                            alert('發生錯誤，加值失敗');
                            throw new Error('send money failed');
                        }
                        alert('加值成功');
                        document.querySelector( "#walletCash ").textContent = res.data.balance;
                        document.querySelector( "#send_message" ).removeChild(message);
                        $('#store').modal('hide');
                        console.log(res);
                        document.querySelector( "#money_send" ).disabled = false;
                    }).catch((err) => {
                        throw new Error(err);
                    })
                    console.log("send_money_post ",document.querySelector( "#nn" ).value);
                    // await t();
                }
                else{
                    message.innerText = "Invalid Number !";
                    console.log("money error");
                }
                mutex = true;
            }
        })
    }
    else if(targetPage == 3){
    }
    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", (e)=>{
            
            $(belowBar[i]).siblings().removeClass("actived");
            $(belowBar[i]).siblings().children().removeClass("actived-word");
            $(belowBar[i]).siblings().children().css("color", "gray");
            $(belowBar[4]).children().css("color", "rgb(145, 93, 93)");
            $(belowBar[i]).addClass("actived");
            $(belowBar[i]).children().addClass("actived-word");
            title.innerHTML=`
            ${belowBar[i].dataset.name}
            `;
            $(middleWraps[i]).siblings().removeClass("activePage");
            $(middleWraps[i]).addClass("activePage");
            
            for(let j=0; j<middleWrapRowList.length; j++){
                if(j==i){
                    let ch = middleWrapRowList[j].children;
                    $(ch).addClass("fadeIn");
                }
                else{
                    let cs = middleWrapRowList[j].children;
                    $(cs).removeClass("fadeIn")
                }
            }
            if(i != 2){
                tl.pause();
            }
            if(i != 1){
                document.querySelector( "#complete_list" ).innerHTML ="";
                document.querySelector( "#ongoing_list" ).innerHTML ="";
                document.querySelector( "#transfer_list" ).innerHTML ="";
            }
            if(i == 0){     //my profile 利用req.session來查詢並獲得
                axios({
                    method: "GET",
                    url: "https://tuantuango.herokuapp.com/profile",
                    withCredentials: true,
                }).then(res=>{
                    
                    if(!res.data.signin){    //做保險
                        console.log(res);
                        console.log("789");
                        setTimeout(() => {
                            window.location.replace('./login.html');
                        }, );
                    }else{
                        console.log("success");
                        console.log(res);
                        document.querySelector("#user").textContent = res.data.user;
                        document.querySelector("#username").textContent = res.data.username;
                        document.querySelector("#phoneNumber").textContent = res.data.phoneNumber;
                        document.querySelector("#email").textContent = res.data.email;
                        document.querySelector("#address").textContent = res.data.address;
                        // document.querySelector("#region").textContent = res.data.username;
                        var blob = new Blob( res.data.headPaste, { type: "image/jpg" } );
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL( blob );
                        headPaste.setAttribute("style", `backgound-image: url(${imageUrl})`);
                    }
                }).catch(err=>{
                    throw new Error(err);
                })
            }
            else if(i == 2){
                axios({
                    method: "GET",
                    url: "https://tuantuango.herokuapp.com/userWallet",
                    withCredentials: true,
                }).then(res=>{
                    if(!res.data.signin){    //做保險
                        console.log(res);
                        setTimeout(() => {
                            window.location.replace('./login.html');
                        }, );
                    }else{
                        console.log("success");
                        console.log(res);
                        document.querySelector("#walletCash").textContent = res.data.balance + "NT$";
                        document.querySelector("#accounthere").textContent =  res.data.account;
                        $('#userForm').bootstrapValidator();
                        tl.resume();
                    }
                }).catch(err=>{
                    throw new Error(err);
                })
                document.querySelector( "#money_send" ).addEventListener("click", async()=>{
                    if(mutex){
                        var flag = $('#userForm').data("bootstrapValidator").isValid();
                        var message = document.createElement("p");
                        if(flag) {
                            document.querySelector( "#money_send" ).disabled = true;
                            message.innerText = "Wait for sending ...";
                            document.querySelector( "#send_message" ).appendChild(message);
                            axios({
                                method: "POST",
                                url: "https://tuantuango.herokuapp.com/sendMoney",
                                withCredentials: true,
                                data: {
                                    money: document.querySelector( "#nn" ).value
                                }
                            }).then((res) => {
                                if(res.data.success == false){
                                    alert('發生錯誤，加值失敗');
                                    throw new Error('send money failed');
                                }
                                alert('加值成功');
                                document.querySelector( "#walletCash ").textContent = res.data.balance;
                                document.querySelector( "#send_message" ).removeChild(message);
                                $('#store').modal('hide');
                                console.log(res);
                                document.querySelector( "#money_send" ).disabled = false;
                            }).catch((err) => {
                                throw new Error(err);
                            })
                            console.log("send_money_post ",document.querySelector( "#nn" ).value);
                            // await t();
                        }
                        else{
                            message.innerText = "Invalid Number !";
                            console.log("money error");
                        }
                        mutex = true;
                    }
                })
            }
            else if(i == 1){
                /*
                axios({
                    method: "GET",
                    url: "https://tuantuango.herokuapp.com/userTuangoList",
                    withCredentials: true,
                }).then(res=>{
                    if(!res.data.signin){    //做保險
                        console.log(res);
                        console.log("789");
                        setTimeout(() => {
                            window.location.replace('./login.html');
                        }, );
                    }else{
                        
                    }
                }).catch(err=>{
                    throw new Error(err);
                })
                */
                console.log("success");
                //console.log(res);
                var target = document.querySelector( "#complete_list" );
                var inx = 0;
                complete_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){ 
                        target.innerHTML += `<div style="margin-bottom:6rem;" class = "joinlist_complete">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src="${element.img}" alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                    else{
                        target.innerHTML += `<div class="mb-4 joinlist_complete">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                });
                let cardList = document.querySelectorAll('.joinlist_complete');
                for(let i=0; i<cardList.length; i++){
                    $(cardList[i]).on('click', (e)=>{      //注意id綁定不包含0x
                        e.preventDefault();
                        document.querySelector("#JoinTuanGOProductName").textContent = complete_list[i].name;
                        document.querySelector("#ProductImg").src = complete_list[i].img;
                        document.querySelector("#JoinTuanGOTuanGOType").textContent = complete_list[i].TuanGOType?'unpack':'promote';
                        document.querySelector("#JoinTuanGOExpirationDate").textContent = new Date(complete_list[i].ExpirationTime).toString().slice(0, 24);
                        document.querySelector("#JoinTuanGOCost").textContent = complete_list[i].disccountPrice +　"$ /per";
                        document.querySelector("#JoinTuanGOContractAddress").textContent = complete_list[i].contract_address;
                        var num = 0;
                        var TuanGOerLine = "";
                        num = complete_list[i].SoldAmounts;
                        localStorage.setItem('unsoldProductAmount', complete_list[i].TotalAmount-num);
                        for(let j=0; j<complete_list[i].TotalAmount; j++){
                            if(j<num) TuanGOerLine += '<i class="fas fa-user"></i>';
                            else TuanGOerLine += '<i class="far fa-user"></i>';
                        }
                        document.querySelector("#JoinTuanGOTuanGOerLine").innerHTML = TuanGOerLine + ' ' + num + '/' + complete_list[i].TotalAmount;
                    })
                };
                target = document.querySelector( "#ongoing_list" );
                ongoing_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){
                        target.innerHTML += `<div style="margin-bottom:6rem;" class = "joinlist_ongoing">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                    else{
                        target.innerHTML += `<div class="mb-4 joinlist_ongoing">
                        <div class="colorgraph"></div>
                        <div class="card" data-toggle="modal" data-target="#productModal">
                        <div class="text-center" style="padding-right: 1rem;">
                        <div class="row" style="padding: 1rem;">
                            <div class="col-4">
                                <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                        Product Name
                                    </div>
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                        ${element.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>  
                        </div>
                        <div class="colorgraph"></div>
                    </div>`
                    }
                    
                })
                let cardList2 = document.querySelectorAll('.joinlist_ongoing');
                    for(let i=0; i<cardList2.length; i++){
                        $(cardList2[i]).on('click', (e)=>{      //注意id綁定不包含0x
                            e.preventDefault();
                            document.querySelector("#JoinTuanGOProductName").textContent = ongoing_list[i].name;
                            document.querySelector("#ProductImg").src = ongoing_list[i].img;
                            document.querySelector("#JoinTuanGOTuanGOType").textContent = ongoing_list[i].TuanGOType?'unpack':'promote';
                            document.querySelector("#JoinTuanGOExpirationDate").textContent = new Date(ongoing_list[i].ExpirationTime).toString().slice(0, 24);
                            document.querySelector("#JoinTuanGOCost").textContent = ongoing_list[i].disccountPrice +　"$ /per";
                            document.querySelector("#JoinTuanGOContractAddress").textContent = ongoing_list[i].contract_address;
                            var num = 0;
                            var TuanGOerLine = "";
                            num = ongoing_list[i].SoldAmounts;
                            localStorage.setItem('unsoldProductAmount', ongoing_list[i].TotalAmount-num);
                            for(let j=0; j<ongoing_list[i].TotalAmount; j++){
                                if(j<num) TuanGOerLine += '<i class="fas fa-user"></i>';
                                else TuanGOerLine += '<i class="far fa-user"></i>';
                            }
                            document.querySelector("#JoinTuanGOTuanGOerLine").innerHTML = TuanGOerLine + ' ' + num + '/' + ongoing_list[i].TotalAmount;
                        })
                    };
                target = document.querySelector( "#transfer_list" );
                transfer_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){
                        target.innerHTML += `<div style="margin-bottom:6rem;" class = "joinlist_transfer">
                            <div class="colorgraph"></div>
                            <div class="card" data-toggle="modal" data-target="#productModal">
                            <div class="text-center" style="padding-right: 1rem;">
                            <div class="row" style="padding: 1rem;">
                                <div class="col-4">
                                    <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                            Product Name
                                        </div>
                                        <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                            ${element.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>  
                            </div>
                            <div class="colorgraph"></div>
                        </div>`
                    }
                    else{
                        target.innerHTML += `<div class="mb-4 joinlist_transfer">
                        <div class="colorgraph"></div>
                        <div class="card" data-toggle="modal" data-target="#productModal">
                        <div class="text-center" style="padding-right: 1rem;">
                        <div class="row" style="padding: 1rem;">
                            <div class="col-4">
                                <img class="img-fluid w-100 h-100" src=${element.img} alt="card image">
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center bd-highlight border bg-light" style="line-height: normal;">
                                        Product Name
                                    </div>
                                    <div class="col-12 h-50 p-1 text-center justify-content-center align-items-center" style="line-height: normal;">
                                        ${element.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>  
                        </div>
                        <div class="colorgraph"></div>
                    </div>`
                    }
                })
                let cardList3 = document.querySelectorAll('.joinlist_transfer');
                    for(let i=0; i<cardList3.length; i++){
                        $(cardList3[i]).on('click', (e)=>{      //注意id綁定不包含0x
                            e.preventDefault();
                            document.querySelector("#JoinTuanGOProductName").textContent = transfer_list[i].name;
                            document.querySelector("#ProductImg").src = transfer_list[i].img;
                            document.querySelector("#JoinTuanGOTuanGOType").textContent = transfer_list[i].TuanGOType?'unpack':'promote';
                            document.querySelector("#JoinTuanGOExpirationDate").textContent = new Date(transfer_list[i].ExpirationTime).toString().slice(0, 24);
                            document.querySelector("#JoinTuanGOCost").textContent = transfer_list[i].disccountPrice +　"$ /per";
                            document.querySelector("#JoinTuanGOContractAddress").textContent = transfer_list[i].contract_address;
                            var num = 0;
                            var TuanGOerLine = "";
                            num = transfer_list[i].SoldAmounts;
                            localStorage.setItem('unsoldProductAmount', transfer_list[i].TotalAmount-num);
                            for(let j=0; j<transfer_list[i].TotalAmount; j++){
                                if(j<num) TuanGOerLine += '<i class="fas fa-user"></i>';
                                else TuanGOerLine += '<i class="far fa-user"></i>';
                            }
                            document.querySelector("#JoinTuanGOTuanGOerLine").innerHTML = TuanGOerLine + ' ' + num + '/' + transfer_list[i].TotalAmount;
                        })
                    };
            }
        }, false)
    }
})