import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RecepcionLecheService } from '../services/recepcion-leche/recepcion-leche.service';
import { PopupRegistroRlComponent } from './popup-registro-rl/popup-registro-rl.component';
import { PopupRegistroRlindepComponent } from './popup-registro-rlindep/popup-registro-rlindep.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recepcion-leche',
  templateUrl: './recepcion-leche.component.html',
  styleUrls: ['./recepcion-leche.component.scss']
})
export class RecepcionLecheComponent implements OnInit{

  form_RecepcionHacLechera: FormGroup;
  form_RecepcionIndepLechera: FormGroup;
  //  dataSource: any[] = [];
  dataSource = new MatTableDataSource<any>();
  //'codRecepcion'
  displayedColumns: string[] = [ 'fechaRecepcion', 'resultadosPruebasCalidad', 'cantidadLecheRecibida', 'pagoTotal', 'haciendaLechera', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  disableSelect = new FormControl(false);
  private recepcionHacLecheraServiceSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    private recepcionHaclechera: RecepcionLecheService) {
    this.form_RecepcionHacLechera = this.formBuilder.group({});
    this.form_RecepcionIndepLechera = this.formBuilder.group({});
  }


  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
    this.buildFormIndepLechera();
  }

  private buildForm() {
    this.form_RecepcionHacLechera = this.formBuilder.group({
      codRecepcion:[''],
      fechaRecepcion: [''],
      resultadosPruebasCalidad: [''],
      cantidadLecheRecibida: [''],
      pagoTotal: [''],
      haciendaLechera: [[]]
    // haciendaLechera: ['']
    });
  }

  private buildFormIndepLechera() {
    this.form_RecepcionIndepLechera = this.formBuilder.group({
      codRecepcion:[''],
      fechaRecepcion: [''],
      resultadosPruebasCalidad: [''],
      cantidadLecheRecibida: [''],
      pagoTotal: [''],
      lecheroIndependiente: ['']
    });
  }

  
  fetchData() {
    this.recepcionHaclechera.getAllRecepcionLeche().subscribe((response: any) => {
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


  editingcodRecepcion: string | null = null;


  edit(recepciondeLechero_dto: any) {
    this.editingcodRecepcion = recepciondeLechero_dto.codRecepcion;

    if (recepciondeLechero_dto.haciendaLechera && recepciondeLechero_dto.haciendaLechera[0]) {
      this.form_RecepcionHacLechera.patchValue({
        codRecepcion: recepciondeLechero_dto.codRecepcion || '',
        fechaRecepcion: recepciondeLechero_dto.fechaRecepcion || '',
        resultadosPruebasCalidad: recepciondeLechero_dto.resultadosPruebasCalidad || '',
        cantidadLecheRecibida: recepciondeLechero_dto.cantidadLecheRecibida || '',
        pagoTotal: recepciondeLechero_dto.pagoTotal || '',
       //este valia anteriomente
        // haciendaLechera: recepciondeLechero_dto.haciendaLechera[0].codHacienda || ''
        haciendaLechera: recepciondeLechero_dto.haciendaLechera.map((hacienda: any) => hacienda.codHacienda)

      });
      console.log('CodHaciendaLechera:', recepciondeLechero_dto.haciendaLechera[0].codHacienda);
      this.Openpopup(this.form_RecepcionHacLechera.value, 'Editar Recepción de Hacienda Lechera', PopupRegistroRlComponent);
    } else if (recepciondeLechero_dto.lecheroIndependiente) {
      this.form_RecepcionIndepLechera.patchValue({
        codRecepcion: recepciondeLechero_dto.codRecepcion || '',
        fechaRecepcion: recepciondeLechero_dto.fechaRecepcion || '',
        resultadosPruebasCalidad: recepciondeLechero_dto.resultadosPruebasCalidad || '',
        cantidadLecheRecibida: recepciondeLechero_dto.cantidadLecheRecibida || '',
        pagoTotal: recepciondeLechero_dto.pagoTotal || '',
        //este valia anteriomente 
        ///lecheroIndependiente: recepciondeLechero_dto.lecheroIndependiente[0].codLechero || ''
        lecheroIndependiente: recepciondeLechero_dto.lecheroIndependiente.map((lechero: any) => lechero.codLechero)
      });

      this.Openpopup(this.form_RecepcionIndepLechera.value, 'Editar Recepción de Lechero Independiente', PopupRegistroRlindepComponent);
    }
}

/*
  delete(codRecepcion: string) {
    this.recepcionHaclechera.deleteRecepcionLeche(codRecepcion).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }*/

  delete(codRecepcion: string) {
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
        this.recepcionHaclechera.deleteRecepcionLeche(codRecepcion).subscribe(response => {
          console.log(response);
          this.fetchData();
          Swal.fire({
            title: "Eliminado !",
            text: "Tu dato ha sido eliminado.",
            icon: "success"
          });
        }, (error) => {
          console.error(error);
        });
      }
    });
  }



  addRecepcionHacleche() {
    this.Openpopup(0, 'Añadir Recepción de Hacienda Lechera', PopupRegistroRlComponent);
  }

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Ventana de dialogo recepciondeLechero_dto
  Openpopup(recepciondeLechero_dto: any, title: any, PopupRegistroRlComponent: any) {
    const dialogRef = this.dialog.open(PopupRegistroRlComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        formData: recepciondeLechero_dto  // Pass the form data
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      console.log(item);
      this.fetchData();
    });

  }


  addRecepcionIndependienteleche () {
    this.Openpopup(0, 'Añadir Recepción de Lechero Independiente', PopupRegistroRlindepComponent);
  }


}
