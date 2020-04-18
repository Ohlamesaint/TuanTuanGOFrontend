var newUserSubmit = document.querySelector("#newUserSubmit");
var newUser = document.forms.namedItem("newUser");
var headPaste = document.querySelector("#headPaste");
var newProductSubmit = document.querySelector("#newProductSubmit");

$(document).ready(function(){
    headPaste.addEventListener("change", (e)=>{
        console.log(e.target.files);
    })
    $("input[name=unpackable]").on("change", ()=>{
        if(document.querySelector("#unpackable").checked == true){
            document.querySelector("#unpackableAmount").disabled = false;
        }else{
            document.querySelector("#unpackableAmount").disabled = true;
        }
    })
    $("input[name=hasPromotion]").on("change", ()=>{
        if(document.querySelector("#hasPromotion").checked == true){
            document.querySelector("#promotionLowestNum").disabled = false;
            document.querySelector("#promotionPrice").disabled = false;
        }else{
            document.querySelector("#promotionLowestNum").disabled = true;
            document.querySelector("#promotionPrice").disabled = true;
        }
    })
    newUserSubmit.addEventListener("click", ()=>{
        event.preventDefault();
        var bodyFormData = new FormData(newUser);
        var check = true;
        
        for (var key of bodyFormData.entries()) {
            console.log(key[0] + ', ' + key[1]);
            if(key[1] == ""){
                check = false;
            }
        }   
        if(check == false){
            document.querySelector("#error").textContent = "尚有欄位未填"
        }else{
            axios({
                method: "POST",
                url: "https://tuantuango.herokuapp.com/registration",
                headers: {
                    'Content-Type':  'multipart/form-data',
                },
                data: bodyFormData,
            }).then(res => {
                console.log(res);
            })
            .catch(err=>{
                throw new Error(err);
            })
        }
    })
    newProductSubmit.addEventListener("click", ()=>{
        event.preventDefault();
        var bodyFormDataProduct = new FormData(newProduct);
        var check = true;
        console.log(document.querySelector("#hasPromotion").checked);
        console.log(document.querySelector("#unpackable").checked);
        bodyFormDataProduct.append("hasPromotion", document.querySelector("#hasPromotion").checked)
        bodyFormDataProduct.append("unpackable", document.querySelector("#unpackable").checked)
        
        for (var key of bodyFormDataProduct.entries()) {
            console.log(key[0] + ', ' + key[1]);
            if(key[1] == ""){
                check = false;
            }
        }   
        if(check == false){
            document.querySelector("#errorProduct").textContent = "尚有欄位未填"
        }else{
            axios({
                method: "POST",
                url: "https://tuantuango.herokuapp.com/addProduct",
                headers: {
                    'Content-Type':  'multipart/form-data',
                },
                data: bodyFormDataProduct,
            }).then(res => {
                console.log(res);
            })
            .catch(err=>{
                throw new Error(err);
            })
        }
    })
})

