const searchFun = () =>{
     let filter = document.getElementById("myInput").value.toUpperCase();
     // let myTable = document.getElementById("myTable");
     // let tr = myTable.getElementsByTagName("tr");
     let myTable = document.querySelector(".cards");
     let tr = myTable.querySelectorAll(".card");
     for(var i=0; i<tr.length; i++){
          let h3 = tr[i].getElementsByTagName("h3")[0];
          if(h3){
               let textvalue = h3.textContent || h3.innerHTML;
               if(textvalue.toUpperCase().indexOf(filter)>-1){
                    tr[i].style.display = ""
               }else{
                    tr[i].style.display = "none"
               }
          }
     }
}

const search = () =>{
     let filter = document.getElementById("myInput").value.toUpperCase();
     let product = document.querySelector(".products");
     let tr = product.querySelectorAll(".ProductMain");
     for(var i=0; i<tr.length; i++){
          let tag = tr[i].getElementsByTagName("h1")[0];
          if(tag){
               let textvalue = tag.textContent || tag.innerHTML;
               if(textvalue.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = ""
               }else{
                    tr[i].style.display = "none"
               }
          }
     }
}

voice =()=>{
     var recognition = new webkitSpeechRecognition();
     // recognition.lang = "en-GB";
     recognition.onresult = function(event){
          console.log(event)
          document.getElementById("myInput").value = event.results[0][0].transcript;
     }
     recognition.start();
}


function SerchVoice(){
     const searchForm = document.getElementById("serchForm")
     const searchInput = document.getElementById("myInput");
     const micBtn = document.getElementById("micBtn");

     const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
     if(speechRecognition){
          const recognition = new speechRecognition();
          micBtn.addEventListener("click",function(){
          recognition.start();
          })
          recognition.addEventListener("start",function(){
               searchInput.focus();
          })
          recognition.addEventListener("end",function(){
               searchInput.focus();
          })
          recognition.addEventListener("result",function(event){
               const transcript = event.results[0][0].transcript;
               searchInput.value=transcript;
               // setTimeout(()=>{
               //searchForm.submit();
               // },9000)
          })
     }else{
          console.log("Not Support")
     }

}
// SerchVoice()



function cardMove(){
     const ProductCon = [...document.querySelectorAll(".cardnav")];
     const nxtBtn = [...document.querySelectorAll("#nxtBtn")]; 
     const preBtn = [...document.querySelectorAll("#preBtn")];

     ProductCon.forEach((item,i)=>{
          let content = item.getBoundingClientRect();
          let contentWidth = content.width;
          nxtBtn[i].addEventListener("click",()=>{
               item.scrollLeft += contentWidth
          })
          preBtn[i].addEventListener("click",()=>{
               item.scrollLeft -= contentWidth
          })
     })
}
cardMove();








// document.querySelector(".photo")
// .addEventListener("click",function(){
//      document.querySelector("#fileinp").click();
// })
// document.querySelector("#fileinp")
// .addEventListener("change",function(){
//      document.querySelector("#photoform").submit();
// });