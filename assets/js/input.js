let map;
let autocomplete;
let infowindow;
let newradius = 5000;
let searchfor = [];
let zoomlevel = 12;
let service;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 47.782, lng: -31.727 },
        zoom: 4
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
    
        marker = new google.maps.Marker({
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
        marker.setMap(map);
        map.panTo(cplace.geometry.location);
        map.setZoom(zoomlevel);
        
    } else {
        alert("Enter a location");
        //document.getElementById("autocomplete").placeholder = "Enter a location";
    }

    var request = {
        location: cplace.geometry.location,
        radius: newradius,
        types: ['hospital']
    };
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, searchmarkers);
    infowindow = new google.maps.InfoWindow();
    console.log(markers)

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
     url: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png" ,
     size: new google.maps.Size(70, 80),
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

    marker.setMap(null);
    circle.setMap(null);
    for (var m in markers) {
        markers[m].setMap(null);
    }
    markers = [];
}


function updateradius1() {

    newradius = Number(document.getElementById("fivek").value);
    zoomlevel = Number(12);
      console.log(newradius);
};
function updateradius2() {

      newradius = Number(document.getElementById("tenk").value);
      zoomlevel = Number(11);
      console.log(newradius);
};

function updateradius3() {
      newradius = Number(document.getElementById("fifteenk").value);
      zoomlevel = Number(10);
      console.log(newradius);
};

function updatesearch1() {
    searchitem1 = document.getElementById("inlineCheckbox1").value;
    searchfor.push(searchitem1);
      console.log(searchfor);
};

// console.log(document.querySelectorAll('input[type=checkbox]:checked'))

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