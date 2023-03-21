import { Component, OnInit } from '@angular/core';

interface MenuItem{
  ruta:        string,
  nombre:      string 
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItem: MenuItem []= [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullSreen'
    },
    {
      ruta: '/mapas/zoomrange',
      nombre: 'ZoomRange'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
