let map;
let autocomplete;
let infoWindow;
let markers = [];
let newradius = 5000;
let searchfor = [];
let zoomlevel = 12;
var service;


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.782, lng: -31.727 },
    zoom: 4
  });
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
    { 
        fields: ['place_id','geometry','name']
});

  places = new google.maps.places.PlacesService(map);
  SearchButton.addListener("click", onSearch());
  infowindow = new google.maps.InfoWindow();
 
};


//// serach button actions///
function onSearch() {
   
  const place = autocomplete.getPlace();
  
    marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map
   
  });
    cityCircle = new google.maps.Circle({
      strokeColor: "#F03939",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#F03939",
      fillOpacity: 0.35,
      map,
      center: place.geometry.location,
      radius: newradius
    });

  if (place.geometry) {
    marker.setMap(map);
    map.panTo(place.geometry.location);
    map.setZoom(zoomlevel);
        //search();
  } else {
    alert("Enter a location");
    //document.getElementById("autocomplete").placeholder = "Enter a location";
  }

 var request = {
    location: place.geometry.location,
    radius: newradius,
    query: ['Hospital']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, markers);

function markers(request, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}}

function createMarker(place) {

    const image = {
      url: "http://maps.google.com/mapfiles/kml/pal4/icon63.png" ,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };
    new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: image,
        title: place.name,
        animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(markers[i], "click", showInfoWindow);
}

function showInfoWindow() {
  const marker = this;
  places.getDetails(
    { placeId: marker.placeResult.place_id },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      infoWindow.open(map, marker);
      buildIWContent(place);
    }
  );
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