var belowBar = document.querySelectorAll(".below>ul>li");
var title = document.querySelector("#title");
var middleWraps = document.querySelectorAll(".wrap>div");
var back = document.querySelector("#back");
var middleWrapRowList = document.querySelectorAll(".wrap>div>div>.row")  
var headPaste = document.querySelector( "#headPaste" );
const tl = new TimelineMax({repeat:-1});
tl.staggerFrom(['#block_chain > path:nth-child(1)', '#block_chain > path:nth-child(2)', '#block_chain > path:nth-child(3)', '#block_chain > path:nth-child(4)','#block_chain > path:nth-child(5)','#block_chain > path:nth-child(6)','#block_chain > path:nth-child(7)','#block_chain > path:nth-child(8)','#block_chain > path:nth-child(9)','#block_chain > path:nth-child(10)','#block_chain > path:nth-child(11)','#block_chain > path:nth-child(12)','#block_chain > path:nth-child(13)','#block_chain > path:nth-child(14)','#block_chain > path:nth-child(15)','#block_chain > path:nth-child(16)','#block_chain > path:nth-child(17)','#block_chain > path:nth-child(18)','#block_chain > path:nth-child(19)','#block_chain > path:nth-child(20)','#block_chain > path:nth-child(21)','#block_chain > path:nth-child(22)','#block_chain > path:nth-child(23)','#block_chain > path:nth-child(24)'], 0.5, 
{scaleY:0, scaleX: 0, transformOrigin: "center",ease: Bounce.easeOut, stagger:0.2});
tl.staggerTo(['#block_chain > path:nth-child(1)', '#block_chain > path:nth-child(2)', '#block_chain > path:nth-child(3)', '#block_chain > path:nth-child(4)','#block_chain > path:nth-child(5)','#block_chain > path:nth-child(6)','#block_chain > path:nth-child(7)','#block_chain > path:nth-child(8)','#block_chain > path:nth-child(9)','#block_chain > path:nth-child(10)','#block_chain > path:nth-child(11)','#block_chain > path:nth-child(12)','#block_chain > path:nth-child(13)','#block_chain > path:nth-child(14)','#block_chain > path:nth-child(15)','#block_chain > path:nth-child(16)','#block_chain > path:nth-child(17)','#block_chain > path:nth-child(18)','#block_chain > path:nth-child(19)','#block_chain > path:nth-child(20)','#block_chain > path:nth-child(21)','#block_chain > path:nth-child(22)','#block_chain > path:nth-child(23)','#block_chain > path:nth-child(24)'], 0.5, 
{scaleY:0, scaleX: 0, transformOrigin: "center",ease: Bounce.easeOut, stagger:0.2});
tl.pause();
let complete_list = [{
        name: "toilet",
        count: 2,
        price: 30,
        contract_address: 0x01
    },{
        name: "wine",
        count: 2,
        price: 100,
        contract_address: 0x02
    },{
        name: "apple",
        count: 2,
        price: 69,
        contract_address: 0x03
    },{
        name: "orange",
        count: 2,
        price: 87,
        contract_address: 0x04
    }
];
let ongoing_list = [{
    name: "noodle",
    count: 2,
    price: 100,
    contract_address: 0x06
},{
    name: "cloth",
    count: 2,
    price: 69,
    contract_address: 0x07
},{
    name: "brush",
    count: 2,
    price: 87,
    contract_address: 0x08
},{
    name: "bag",
    count: 2,
    price: 87,
    contract_address: 0x08
}
];
function t(){
    return new Promise((resolve, reject) => {
        // 傳入 resolve 與 reject，表示資料成功與失敗
        if (true) {
        setTimeout(function () {
            // 3 秒時間後，透過 resolve 來表示完成
            resolve();
    }, 3000);
}
})}
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
                console.log(res);
                var target = document.querySelector( "#complete_list" );
                complete_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){ 
                        target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-last">
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="d-flex flex-column bd-highlight mb-3">
                                    <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                    <div class="colorgraph"></div>
                                    <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                    <div class="p-2 bd-highlight">${element.name}</div>
                                    <div class="p-2 bd-highlight border bg-light">Amount</div>
                                    <div class="p-2 bd-highlight">${element.count}</div>
                                    <div class="p-2 bd-highlight border bg-light">Price</div>
                                    <div class="p-2 bd-highlight">${element.price}$</div>
                                    <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                    <div class="p-2 bd-highlight">${element.contract_address}</div>
                                    <div class="colorgraph"></div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    }
                    else{
                        target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-top">
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="d-flex flex-column bd-highlight mb-3">
                                    <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                    <div class="colorgraph"></div>
                                    <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                    <div class="p-2 bd-highlight">${element.name}</div>
                                    <div class="p-2 bd-highlight border bg-light">Amount</div>
                                    <div class="p-2 bd-highlight">${element.count}</div>
                                    <div class="p-2 bd-highlight border bg-light">Price</div>
                                    <div class="p-2 bd-highlight">${element.price}$</div>
                                    <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                    <div class="p-2 bd-highlight">${element.contract_address}</div>
                                    <div class="colorgraph"></div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    }
                });
                target = document.querySelector( "#ongoing_list" );
                ongoing_list.forEach(function(element, idx, array){
                    if (idx === array.length - 1){ 
                        target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-last">
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="d-flex flex-column bd-highlight mb-3">
                                    <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                    <div class="colorgraph"></div>
                                    <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                    <div class="p-2 bd-highlight">${element.name}</div>
                                    <div class="p-2 bd-highlight border bg-light">Amount</div>
                                    <div class="p-2 bd-highlight">${element.count}</div>
                                    <div class="p-2 bd-highlight border bg-light">Price</div>
                                    <div class="p-2 bd-highlight">${element.price}$</div>
                                    <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                    <div class="p-2 bd-highlight">${element.contract_address}</div>
                                    <div class="colorgraph"></div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    }
                    else{
                        target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-top">
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="d-flex flex-column bd-highlight mb-3">
                                    <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                    <div class="colorgraph"></div>
                                    <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                    <div class="p-2 bd-highlight">${element.name}</div>
                                    <div class="p-2 bd-highlight border bg-light">Amount</div>
                                    <div class="p-2 bd-highlight">${element.count}</div>
                                    <div class="p-2 bd-highlight border bg-light">Price</div>
                                    <div class="p-2 bd-highlight">${element.price}$</div>
                                    <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                    <div class="p-2 bd-highlight">${element.contract_address}</div>
                                    <div class="colorgraph"></div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    }
                });
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
                document.querySelector("#walletCash").textContent = "Balance : " + res.data.balance;
                $('#userForm').bootstrapValidator();
                tl.resume();
            }
        }).catch(err=>{
            throw new Error(err);
        })
        document.querySelector( "#money_send" ).addEventListener("click", async()=>{
            var flag = $('#userForm').data("bootstrapValidator").isValid();
            if(flag) {
                console.log("send_money_post ",document.querySelector( "#nn" ).value);
                var message = document.createElement("p");
                message.innerText = "Wait for sending ...";
                document.querySelector( "#send_message" ).appendChild(message);
                await t();
                document.querySelector( "#send_message" ).removeChild(message);
                $('#store').modal('hide');
            }
            else{
                console.log("money error");
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
                        document.querySelector("#user").textContent = res.data.username;
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
                        document.querySelector("#walletCash").textContent = "Balance : " + res.data.balance;
                        $('#userForm').bootstrapValidator();
                        tl.resume();
                    }
                }).catch(err=>{
                    throw new Error(err);
                })
                document.querySelector( "#money_send" ).addEventListener("click", async()=>{
                    var flag = $('#userForm').data("bootstrapValidator").isValid();
                    if(flag) {
                        console.log("send_money_post ",document.querySelector( "#nn" ).value);
                        var message = document.createElement("p");
                        message.innerText = "Wait for sending ...";
                        document.querySelector( "#send_message" ).appendChild(message);
                        await t();
                        document.querySelector( "#send_message" ).removeChild(message);
                        $('#store').modal('hide');
                    }
                    else{
                        console.log("money error");
                    }
                })
            }
            else if(i == 1){
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
                        console.log("success");
                        console.log(res);
                        var target = document.querySelector( "#complete_list" );
                        complete_list.forEach(function(element, idx, array){
                            if (idx === array.length - 1){ 
                                target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-last">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="d-flex flex-column bd-highlight mb-3">
                                            <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                            <div class="colorgraph"></div>
                                            <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                            <div class="p-2 bd-highlight">${element.name}</div>
                                            <div class="p-2 bd-highlight border bg-light">Amount</div>
                                            <div class="p-2 bd-highlight">${element.count}</div>
                                            <div class="p-2 bd-highlight border bg-light">Price</div>
                                            <div class="p-2 bd-highlight">${element.price}$</div>
                                            <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                            <div class="p-2 bd-highlight">${element.contract_address}</div>
                                            <div class="colorgraph"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            }
                            else{
                                target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-top">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="d-flex flex-column bd-highlight mb-3">
                                            <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                            <div class="colorgraph"></div>
                                            <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                            <div class="p-2 bd-highlight">${element.name}</div>
                                            <div class="p-2 bd-highlight border bg-light">Amount</div>
                                            <div class="p-2 bd-highlight">${element.count}</div>
                                            <div class="p-2 bd-highlight border bg-light">Price</div>
                                            <div class="p-2 bd-highlight">${element.price}$</div>
                                            <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                            <div class="p-2 bd-highlight">${element.contract_address}</div>
                                            <div class="colorgraph"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            }
                        });
                        target = document.querySelector( "#ongoing_list" );
                        ongoing_list.forEach(function(element, idx, array){
                            if (idx === array.length - 1){ 
                                target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-last">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="d-flex flex-column bd-highlight mb-3">
                                            <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                            <div class="colorgraph"></div>
                                            <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                            <div class="p-2 bd-highlight">${element.name}</div>
                                            <div class="p-2 bd-highlight border bg-light">Amount</div>
                                            <div class="p-2 bd-highlight">${element.count}</div>
                                            <div class="p-2 bd-highlight border bg-light">Price</div>
                                            <div class="p-2 bd-highlight">${element.price}$</div>
                                            <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                            <div class="p-2 bd-highlight">${element.contract_address}</div>
                                            <div class="colorgraph"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            }
                            else{
                                target.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 card-top">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="d-flex flex-column bd-highlight mb-3">
                                            <div class="p-2 bd-highlight"><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></div>
                                            <div class="colorgraph"></div>
                                            <div class="p-2 bd-highlight border bg-light">Commodity</div>
                                            <div class="p-2 bd-highlight">${element.name}</div>
                                            <div class="p-2 bd-highlight border bg-light">Amount</div>
                                            <div class="p-2 bd-highlight">${element.count}</div>
                                            <div class="p-2 bd-highlight border bg-light">Price</div>
                                            <div class="p-2 bd-highlight">${element.price}$</div>
                                            <div class="p-2 bd-highlight border bg-light">Contract Address</div>
                                            <div class="p-2 bd-highlight">${element.contract_address}</div>
                                            <div class="colorgraph"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            }
                        });
                    }
                }).catch(err=>{
                    throw new Error(err);
                })
            }
        }, false)
    }
})