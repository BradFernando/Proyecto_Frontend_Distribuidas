import {ViewChild, Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import { LecheroIndependienteService } from '../services/lechero-independiente/lechero-independiente.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupRegistroComponent } from './popup-registro/popup-registro.component';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

//paginator
//import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lechero-independiente',
  templateUrl: './lechero-independiente.component.html',
  styleUrls: ['./lechero-independiente.component.scss']
})
export class LecheroIndependienteComponent implements OnInit {
  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


form_LecheroIndependiente: FormGroup;
  //dataSource: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombres', 'apellidos', 'cedula', 'direccion', 'email', 'contacto', 'fechaCompra', 'detallesSuministro', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  //dataSource = new MatTableDataSource<any>(); // Usa MatTableDataSource aquí
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Asegúrate de importar MatPaginator
  @ViewChild(MatSort) sort!: MatSort; // Asegúrate de importar MatSort
  
  disableSelect = new FormControl(false);
  private lecheroServiceSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private lecheroService: LecheroIndependienteService
  ) {
    this.form_LecheroIndependiente = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }


  private buildForm() {
    this.form_LecheroIndependiente = this.formBuilder.group({
      codLechero:[''],
      nombres: [''],
      apellidos: [''],
      cedula: [''],
      direccion: [''],
      contacto: [''],
      email: [''],
      fechaCompra: [''],
      detallesSuministro: [{ value: '', disabled: this.disableSelect.value }]
    });
  }


fetchData() {
  this.lecheroService.getAllLecheros().subscribe(
    (response: any) => {
      console.log('Datos obtenidos del servicio:', response);
      this.dataSource = new MatTableDataSource(response); // Usa MatTableDataSource aquí
      this.dataSource.paginator = this.paginator; // Asigna el paginador después de actualizar los datos
      if (this.table) {
        this.table.renderRows();
      }
    },
    (error: any) => {
      console.error(error);
    }
  );
}

/*
  delete(codLechero: string) {
    this.lecheroService.deleteLechero(codLechero).subscribe(
      (response) => {
        console.log(response);
        this.fetchData();
      },
      (error) => {
        console.error(error);
      }
    );
  }
*/

delete(codLechero: string) {
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
      this.lecheroService.deleteLechero(codLechero).subscribe(response => {
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




  addcustomer() {
    this.Openpopup(0, 'Añadir Lechero Independiente', PopupRegistroComponent);
  }

  Openpopup(data: any, title: any, PopupRegistroComponent: any) {
    const dialogRef = this.dialog.open(PopupRegistroComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        formData: data  // Pass the form data
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      console.log(item);
      this.fetchData();
    });
  }


  editingcodLechero: string | null = null;

  edit(data: any) {
    console.log('Data received:', data);
    this.editingcodLechero = data.codLechero;
    this.form_LecheroIndependiente.setValue({
      codLechero: data.codLechero || '',
      nombres: data.nombres || '',
      apellidos: data.apellidos || '',
      cedula: data.cedula || '',
      direccion: data.direccion || '',
      email: data.email || '',
      contacto: data.contacto || '',
      fechaCompra: data.fechaCompra || '',
      detallesSuministro: data.detallesSuministro || ''
    });
    console.log('Form after setValue:', this.form_LecheroIndependiente.value);
  
    // Open the dialog with the form data
    this.Openpopup(this.form_LecheroIndependiente.value, 'Editar Lechero Independiente', PopupRegistroComponent);
  }

  //separar sunministro 
  getSuministroDisplayValue(suministro: string): string {
    switch (suministro) {
      case 'suministroCompleto':
        return 'Suministro Completo';
      case 'suministroIncompleto':
        return 'Suministro Incompleto';
      default:
        return suministro;
    }
  }
  
  
  
}
