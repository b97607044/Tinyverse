
window.onload=onLoad;


function onLoad() {
   getAirTable();
   
 }

function getAirTable() {
  axios.get('https://api.airtable.com/v0/appbRaYO3d3aAK8S7/Web Conetent?api_key=keyYGK2w73uwzG4s8')
      .then(function (response) {
        
        var table = response.data["records"]; 

      
        console.log("arthon table: \n"+JSON.stringify(table, null, '\t'));

        console.log("the data size: "+ table.length);
        console.log("the hash tag is: "+ table[0]["fields"]["title"]);
        console.log("the hash tag content is: "+ table[0]["fields"]["content"]);
        
        //set web content after getting table content
        setWebContent(table);
        
      })
      .catch(function (error) {
        console.log("error: "+error);
      }); 

  axios.get('https://api.airtable.com/v0/appbRaYO3d3aAK8S7/Timetable?api_key=keyYGK2w73uwzG4s8')
      .then(function (response) {
        
        var table = response.data["records"]; 

      
        console.log("Time table: \n"+JSON.stringify(table, null, '\t'));

       
        //set web content after getting table content
        setTimetable(table);
        
      })
      .catch(function (error) {
        console.log("error: "+error);
      }); 
}
 

function setWebContent(table) {
  
  var hashtagText = document.getElementById('hashtag');  
  hashtagText.innerText = getTableRecord(table, "title", "hashtag", "content");
  // console.log("--- "+hashtagText.innerText);

  var dateText = document.getElementById('date');  
  dateText.innerText = getTableRecord(table, "title", "date", "content");

  var timeText = document.getElementById('time');  
  timeText.innerText = getTableRecord(table, "title", "time", "content");

  var locationText = document.getElementById('location');  
  locationText.innerText = getTableRecord(table, "title", "location", "content");

  var addressText = document.getElementById('address');  
  addressText.innerText = getTableRecord(table, "title", "address", "content");

  var aboutText = document.getElementById('about');  
  aboutText.innerText = getTableRecord(table, "title", "about", "content");

  var teaserTitle = document.getElementById('teaserTitle');  
  teaserTitle.innerText = getTableRecord(table, "title", "teaser title", "content");

   var teaserTextTw = document.getElementById('teaserTextTw');  
  teaserTextTw.innerText = getTableRecord(table, "title", "teaser text tw", "content");

   var teaserTextEn = document.getElementById('teaserTextEn');  
  teaserTextEn.innerText = getTableRecord(table, "title", "teaser text en", "content");


}


function getTableRecord(table, source, seed, target) {
  
  var output;

  for (let r = 0; r < table.length; r++){        
        
        if(table[r]["fields"][source]===seed){

            // console.log("match!");
            output = table[r]["fields"][target];
            break;
            
        }else{
            // console.log("not matched...");
        }
  }    
  return output;
}


function setTimetable(table){


  table = table.sort(function(a, b){
    return a.fields.id - b.fields.id;
  });
  console.log("Sorted time table: \n"+JSON.stringify(table, null, '\t'));
  //insert timetable to html

  var toAdd = document.createDocumentFragment(); 

  for(var t = 0; t < table.length; t++){

      

      // <li class="is-revealing">
      //     <span class="list-icon">
      //         <i class="far fa-dot-circle" style="color:#5FFAD0"></i>
      //     </span>
      //     <span>10:00 - 10:30     |     Registration & Breakfast 參與者報到與早餐時間</span>
      // </li>

      var newLi = document.createElement('li');      
      // newLi.className = 'is-revealing';

      var newSpan = document.createElement('span');   
      newSpan.className = 'list-icon';

      var newI = document.createElement('i');      
      newI.className = 'far fa-dot-circle';
      newI.setAttribute("style", "color:#5FFAD0;");  

      var timeSpan = document.createElement('span');   
      timeSpan.innerText = table[t]["fields"]["Time"];

      var spacing = document.createElement('span');
      spacing.innerText = "|";
      spacing.setAttribute("style", "padding: 0 15px;");  

      var contentSpan = document.createElement('span');   
      contentSpan.innerText = table[t]["fields"]["Content"];
      

      newSpan.appendChild(newI);
      newLi.appendChild(newSpan);
      newLi.appendChild(timeSpan);
      newLi.appendChild(spacing);
      newLi.appendChild(contentSpan);
      toAdd.appendChild(newLi);


  }

   document.getElementById('timetable').appendChild(toAdd);

}


