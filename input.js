let map;
let autocomplete;
let myLatlng = autocomplete;

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.782, lng: -31.727 },
    zoom: 4
  });
  var  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
    { types: ['establishment'],
        componentRestrictions: {'country': ['IE']},
        fields: ['placeid','geometry','name']
});

  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  const place = autocomplete.getPlace();
    var marker = new google.maps.Marker({
    position: myLatlng,
    map: map
  });

  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
  } else {
    document.getElementById("autocomplete").placeholder = "Enter a city";
  }
}