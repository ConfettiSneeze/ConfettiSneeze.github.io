
$(document).ready(function(){

 $(this).scrollTop(0);
 
	$(window).scroll(function(){
			
				var value = $(this).scrollTop();
				console.log(value);

				$(".hawk").css({

					'transform' : 'translate(' + value/8 + '%, -' + value/14 + '%) rotate(-' + value/24 + 'deg)'

				});

        $("#buzau").css({

          'transform' : 'translate(0px, ' + value/2 + '%)'

        }); 

				if (value>=250){
					document.getElementById('buzau').style.visibility="hidden"; 	
				}
				if (value<250){
					document.getElementById('buzau').style.visibility="visible"; 	
				}

				if(value > $('.container-fluid').offset().top - $(window).height()/4) {

				    $('.container-fluid p').each( function(i){

				    
				      setTimeout(function(){
				        $('.container-fluid p').eq(i).addClass('slide');

				        if(i==0){
				        	$('.container-fluid blockquote').addClass('slide');
				    	}

				     	}, 400 * (i+1));

				    });
				}
				


	});

	$(document).ready(function(){
	  // Add smooth scrolling to all links
	  $("a").on('click', function(event) {

	    // Make sure this.hash has a value before overriding default behavior
	    if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();

	      // Store hash
	      var hash = this.hash;

        if(hash !== '#myCarousel'){ //Verificare id
        
      	      // Using jQuery's animate() method to add smooth page scroll
      	      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area 
      	      $('html, body').animate({
      	        scrollTop: $(hash).offset().top
      	      }, 1500, function(){
      	   
      	        // Add hash (#) to URL when done scrolling (default click behavior)
      	        window.location.hash = hash;
      	      });
        }
        if(hash == '#carte'){ //Verificare id
        
              
              $('html, body').animate({
                scrollTop: $(hash).offset().top-50
              }, 1500, function(){
           
                window.location.hash = hash;
              });
        }
	    } // End if
	  });
	});

});


//Harta Buzau

    google.maps.event.addDomListener(window, 'load', init);
    var map;
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(45.355904,26.784119),
            zoom: 10,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
            },
            disableDoubleClickZoom: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: true,
            scrollwheel: true,
            panControl: true,
            streetViewControl: true,
            draggable : true,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.HYBRID,
        }
        var mapElement = document.getElementById('hartaBuzau');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
['Lopatari', 'undefined', 'undefined', 'undefined', 'undefined', 45.4826738, 26.590514600000006, 'https://mapbuildr.com/assets/img/markers/solid-pin-orange.png'],['Sapoca', 'undefined', 'undefined', 'undefined', 'undefined', 45.2366355, 26.746580900000026, 'https://mapbuildr.com/assets/img/markers/solid-pin-orange.png']
        ];
        for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
           if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
           if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
            marker = new google.maps.Marker({
                icon: markericon,
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web
            });
link = '';     }
   var waypts = [];
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true
      });
      if (locations.length > 1){
          for (var i = 0; i < locations.length; i++) {
              waypts.push({
                  location:new google.maps.LatLng(locations[i][5], locations[i][6]),
                  stopover:true
              }); 
          };
          var request = {
              origin: new google.maps.LatLng(locations[0][5], locations[0][6]),
              destination: new google.maps.LatLng(locations[locations.length - 1][5], locations[locations.length - 1][6]),
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  polylineOptions = {
                      strokeColor: '#77c6ff',
                      strokeWeight: '3'
                  }
                  directionsDisplay.setOptions({
                      polylineOptions: polylineOptions
                  });
                  directionsDisplay.setDirections(response);
              }
          });
          directionsDisplay.setMap(map);
       }
}