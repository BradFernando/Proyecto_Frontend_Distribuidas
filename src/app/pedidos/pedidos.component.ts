import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PedidosService } from '../services/pedidos/pedidos.service';
import { PopupCreatePedidoComponent } from './popup-create-pedido/popup-create-pedido.component';
import { PopupAbastecerPedidoComponent } from './popup-abastecer-pedido/popup-abastecer-pedido.component';
import { PopupVerdetallesComponent } from './popup-verdetalles/popup-verdetalles.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit{

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombre_cliente', 'cantidad_solicitada', 'fecha_entrega', 'estado', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private pedidosServiceSubscription: Subscription | undefined;
  constructor(private http: HttpClient, private dialog: MatDialog,
    private pedidosService: PedidosService){}


  ngOnInit(): void {
     this.fetchData();
  }

  fetchData() {
    this.pedidosService.obtenerListaConCliente().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  addPedido() {
    this.openPopupCreate({}, 'Agregar Pedido', PopupCreatePedidoComponent);
  }

  openPopupCreate(dataPedido: any, title: any, PopupCreatePedidoComponent: any) {
    const dialogRef = this.dialog.open(PopupCreatePedidoComponent, {
      width: '40%',
      data: {
        title: title,
        formData: dataPedido
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.fetchData();
    });
  }

  entregarPedido(idPedido:string){
    const pedido = {idPedido: idPedido};

    this.pedidosServiceSubscription = this.pedidosService.estadoEntregado(pedido).subscribe(
      response => {
        console.log(response);
        this.fetchData();
        //Mostrar aletar de guardado
      },
      error => {
        console.error(error);
      }
    );
  }

  addAbastecer(idPedido:string) {
    this.openPopupAbastacer('Agregar Paquetes', PopupAbastecerPedidoComponent, idPedido);
  }

  openPopupAbastacer(title: string, PopupAbastecerPedidoComponent: any, idPedido:string) {
    const dialogRef = this.dialog.open(PopupAbastecerPedidoComponent, {
      width: '40%',
      data: {
        title: title,
        idPedido: idPedido
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.fetchData();
    });
  }


  
  verDetalles(idPedido:string) {
    this.openPopupVerdetalles('Ver detalles de pedido', PopupVerdetallesComponent, idPedido);
  }

  openPopupVerdetalles(title: string, PopupVerdetallesComponent: any, idPedido:string) {
    //Cargar datos para componente
    
    this.pedidosService.obtenerDetallePedido(idPedido).subscribe((response: any) => {
      console.log(response.paquetesNombre);
    const dialogRef = this.dialog.open(PopupVerdetallesComponent, {
      width: '40%',
      data: {
        title: title,
        cantidad_solicitada: response.cantidad_solicitada,
        observaciones: response.observaciones,
        estado: response.estado,
        lista:  new MatTableDataSource(response.paquetesNombre)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
    }, (error: any) => {
      console.error(error);
    });

  }

  delete(id: string){}

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
