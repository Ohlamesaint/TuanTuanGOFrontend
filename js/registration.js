var newUserSubmit = document.querySelector("#newUserSubmit");
var newUser = document.forms.namedItem("newUser");
var newProduct = document.forms.namedItem("newProduct");
var headPaste = document.querySelector("#headPaste");
var newProductSubmit = document.querySelector("#newProductSubmit");
var testProduct = document.forms.namedItem("testProduct");
var testSubmit = document.querySelector("#testSubmit");

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
            document.querySelector("#error").textContent = ""
            axios({
                method: "POST",
                url: "http://tuantuango-backend.herokuapp.com/api/v1/user/signUp",
                headers: {
                    'Content-Type':  'multipart/form-data',
                },
                data: bodyFormData,
            }).then(res => {
                axios({
                    method: "POST",
                    url: "https://tuantuango.herokuapp.com/addProduct",
                    headers: {
                        'content-type': 'multipart/form-data',
                        'authorization': res.token
                    },
                    data: bodyFormDataProduct,
                })
                console.log(res);
                // localStorage.setItem('token', res.token);
            })
            .catch(err=>{
                throw new Error(err);
            })
        }
    })
    newProductSubmit.addEventListener("click", ()=>{
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
            document.querySelector("#errorProduct").textContent = ""
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
    testSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let form = new FormData(testProduct);
        console.log(form);

        axios({
            method: "POST",
            url: "https://tuantuango.herokuapp.com/static/test",
            data: form,
            // withCredentials: true,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            throw new Error(err);
        })
    })
})

