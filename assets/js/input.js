let map;
let autocomplete;
let myLatlng;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.782, lng: -31.727 },
    zoom: 4
  });
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
    { 
        componentRestrictions: {'country': ['IE']},
        fields: ['place_id','geometry','name']
});

  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
   
  const place = autocomplete.getPlace();
  
    var marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map
  });
  const cityCircle = new google.maps.Circle({
      strokeColor: "#F03939",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#F03939",
      fillOpacity: 0.35,
      map,
      center: place.geometry.location,
      radius: 5000
    });

  if (place.geometry) {
    marker.setMap(map);
    map.panTo(place.geometry.location);
    map.setZoom(12);
        //search();
  } else {
    document.getElementById("autocomplete").placeholder = "Enter a city";
  }
}
