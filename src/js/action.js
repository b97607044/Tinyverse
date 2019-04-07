
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

            console.log("match!");
            output = table[r]["fields"][target];
            break;
            
        }else{
            console.log("not matched...");
        }
  }    
  return output;
}

