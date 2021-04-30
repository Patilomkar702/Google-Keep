console.log("JS Loaded For Keep");

const addBtn = document.querySelector(".add");
const notesBox = document.querySelector(".notesBox");
addBtn.addEventListener("click",()=>{addNewNote();});

window.onload = ()=>{
   var storeData = localStorage.getItem("notes");   //Data in String
    storeData = JSON.parse(storeData);
    console.log(storeData);
    if(storeData.length>=0)
    {
        storeData.forEach((curData)=>{
            addNewNote(curData);
        })
    }
  
}

const updateData = ()=>{
    var noteBoxes = document.querySelectorAll("textarea");
    var notesArr = [];
    //console.log(noteBoxes);
    noteBoxes.forEach((curBox)=>{
        notesArr.push(curBox.value);
    });
   // console.log(notesArr);
   //Since Data is store in String Format on Local Strage 
   localStorage.setItem("notes",JSON.stringify(notesArr));  
            //with json : ["1","2"]    : without : 1,2,3
}

function addNewNote(text="")
{
    var darkMode = document.querySelector(".darkMode").children[0].classList[3];
    console.log(darkMode);
    var note = document.createElement("div");
    note.classList.add("node");
    if(darkMode=="fa-toggle-off")
    {
        var containerHTML = `
        <div class="card m-2" style="width: 18rem;  background-color: #ffc107;">
            <div class="card-body">
              <h5 class="card-title d-flex justify-content-around">
               <i class="editBtn  fa far fa-edit " style="color: rgb(53, 185, 53); cursor: pointer;"></i>
               <i class="delBtn fa fas fa-trash " style="color: red; cursor: pointer;"></i>
              </h5>
              <div class="container-fluid p-0 overLappingContainer" style="height: 10rem;"> 
                <div class="lapingDiv1 ${text ? "":"hidden" }" ></div>
                <textarea class="${text ? "hidden" : "" }" placeholder="Start From Here" style="background-color: #e2ca82; "></textarea>
              </div>
            </div>
        </div>`;
    }
    else{
        var containerHTML = `
        <div class="card m-2" style="width: 18rem;  background-color: rgb(63, 60, 60); color:rgb(255, 255, 255);">
            <div class="card-body">
              <h5 class="card-title d-flex justify-content-around">
               <i class="editBtn  fa far fa-edit " style="color: rgb(53, 185, 53); cursor: pointer;"></i>
               <i class="delBtn fa fas fa-trash " style="color: red; cursor: pointer;"></i>
              </h5>
              <div class="container-fluid p-0 overLappingContainer" style="height: 10rem;"> 
                <div class="lapingDiv1 ${text ? "":"hidden" }" ></div>
                <textarea class="${text ? "hidden" : "" }" placeholder="Start From Here" style="background-color: rgb(78, 78, 78); color:white;" ></textarea>
              </div>
            </div>
        </div>`;
    }
     note.insertAdjacentHTML("afterbegin",containerHTML);
     //console.log(note);    

     //Keeping track of Refferences 
     var editBtn = note.querySelector(".editBtn");
     var delBtn = note.querySelector(".delBtn");
     var mainDiv = note.querySelector(".lapingDiv1");
     var textArea = note.querySelector("textarea");

     delBtn.addEventListener("click",()=>{
         note.remove();
         updateData();
         mainDiv.classList.toggle("hidden");
         textArea.classList.toggle("hidden");
     })
 
     //to Show intial value on both container
     textArea.value=text;
     mainDiv.innerHTML=text;

     //create Overlapping div  : see css      : Toggle means ON Off : ifPresent then delete viceVersa

     editBtn.addEventListener("click",()=>{
        mainDiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
     })

     //Change after final , input : on each key pressed
     textArea.addEventListener("change",(event)=>{
         var value = event.target.value;
         mainDiv.innerHTML = value;
         updateData();
         mainDiv.classList.toggle("hidden");
         textArea.classList.toggle("hidden");
     });
    
     notesBox.appendChild(note);
};

var darkMode = document.querySelector(".darkMode");
darkMode.addEventListener("click",()=>{
    darkMode.children[0].classList.toggle("fa-toggle-on");
    darkMode.children[0].classList.toggle("fa-toggle-off");
    var curMode =   darkMode.children[0].classList[3];
    if(curMode=="fa-toggle-on")
    {
        document.querySelector("body").style.backgroundColor =  "rgb(36, 34, 34)";
        darkMode.parentNode.style.color="rgb(201, 184, 87)";
        var textArea = document.querySelectorAll("textarea");
        textArea.forEach((box)=>{
            box.parentNode.parentNode.parentNode.style.backgroundColor=" rgb(63, 60, 60)";
            box.parentNode.parentNode.parentNode.style.color="rgb(255, 255, 255)";
        })
    }
    else{
        document.querySelector("body").style.backgroundColor = "rgb(255, 255, 255)";
        darkMode.parentNode.style.color= "rgb(36, 34, 34)";
        var textArea = document.querySelectorAll("textarea");
        textArea.forEach((box)=>{
            box.parentNode.parentNode.parentNode.style.backgroundColor="#ffc107";
            box.parentNode.parentNode.parentNode.style.color= "black";
        })
       
    }
})

