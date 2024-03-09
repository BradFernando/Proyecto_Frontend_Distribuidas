import { Component, OnInit } from '@angular/core';
import { DashCardHomeService } from '../services/dash-card-home/dash-card-home.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dash-card-home',
  templateUrl: './dash-card-home.component.html',
  styleUrls: ['./dash-card-home.component.scss']
})
export class DashCardHomeComponent implements OnInit {
  cards = [
    { title: 'Haciendas Lecheras', count: 0, subtitle: 'Haciendas Lecheras' },
    { title: 'Lecheros Independientes', count: 0, subtitle: 'Lecheros Independientes' },
    { title: 'Recepcion de Leche', count: 0, subtitle: 'Recepción de Leche' },
    { title: 'Proceso de Pasteurizacion', count: 0, subtitle: 'Proceso de Pasteurización' },
    { title: 'Lotes de Productos', count: 0, subtitle: 'Lotes de Productos' },
    { title: 'Proceso de Verificacion', count: 0, subtitle: 'Proceso de Verificación' },
    { title: 'Clientes', count: 0, subtitle: 'Clientes' },
    { title: 'Pedidos', count: 0, subtitle: 'Pedidos' }
  ];

   // Datos para la gráfica
  //chartData: { name: string, value: number }[] = [];

  // Suma total de todas las consultas
  //total = 0;

  fechaInicio: Date;
  fechaFin: Date;
  chartData: any[] = [];

  constructor(private dashCardHomeService: DashCardHomeService) {
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
  }

  colors = ['#0760b4', '#047bd4', '#3b98e8', '#6bb8f0', '#8fd8f8', '#aefaff', '#ffc66e', '#ffc66e', '#ffe28d', '#ffffad'];


  loadData() {
    const fechaInicioStr = this.fechaInicio.toISOString().split('T')[0];
    const fechaFinStr = this.fechaFin.toISOString().split('T')[0];
  
    this.dashCardHomeService.sumRecepcionLecheByDateRangeGroupByFecha(fechaInicioStr, fechaFinStr).subscribe(data => {
      this.chartData = (data as any[][]).map(item => ({ name: item[0], value: item[1] }));
    });
  }


  ngOnInit(): void {

    //Cargar datos para el grafico
    this.loadData();

    this.dashCardHomeService.getClienteCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Clientes');
      if (card) {
        card.count = response.count;
      }
    });

    this.dashCardHomeService.getPedidoCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Pedidos');
      if (card) {
        card.count = response.count;
      }
    });
   
    //los Java Spring Boot 
    this.dashCardHomeService.getHaciendaLecheraCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Haciendas Lecheras');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getLecheroIndependienteCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Lecheros Independientes');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getRecepcionLecheCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Recepcion de Leche');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getProcesoPasteurizacionCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Proceso de Pasteurizacion');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getLoteProductosCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Lotes de Productos');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getProcesoVerificacionCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Proceso de Verificacion');
      if (card) {
        card.count = response;
      }
    });

     // Después de todas las suscripciones, actualiza los datos de la gráfica y calcula el total
    /* this.cards.forEach(card => {
      this.chartData.push({ name: card.title, value: card.count });
      this.total += card.count;
    });*/
    

    //Si valen solo hay que mostrar en grafico de barras
    /*
    this.dashCardHomeService.getLoteProductosCountByYear(2022).subscribe(count => {
      let card = this.cards.find(card => card.title === 'Lotes de Productos');
      if (card) {
        card.count = count;
      }
    });*/

    
   /* this.dashCardHomeService.sumRecepcionLecheByYearMonth(2024, 2).subscribe(sum => {
      console.log('La suma de la leche recibida en el año 2022 y el mes 5 es:', sum);
    });


    //Cantidad de leche en un rango de Fecha 
    this.dashCardHomeService.sumRecepcionLecheByDateRange('2024-01-01', '2024-03-30').subscribe(sum => {
      console.log('La suma de la leche recibida entre las fechas es:', sum);
    });*/

    /*
    this.dashCardHomeService.sumRecepcionLecheByDateRangeGroupByFecha('2024-01-02', '2024-02-28').subscribe(sum => {
      console.log('La suma de la leche recibida entre las fechas es:', sum);
    });*/


  }
}
