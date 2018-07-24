function mapcityInit(){

  // Inicialización mapa
  var map = L.map('map',{
    center:[-33.439683,-70.642117],
    maxZoom: 18,
    minZoom: 0,
    zoom:14,
    layers: [mapcitychile],
    continuousWorld:true
  });

  this.marker = null;

  var mcIcon = L.icon({
    iconUrl: 'http://s3.amazonaws.com/mapcity-assets/map-marker-32.png',
    iconRetinaUrl: 'http://s3.amazonaws.com/mapcity-assets/map-marker-64.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [-3, -32],
    shadowSize: [32, 32],
    shadowAnchor: [16, 32]
  }); 

  this.search = document.getElementById("search");

  this.search.addEventListener("click", function(event){
    
    let filter = document.getElementById("filter").value;
    
    this.n = MC.normalizar(filter);

    if(this.n.results.length >0){
      if(this.n.results[0].caracterizacion.direccion_valida){
        if(this.marker!=null) map.removeLayer(this.marker);

        latlng = new L.LatLng(this.n.results[0].location.lat, this.n.results[0].location.lng);

        this.marker = L.marker(latlng, {
          icon: mcIcon,
          draggable: true
        });

        this.marker.addTo(map);

        this.marker.on('dragend',function(e) {
          console.log(e.target.getLatLng());
        });

        map.setView(latlng, 15);
      }else{
        alert("Dirección Inválida")
      }

    }else{
      alert("Hubo un problema");
    }
  });
}

setTimeout(function(){
  mapcityInit();
},1000);
