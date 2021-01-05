// query ui functionality
$(function() {
	$("#spinner").spinner({
		min: 0,
		max: 12,
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {
	$("#spinner2").spinner({
		min: 0,
		max: 12,
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {
	  $("#property").selectmenu();
});

$(function() {
	  $("#time").selectmenu();
});


$(function() {
	$("#slider-range").slider({
		range:true,
		min: 399995,
		max: 750000,
		values: [ 75, 300 ],
		slide: function( event, ui ){
			$("#amount").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
		}
	});

	$("#amount").val(" £" + $(" #slider-range").slider( "values", 0 ) + " - £" + $("#slider-range").slider( "values", 1 ) );
});

// --- search function ----
$(function() {
	$("#search").on("click", function(){

		var propType = $("#property").val();
	  var maxBed =  $("#spinner").val();
    var minBed =  $("#spinner2").val();
		var date =  $("#time").val();
		var minPrice = $("#slider-range").slider("option", "values")[0];
		var maxPrice = $("#slider-range").slider("option", "values")[1];

		var output="<ul>";
		   for (var i in data.properties) {
			   if (( propType == data.properties[i].type) || (propType=="Any"))
			   if (( minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms ))
			   if (( date == data.properties[i].added.month) || (date=="Anytime"))
			   if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
			   {
				   {
					   {
						   {
							   output+="<h2><li>" + "£" + data.properties[i].price +"</li></h2>" + "<img src=" + data.properties[i].picture + ">" + "    <p>" + data.properties[i].description + "</p>" + "<button class><a href='" + data.properties[i].url + "'>Go to Page</a></button>";
						   }
             }
           }
         }
        }
        output += "</ul>";
    document.getElementById("placeholder").innerHTML=output;
		   });

         });


// add, clear, view and remove favourites

$(function() {
 $( ".addFavourites", ".btnFav" ).on("click", function(){

	 try {
		 $(this).attr('disabled', true);

		 var propIdToAdd = $(this).closest("p").attr("id");

		 var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));

		 if(myFavouriteProp == null) {
			 myFavouriteProp = [];

		 }
 	 // if property already in faves
		 if(myFavouriteProp != null) {
			 for ( var j = 0; j < myFavouriteProp.length; j++) {

				 if ( propIdToAdd == myFavouriteProp[j]) {

					 alert("This property is already in your favourites");
					 myFavouriteProp = [];
				 }
			 }
		 }

		 myFavouriteProp.push(propIdToAdd);

		 localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));

	 }

	 catch (e) {
		 if (e==QUOTA_EXCEEDED_ERR) {
			 console.log("Error: Local storage limit exceeds");
		 }

		 else {
			 console.log("ERROR: Saving to local storge.");
		 }
	 }
 });
});

$(function() {
	$( ".removeFavourites" ).on("click", function(){

			$(this).attr('disabled', true);

			var removeProp = $(this).closest("p").attr("id");

			 myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));


			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {

					if (removeProp == myFavouriteProp[j]) {

						alert("Property has been deleted");

						delete myFavouriteProp[j];

						localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));

						myFavouriteProp[j] = [];
					}
				}
			}

			if(myFavouriteProp == null) {
				alert("You have no favourite items");
			}
		});
	});


$(function() {
	$( ".getFaves" ).on("click", function(){

		console.log("Restoring array data from local storage");

		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));

		var output = "<ul>";

		if (myFavouriteProp != null) {

			for (var i = 0; i < data.properties.length; i++) {
				for (j = 0; j < myFavouriteProp.length; j++) {

					if (data.properties[i].id == myFavouriteProp[j]) {

						output+="<h7><li>" + data.properties[i].bedrooms + " Bedroom" + " " + data.properties[i].type + "</li></h7>" +
"<img src=" + data.properties[i].picture + ">" +"<li><button><a href=' " +data.properties[i].url + "'>Visit page</a></button></li>";
					}
				}
			}
		}
		output+="</ul>";

		document.getElementById("Placeholder2").innerHTML = output;

	});
});

// clear localStorage
$(function() {
	$( ".clearFavourites" ).on("click", function(){
		$("#Placeholder2").remove();
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		localStorage.clear();

	});

});
