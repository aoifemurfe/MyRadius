let map;
let autocomplete;
let infoWindow;
let markers = [];
let newradius = 5000;
let searchfor = [];
let zoomlevel = 12;


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
 
};




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
    document.getElementById("autocomplete").placeholder = "Enter a location";
  }

};



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

 console.log(document.querySelectorAll('input[type=checkbox]:checked'))