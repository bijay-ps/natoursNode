export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmlqYXktcHMiLCJhIjoiY2s1bW42ODZ1MDk2dzNsbDV4NzFhbGJvdSJ9.VFo5OpuXsF1-_ve6yX2x7Q';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bijay-ps/ck5mnc4yd3g0d1ijyuzgrlk4k',
    scrollZoom: false
    /*center: [-118.11349134, 34.111745],
    zoom: 10,
    interactive: false*/
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
