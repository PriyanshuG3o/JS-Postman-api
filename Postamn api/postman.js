// console.log('file is included');
let i = 1;
// utility function to get DOM element from string 
function getElementFromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}
//hide the json box initially 
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';
let requestBox = document.getElementById("requestBox");

//show the parameter box 
let para = document.getElementById("para");
para.addEventListener("click", () => {
    parametersBox.style.display = 'block';
    requestBox.style.display = 'none';


})
let json = document.getElementById("json");
json.addEventListener("click", () => {
    parametersBox.style.display = 'none';
    requestBox.style.display = 'block';

})

//add parameters 
btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    // console.log('you clicked on me'); 
    let params = document.getElementById("params");
    let html = '';
    html = `<div class="row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${i + 1}</label>
    <div class="col-sm-4">
        <input type="text" class="form-control" id="parameterKey${i + 1}" placeholder="Eneter parameter ${i + 1} key "
            aria-label="First name">
    </div>
    <div class="col-sm-4">
        <input type="text" class="form-control" id="parameterValue${i + 1}" placeholder="Enter parameter ${i + 1} value"
            aria-label="Last name">
    </div>
    <button class="col btn btn-primary paramsDelete" >-</button>
    </div>`;

    //convert string into dom element    
    let paramElement = getElementFromString(html);
    params.appendChild(paramElement);
    // console.log(paramElement);


    let paramsDelete = document.getElementsByClassName("paramsDelete");
    for (item of paramsDelete) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();


        })
    }
    i++;

})


//when we click on submit button 
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("responsePrism").innerHTML = "Please wait... Fetching";
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType1 = document.querySelector("input[name='requestType1']:checked").value;
    console.log(i);
    if (contentType1 == 'customPara') {
        data = {};
        for (let x = 0; x < i; x++) {
            if (document.getElementById("parameterKey" + (x + 1) )!= undefined) {
                let key = document.getElementById("parameterKey" + (x + 1)).value;
                let value = document.getElementById("parameterValue" + (x + 1)).value;
                data[key] = value;
            }


        }
        data = JSON.stringify(data); 
    }
    else { 
        data=document.getElementById("requestJsonText").value;

    }


    console.log('url:', url);
    console.log('request type:', requestType);
    console.log('content type:', contentType1);
    console.log('parameters are:', data); 

    if(requestType=='GET'){
        fetch(url,{
            method:"GET",
        }).then(response=>response.text()).then((text)=>{
            // document.getElementById("responseJsonText").value=text; 
            document.getElementById("responsePrism").innerHTML=text;
        })
    } 
    else{ 
        fetch(url,{
            method:"POST",  
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(response=>response.text()).then((text)=>{
            // document.getElementById("responseJsonText").value=text; 
            document.getElementById("responsePrism").innerHTML=text;
        })

    }


})
