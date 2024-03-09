import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProcesoVerificacionService } from '../services/proceso-verificacion/proceso-verificacion.service';
import { PopupRegistroPv5Component } from './popup-registro-pv5/popup-registro-pv5.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso-verificacion',
  templateUrl: './proceso-verificacion.component.html',
  styleUrls: ['./proceso-verificacion.component.scss']
})
export class ProcesoVerificacionComponent implements OnInit{

  form_procesoVerificacion: FormGroup;

  dataSource = new MatTableDataSource<any>();
  //'codProcesoVerificacion', 
  displayedColumns: string[] = ['resultadoVerificacion', 'tiempoTratamiento', 'observaciones', 'detallesProceso', 'procesoPasteurizacion', 'loteProductos', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  disableSelect = new FormControl(false);
  private procesoVerificacionServiceSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    private procesoVerificacion: ProcesoVerificacionService) {
    this.form_procesoVerificacion = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  private buildForm() {
    this.form_procesoVerificacion = this.formBuilder.group({
      codProcesoVerificacion:[''],
      resultadoVerificacion: [''],
      tiempoTratamiento: [''],
      observaciones: [''],
      detallesProceso: [''],
      procesoPasteurizacion: [''],
      loteProductos:  [[]]
    });
  }

  fetchData() {
    this.procesoVerificacion.getAllProcesoVerificacion().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }
  
  editingcodProcesoVerificacion: string | null = null;

  edit(dataProcesoVerificacion: any) {
    this.editingcodProcesoVerificacion = dataProcesoVerificacion.codProcesoVerificacion;
    this.form_procesoVerificacion.setValue(
      {
        codProcesoVerificacion: dataProcesoVerificacion.codProcesoVerificacion || '',
        resultadoVerificacion: dataProcesoVerificacion.resultadoVerificacion,
        tiempoTratamiento: dataProcesoVerificacion.tiempoTratamiento || '',
        observaciones: dataProcesoVerificacion.observaciones || '',
        detallesProceso: dataProcesoVerificacion.detallesProceso || '',
        procesoPasteurizacion: dataProcesoVerificacion.procesoPasteurizacion || '', //codProcesoPastz
        // loteProductos: dataProcesoVerificacion.loteProductos || ''
       loteProductos: dataProcesoVerificacion.loteProductos.map((lote: any) => lote.codLote)
      });
    this.Openpopup(this.form_procesoVerificacion.value, 'Editar Proceso de Verificación', PopupRegistroPv5Component);
  }

  /*
  delete(codProcesoVerificacion: string) {
    this.procesoVerificacion.deleteProcesoVerificacion(codProcesoVerificacion).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }*/

  
  delete(codProcesoVerificacion: string) {
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
        this.procesoVerificacion.deleteProcesoVerificacion(codProcesoVerificacion).subscribe(response => {
          console.log(response);
          this.fetchData();
          Swal.fire({
            title: "Eliminar!",
            text: "Tu dato ha sido eliminado.",
            icon: "success"
          });
        }, (error) => {
          console.error(error);
        });
      }
    });
  }

  addProcesoVerificacion() {
    this.Openpopup(0, 'Añadir Proceso de Verificación', PopupRegistroPv5Component);
  }

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Openpopup(dataProcesoVerificacion: any, title: any, PopupRegistroPvComponent: any) {
    const dialogRef = this.dialog.open(PopupRegistroPvComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        formData: dataProcesoVerificacion
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      console.log(item);
      this.fetchData();
    });
  }
  

}
