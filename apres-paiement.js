
/*page de confirmation 

Installer le code en bas de page, avant balise de fermeture </body>

jQuery est requis
*/



const cookieName = "mycookie";
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

  console.log("* * * *  LOG COOKIE FUNCTION -- ca -- " + ca);

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

function gaData(){
	
	
	inputCookie = getCookie(cookieName);
	
	$.each(sourceTrackerArray , function(k,v){
        
        let thisCookie = v.cookieValue;
        let thisAffiliation = v.cookieAffiliation;

        if(inputCookie == thisCookie){
            
			let amount = $('#AMOUNT').val();
			let decimalAmount;
			let transact_id=  $('#ORDERID').val();

			decimalAmount = amount.substring(0, amount.length-2) + "." + amount.substring(amount.length-2);
			decimalAmount = parseFloat(decimalAmount);


			ga('require', 'ecommerce');

			ga('ecommerce:addTransaction', {
			 'id': transact_id,
			 'revenue': decimalAmount,
			 'affiliation' : thisAffiliation

			});

			console.log("transact_id - " + transact_id);
			console.log("decimalAmount - " + decimalAmount);

			ga('ecommerce:send');

            
            console.log(" - - - - - - > detection done, report input;this;affiliation : " + inputCookie + " ; " + thisCookie + " ; " + thisAffiliation);
        } 
        
        else{
            console.log ("detection fail, report input;this : " + inputCookie + " ; " + thisCookie);
        }

        cookieResult = getCookie(cookieName)
        
    });
}



$(document).ready(function(){

	gaData();   

	console.log("INPUT COOKIE : " + inputCookie + "  OUTPUT COOKIE => " + cookieResult );

});
