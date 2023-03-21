import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarkador{
  color:      string;
  marker?:     mapboxgl.Marker;
  centro?:     [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements AfterViewInit {


  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLavel: number = 15;
  center: [number, number] = [-99.0678860032039, 19.485826201192978];

  marcadores: ColorMarkador[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLavel,
    });

    this.leerMarkersLocalStorage()

    // const markerHTML : HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = 'Javier Mills';
    // markerHTML.style.color = '#00e5ff';
    // markerHTML.style.fontSize = '10px';

    // const marker = new mapboxgl.Marker({
    //   // element: markerHTML
    // })
    // .setLngLat( this.center)
    // .addTo( this.mapa )

  }

  goMarker(marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }
  agregarMarkador(){
    const color = "#xxxxxx".replace(/x/g, y=> (Math.random()*16|0).toString(16));

    const nuevoMarkador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa)

    this.marcadores.push( {
      color,
      marker: nuevoMarkador
    })

    this.guardarMarkersLocalStorage();
      
    nuevoMarkador.on('dragend', () => {
      this.guardarMarkersLocalStorage();
     })
  }

  /**
   * 
   * Solo se puede guardar marcadores en string
   */
  guardarMarkersLocalStorage(){

    const lngLatArr : ColorMarkador[] =[];

    this.marcadores.forEach( m=> {
        const color = m.color;
        const {lng, lat } = m.marker!.getLngLat();


        lngLatArr.push({
          color: color,
          centro: [ lng , lat ]
        });
    });

    localStorage.setItem('marcadores' , JSON.stringify(lngLatArr));

  }

  leerMarkersLocalStorage(){

    if( !localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr: ColorMarkador[] = JSON.parse(localStorage.getItem('marcadores')!);

   lngLatArr.forEach( m => {

     const newMarker = new mapboxgl.Marker({
       color: m.color,
       draggable: true,
     }).setLngLat( m.centro!).addTo( this.mapa)

     this.marcadores.push({
       marker: newMarker,
       color: m.color,
     })
     newMarker.on('dragend', () => {
      this.guardarMarkersLocalStorage();
     })
   })
  }

  borrarMarcador(index: number){
    this.marcadores[index].marker?.remove();
    this.marcadores.splice( index, 1);
    this.guardarMarkersLocalStorage();
  }
}
