let map;
let autocomplete;
let infowindow;
let newradius = 2000;
let searchfor = [];
let zoomlevel = 13;
let service;
let markers = [];



function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 53.2, lng: -7.7 },
        zoom: 6
    });
    
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),{ 
            fields: ['place_id','geometry','name']
        });

    places = new google.maps.places.PlacesService(map);
    
    SearchButton.addListener("click", onSearch());
    ClearButton.addListener("click", onClear());
};


    //// serach button actions///
function onSearch() {
        
    const cplace = autocomplete.getPlace();
    
        cmarker = new google.maps.Marker({
        position: cplace.geometry.location,
        map: map
        });
      
        

        circle = new google.maps.Circle({
        strokeColor: "#F03939",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F03939",
        fillOpacity: 0.35,
        map,
        center: cplace.geometry.location,
        radius: newradius
        });
        
    if (cplace.geometry) {
 
        map.panTo(cplace.geometry.location);
        map.setZoom(zoomlevel);
  
        
    } else {
        alert("Enter a location");
        //document.getElementById("autocomplete").placeholder = "Enter a location";
    }
    
    var searchfor1 = document.querySelectorAll('input[type=checkbox]:checked');
    Array.from(searchfor1).forEach(function(el) {
        searchfor.push(el.id)    
    });


    var request1 = {
        location: cplace.geometry.location,
        radius: newradius,
        types: [searchfor[0]]
    };

        var request2 = {
        location: cplace.geometry.location,
        radius: newradius,
        types: [searchfor[1]]
    };

        var request3 = {
        location: cplace.geometry.location,
        radius: newradius,
        types: [searchfor[2]]
    };

        var request4 = {
        location: cplace.geometry.location,
        radius: newradius,
        types: [searchfor[3]]
    };

    service = new google.maps.places.PlacesService(map);

    if (!searchfor[0]) {}
    else {
    service.nearbySearch(request1, searchmarkers);
    };

    if (!searchfor[1]) {}
        else {
        service.nearbySearch(request2, searchmarkers);
        };

    if (!searchfor[2]) {}
    else {service.nearbySearch(request3, searchmarkers);};


    if (!searchfor[3]) {}
    else {service.nearbySearch(request4, searchmarkers);};

    infowindow = new google.maps.InfoWindow();

    function searchmarkers (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
            }
        }
    }
}


function createMarker(s_place) {

const image = {
    url: "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",    
    scaledSize: new google.maps.Size(25, 25),   
   };
 
   smarker = new google.maps.Marker({
       position: s_place.geometry.location,
       map: map,
       icon: image,
       title: s_place.name,
       animation: google.maps.Animation.DROP
   });
    smarker.addListener("click", function () {

       infowindow.setContent(s_place.name);  
       infowindow.setPosition(s_place.geometry.location); 
       infowindow.open(map, this);
   });
   return smarker
}   


function onClear() {
    

    for (var m in markers) {
        markers[m].setMap(null);
    };

    markers = [];
    searchfor = [];
    document.getElementById('autocomplete').value = ''
    document.getElementById("supermarket").checked = false;
    document.getElementById("hospital").checked = false;
    document.getElementById("pharmacy").checked = false;
    document.getElementById("doctor").checked = false;
    circle.setMap(null);
    cmarker.setMap(null);
}

// 

function updateradius1() {

    newradius = Number(document.getElementById("twok").value);
    zoomlevel = Number(13); 
};
function updateradius2() {

      newradius = Number(document.getElementById("fivek").value);
      zoomlevel = Number(12);
};

function updateradius3() {
      newradius = Number(document.getElementById("tenk").value);
      zoomlevel = Number(11);
};

function updatesearch1() {
    searchitem1 = document.getElementById("inlineCheckbox1").value;
    searchfor.push(searchitem1);
};



// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
