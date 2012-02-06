/***************************************************************************
	This file contains useful javascript validation functions. Validate
	requires jquery. 
	
	function validate(selector)
		Takes in selector as text variable (not object) and validates all 
		descendants with class .required , .zip and #ccnum 
		Turns input backgrounds from white to red if not valid. Returns boolean. 
		
	function isValidatedCreditCard(type, ccnum)
		Takes in credit card type and number; Returns True or false; 
		Types:
		 Visa
		 MC
		 Disc
		 AmEx
		 Diners

***************************************************************************/
function validate(selector){
		
		var validated = true;
		$(selector).find('.required, .zip').css('background-color','white');
				
		$(selector).find('.required').each(function(){
			if( $(this).val() == "" )
			{
				$(this).css('background-color', 'red');
				validated = false;
			}	
		});
		
		$(selector).find('.int').each(function(){
			if(isNaN($(this).val()))
			{
				$(this).css('background-color' , 'red');
				validated = false;
			}	
		});
		$(selector).find('.zip').each(function(){
			
				
			var zipCodePattern = /(^\d{5}$)|(^\d{5}-?\d{4}$)/;
								
			var zipcode = $(this).val();
			if( ! (zipCodePattern.test(zipcode)))
			{
				$(this).css('background-color' , 'red');
				validated = false;
			}
				
		});
		
		$(selector).find('#ccnum').each(function(){
				validated = isValidCreditCard($('#cctype').val(), $('#ccnum').val() );
				if(!validated) $('#ccnum').css('background-color' , 'red');
				else $('#ccnum').css('background-color','white');
		});
		
		return validated;

	}

	
  function isValidCreditCard(type, ccnum) {
	   if (type == "Visa") {
		  // Visa: length 16, prefix 4, dashes optional.
		  var re = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
	   } else if (type == "MC") {
		  // Mastercard: length 16, prefix 51-55, dashes optional.
		  var re = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
	   } else if (type == "Disc") {
		  // Discover: length 16, prefix 6011, dashes optional.
		  var re = /^6011-?\d{4}-?\d{4}-?\d{4}$/;
	   } else if (type == "AmEx") {
		  // American Express: length 15, prefix 34 or 37.
		  var re = /^3[4,7]\d{13}$/;
	   } else if (type == "Diners") {
		  // Diners: length 14, prefix 30, 36, or 38.
		  var re = /^3[0,6,8]\d{12}$/;
	   }
	   if (!re.test(ccnum)) return false;
	   // Remove all dashes for the checksum checks to eliminate negative numbers
	   ccnum = ccnum.split("-").join("");
	   // Checksum ("Mod 10")
	   // Add even digits in even length strings or odd digits in odd length strings.
	   var checksum = 0;
	   for (var i=(2-(ccnum.length % 2)); i<=ccnum.length; i+=2) {
		  checksum += parseInt(ccnum.charAt(i-1));
	   }
	   // Analyze odd digits in even length strings or even digits in odd length strings.
	   for (var i=(ccnum.length % 2) + 1; i<ccnum.length; i+=2) {
		  var digit = parseInt(ccnum.charAt(i-1)) * 2;
		  if (digit < 10) { checksum += digit; } else { checksum += (digit-9); }
	   }
	   if ((checksum % 10) == 0) return true; else return false;
	}