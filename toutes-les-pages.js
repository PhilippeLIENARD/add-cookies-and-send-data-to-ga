/* Landing pages (toutes les pages du site )

Installer le code en bas de page, avant balise de fermeture </body>

jQuery est requis

*/


let currentURL = window.location.href;

const cookieName = "myCookieName";

let cookieDate = new Date();

cookieDate.setTime(cookieDate.getTime() + 31536000000);

let inputCookie;

let cookieResult;

let sourceTrackerArray = [
   {
    KeyToMatch: "get_param",
    cookieName: cookieName,
    cookieValue: "my_value",
    cookieAffiliation : "DirectAdwords"
  },

  {

    KeyToMatch: "get_param_2",
    cookieName: cookieName,
    cookieValue: "my_value_2",
    cookieAffiliation : "landing_page"
	  
  }

];


function getCookie(cname) {

  let name = cname + "=";

  let decodedCookie = decodeURIComponent(document.cookie);

  let ca = decodedCookie.split(";");

  //console.log("* * * *  LOG COOKIE -- ca -- " + ca);

  for (let i = 0; i < ca.length; i++) {

    let c = ca[i];

    while (c.charAt(0) == " ") {

      c = c.substring(1);

    }

    if (c.indexOf(name) == 0) {

      return c.substring(name.length, c.length);

    }

  }

  return false;

}



function checkAndCreateCookie(){

inputCookie = getCookie(cookieName);  
     

    $.each( sourceTrackerArray , function(key,value){     
	   
	let counter = key+1;
	
	let thisKey= value.KeyToMatch;
	    
	let thisCookie = value.cookieValue;   

             if(currentURL.indexOf(thisKey) > 0){

              document.cookie = cookieName + " = " + thisCookie + "; expires = " + cookieDate + "; path=/";               

              console.log("++++++++ EACH : URL DONE ::::: " + counter);



             } else if (currentURL.indexOf(thisKey) < 0) {

                console.log("- - -  EACH : URL FAIL ::::: " + counter)

             }	
	    
	cookieResult = getCookie(cookieName); 
	
	//console.log(typeof thisKey + " ; " + thisKey.length);  

    });

}





$(document).ready(function(){

	checkAndCreateCookie();	 

	console.log("INPUT COOKIE : " + inputCookie + "  OUTPUT COOKIE => " + cookieResult );

});



