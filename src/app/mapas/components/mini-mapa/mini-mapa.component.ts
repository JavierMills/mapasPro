import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.css']
})
export class MiniMapaComponent implements AfterViewInit{

  @Input() LngLat: [number, number] = [0,0]
  @ViewChild('mapa') divmapa!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divmapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.LngLat,
      zoom: 15,
      interactive: false
    });

  new mapboxgl.Marker().setLngLat(this.LngLat).addTo(mapa);

  }

}
