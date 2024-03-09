import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProcesoPasteurizacionService } from '../services/proceso-pasteurizacion/proceso-pasteurizacion.service';
import { PopupRegistroPp4Component } from './popup-registro-pp4/popup-registro-pp4.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso-pasteurizacion',
  templateUrl: './proceso-pasteurizacion.component.html',
  styleUrls: ['./proceso-pasteurizacion.component.scss']
})
export class ProcesoPasteurizacionComponent implements OnInit {

  form_procesoParteurizacion: FormGroup;
  
  //  dataSource: any[] = [];
  dataSource = new MatTableDataSource<any>();
  //'codProcesoPastz',
  displayedColumns: string[] = [ 'cantidadLitrosUsados', 'temperatura', 'tiempoTratamiento', 'tipoProcesamiento', 'detallesProceso', 'recepcionLeche', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  disableSelect = new FormControl(false);
  private procesoParteurizacionServiceSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    private procesoPasteurizacion: ProcesoPasteurizacionService) {
    this.form_procesoParteurizacion = this.formBuilder.group({});
  }


  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  private buildForm() {
    this.form_procesoParteurizacion = this.formBuilder.group({
      codProcesoPastz:[''],
      cantidadLitrosUsados: [''],
      temperatura: [''],
      tiempoTratamiento: [''],
      tipoProcesamiento: [''],
      detallesProceso: [''],
      //haciendaLechera: [[]]
      recepcionLeche:  [[]]
    });
  }

  fetchData() {
    this.procesoPasteurizacion.getAllProcesoPasteurizacion().subscribe((response: any) => {
      // this.dataSource = response;
      //this.table.renderRows();
      this.dataSource = new MatTableDataSource(response); // Usa MatTableDataSource aquí
      this.dataSource.paginator = this.paginator; // Asigna el paginador después de actualizar los datos
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }
  
  editingcodProcesoPastz: string | null = null;

  edit(dataProcesoPasteurizacion: any) {
    this.editingcodProcesoPastz = dataProcesoPasteurizacion.codProcesoPastz;
    this.form_procesoParteurizacion.setValue(
      {
        codProcesoPastz: dataProcesoPasteurizacion.codProcesoPastz || '',
        cantidadLitrosUsados: dataProcesoPasteurizacion.cantidadLitrosUsados || '',
        temperatura: dataProcesoPasteurizacion.temperatura || '',
        tiempoTratamiento: dataProcesoPasteurizacion.tiempoTratamiento || '',
        tipoProcesamiento: dataProcesoPasteurizacion.tipoProcesamiento || '',
        detallesProceso: dataProcesoPasteurizacion.tipoProcesamiento || '',
        recepcionLeche: dataProcesoPasteurizacion.recepcionLeche.map((recepcion: any) => recepcion.codRecepcion)
        //recepcionLeche: [dataProcesoPasteurizacion.recepcionLeche[0].codRecepcion] || ''

      });
      console.log('CodrecepcionLeche:', dataProcesoPasteurizacion.recepcionLeche[0].codRecepcion);
    // Open the dialog with the form data
    this.Openpopup(this.form_procesoParteurizacion.value, 'Editar Proceso de Pasteurización', PopupRegistroPp4Component);
  }

  /*
  delete(codProcesoPastz: string) {
    this.procesoPasteurizacion.deleteProcesoPasteurizacion(codProcesoPastz).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }*/

  delete(codProcesoPastz: string) {
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
        this.procesoPasteurizacion.deleteProcesoPasteurizacion(codProcesoPastz).subscribe(response => {
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

addProcesoPasteurizacion() {
  this.Openpopup(0, 'Añadir Proceso de Pasteurización', PopupRegistroPp4Component);
}

Filterchange(event: KeyboardEvent) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

//Ventana de dialogo dataProcesoPasteurizacion
Openpopup(dataProcesoPasteurizacion: any, title: any, PopupRegistroPp4Component: any) {
  const dialogRef = this.dialog.open(PopupRegistroPp4Component, {
    width: '40%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      title: title,
      formData: dataProcesoPasteurizacion  // Pass the form data
    }
  });

  dialogRef.afterClosed().subscribe(item => {
    console.log(item);
    this.fetchData();
  });

}

}
