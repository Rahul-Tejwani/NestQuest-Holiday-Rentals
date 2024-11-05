//Code to display Map
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  center: coordinates,
  zoom: 12,
});

//To add marker into Map
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates) //Listing.geometry.cordinates
  .addTo(map);
