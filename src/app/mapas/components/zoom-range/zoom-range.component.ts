import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css'],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;
  zoomLavel: number = 15;
  center: [number, number] =[-99.0678860032039, 19.485826201192978]

  constructor() {}
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  /**
   * se invoka ya que toda la vista del componete se ha inicializado
   * @JavierMartinez
   */
 
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.0678860032039, 19.485826201192978],
      zoom: this.zoomLavel,
    });

  


    this.mapa.on( 'zoom', (ev) =>{
      this.zoomLavel = this.mapa.getZoom();
    })

    this.mapa.on( 'zoomend', (ev) =>{
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18)
      }
    })

    this.mapa.on( 'move', (ev) =>{
      const target = ev.target;
      const {lng, lat} = target.getCenter();

      this.center = [lng, lat]

    })
    
  }

  zoomCambio( value: string){
 
    this.mapa.zoomTo(Number(value));
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();

  }
}
