import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LotesProductosService } from '../services/lotes-productos/lotes-productos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupRegistroLppp5Component } from './popup-registro-lppp5/popup-registro-lppp5.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lotes-productos',
  templateUrl: './lotes-productos.component.html',
  styleUrls: ['./lotes-productos.component.scss']
})
export class LotesProductosComponent implements OnInit {

  form_lote: FormGroup;
  
  dataSource = new MatTableDataSource<any>();
  //'codLote',
  displayedColumns: string[] = [ 'nombreLote', 'tipoLote', 'fechadeProduccion', 'fechadeVencimiento', 'detallesLote', 'cantidadPaquetesTotales','cantidadPaquetesDisponibles', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  disableSelect = new FormControl(false);
  private loteServiceSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    private loteService: LotesProductosService) {
    this.form_lote = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  private buildForm() {
    this.form_lote = this.formBuilder.group({
      codLote:[''],
      nombreLote: [''],
      tipoLote: [''],
      fechadeProduccion: [''],
      fechadeVencimiento: [''],
      detallesLote: [''],
      cantidadPaquetesTotales: [''],
      cantidadPaquetesDisponibles: ['']
    });
  }

  fetchData() {
    this.loteService.getAllLoteProductos().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }
  
  editingcodLote: string | null = null;

  edit(dataLote: any) {
    this.editingcodLote = dataLote.codLote;
    this.form_lote.setValue(
      {
        codLote: dataLote.codLote || '',
        nombreLote: dataLote.nombreLote || '',
        tipoLote: dataLote.tipoLote || '',
        fechadeProduccion: dataLote.fechadeProduccion || '',
        fechadeVencimiento: dataLote.fechadeVencimiento || '',
        detallesLote: dataLote.detallesLote || '',
        cantidadPaquetesTotales: dataLote.cantidadPaquetesTotales || '',
        cantidadPaquetesDisponibles: dataLote.cantidadPaquetesDisponibles || ''
      });
    this.Openpopup(this.form_lote.value, 'Editar Lote', PopupRegistroLppp5Component);
  }

/*
  delete(codLote: string) {
    this.loteService.deleteLoteProductos(codLote).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }*/

  
  delete(codLote: string) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.loteService.deleteLoteProductos(codLote).subscribe(response => {
          console.log(response);
          this.fetchData();
          Swal.fire({
            title: "Eliminado!",
            text: "Tu dato ha sido eliminado.",
            icon: "success"
          });
        }, (error) => {
          console.error(error);
        });
      }
    });
  }

  addLote() {
    this.Openpopup(0, 'Añadir Lote', PopupRegistroLppp5Component);
  }

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Openpopup(dataLote: any, title: any, PopupRegistroLoteComponent: any) {
    const dialogRef = this.dialog.open(PopupRegistroLoteComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        formData: dataLote
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      console.log(item);
      this.fetchData();
    });
  }
}