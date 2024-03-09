import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, map, of, startWith } from 'rxjs';
import { RecepcionLecheService } from 'src/app/services/recepcion-leche/recepcion-leche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-registro-rlindep',
  templateUrl: './popup-registro-rlindep.component.html',
  styleUrls: ['./popup-registro-rlindep.component.scss']
})
export class PopupRegistroRlindepComponent implements OnInit{

   //buscar select
   searchControl = new FormControl();
   filteredlecherosIndependientes: Observable<string[]>;

  //haciendasLecheras: any[] = [];
  lecherosIndependientes: string[] = [];

  form_RecepcionIndepLechera: FormGroup;
  //  dataSource: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codRecepcion', 'fechaRecepcion', 'resultadosPruebasCalidad', 'cantidadLecheRecibida', 'pagoTotal', 'lecheroIndependiente', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  
  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private recepcionHaclecheServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public recepciondeLechero_dto: any,
    private ref: MatDialogRef<PopupRegistroRlindepComponent>,
    private formBuilder: FormBuilder,
    private recepcionHacLechera: RecepcionLecheService
  ) {
    this.form_RecepcionIndepLechera = this.formBuilder.group({});
    //Esto para el filtro del select
    this.filteredlecherosIndependientes = of([]);
  }

  ngOnInit(): void {
    this.buildFormIndepLechera();
    this.fetchData();

    this.inputdata = this.recepciondeLechero_dto;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }

   this.getCodLechero(); // Obtén las lecheros independientes disponibles para el select

   //esto para el filtro del select
   this.filteredlecherosIndependientes = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filterLecherosIndependientes(value))
    );
  }

  //Filtro del select 
  private filterLecherosIndependientes(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.lecherosIndependientes.filter(lechero => lechero.toLowerCase().includes(filterValue));
  }

  //Obtener los codLechero disponibles
  getCodLechero() {
    this.recepcionHacLechera.getCodLechero().subscribe(
      (response: string[]) => {
        this.lecherosIndependientes = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  
  private buildFormIndepLechera() {
    this.form_RecepcionIndepLechera = this.formBuilder.group({
      codRecepcion:[this.generateCodLechero(), Validators.required],
      fechaRecepcion: ['', Validators.required],
      resultadosPruebasCalidad: ['', Validators.required],
      cantidadLecheRecibida: ['', Validators.required],
      pagoTotal: ['', Validators.required],
      //lecheroIndependiente: ['']
      lecheroIndependiente: [[], Validators.required]
    });
  }

  fetchData() {
    this.recepcionHacLechera.getAllRecepcionLeche().subscribe((response: any) => {
      this.dataSource = response;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form_RecepcionIndepLechera.valid) {
      const value = this.form_RecepcionIndepLechera.value;
      this.buildFormIndepLechera();
      this.closepopup();
    } else {
      this.form_RecepcionIndepLechera.markAllAsTouched();
    }
  }

  editingcodRecepcion: string | null = null;


  submitForm() {
    if (this.form_RecepcionIndepLechera.valid) {
      const value = this.form_RecepcionIndepLechera.value;
  
      // Asegurarse de que lecheroIndependiente sea un array en ambos casos
      value.lecheroIndependiente = Array.isArray(value.lecheroIndependiente) ? value.lecheroIndependiente : [value.lecheroIndependiente];
  
      console.log('Value del Subtmit:', value);
  
      if (this.editingcodRecepcion) {
        value.codRecepcion = this.editingcodRecepcion;
        this.recepcionHaclecheServiceSubscription = this.recepcionHacLechera.updateRecepcionLeche(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodRecepcion = null;
            this.form_RecepcionIndepLechera.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Dato Actualizado Correctamente :)",
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error(error);
          }
        );
      } else {
        // Asegurarse de que lecheroIndependiente sea un array antes de guardar
        value.lecheroIndependiente = Array.isArray(value.lecheroIndependiente) ? value.lecheroIndependiente : [value.lecheroIndependiente];
  
        this.recepcionHaclecheServiceSubscription = this.recepcionHacLechera.saveRecepcionLecheroIndependiente(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_RecepcionIndepLechera.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Dato Guardado Correctamente :)",
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error(error);
          }
        );
      }
    } else {
      this.form_RecepcionIndepLechera.markAllAsTouched();
    }
  }


  /*getHaciendasLecheras() {
    this.recepcionHacLechera.getHaciendasLecheras().subscribe(
      (response: any[]) => {
        this.haciendasLecheras = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }*/
  


  delete(codRecepcion: string) {
    this.recepcionHacLechera.deleteRecepcionLeche(codRecepcion).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }


  edit(recepciondeLechero_dto: any) {
    console.log('Data received OpenPup:', recepciondeLechero_dto);
  
    // Set editingCedula to the cedula of the data object
    this.editingcodRecepcion = recepciondeLechero_dto.codRecepcion;
  
    // If the form has not been built, build it
    if (!this.form_RecepcionIndepLechera) {
      this.buildFormIndepLechera();
    }
  
    // Set the form values before opening the dialog
    this.form_RecepcionIndepLechera.setValue(
      {
        codRecepcion: recepciondeLechero_dto.codRecepcion || '',
        fechaRecepcion: recepciondeLechero_dto.fechaRecepcion || '',
        resultadosPruebasCalidad: recepciondeLechero_dto.resultadosPruebasCalidad || '',
        cantidadLecheRecibida: recepciondeLechero_dto.cantidadLecheRecibida || '',
        pagoTotal: recepciondeLechero_dto.pagoTotal || '',
       // lecheroIndependiente: [recepciondeLechero_dto.lecheroIndependiente[0].codHacienda] || [''] vale para select
       //lecheroIndependiente: recepciondeLechero_dto.lecheroIndependiente[0].codHacienda || ''
       //lecheroIndependiente: [recepciondeLechero_dto.lecheroIndependiente[0].codLechero] || ''
      //este valia correctamente 
       //lecheroIndependiente: recepciondeLechero_dto.lecheroIndependiente || ''
       lecheroIndependiente: Array.isArray(recepciondeLechero_dto.lecheroIndependiente)
       ? recepciondeLechero_dto.lecheroIndependiente
       : [recepciondeLechero_dto.lecheroIndependiente || '']  // Asegúrate de que haciendaLechera sea un array
 
      });
  }

  

  closepopup() {
    this.ref.close('Closed using function');
  }


  //Metodo Para el ID automatico 
  generateCodLechero(): string {
    // Obtén el último codLechero generado del almacenamiento local
    let lastCodLecheroNumber = localStorage.getItem('lastRecepcionCodHaciendaLechNumber');
    let number = lastCodLecheroNumber ? +lastCodLecheroNumber : 0;
  
    // Incrementa el número
    number++;
  
    // Almacena el nuevo número en el almacenamiento local
    localStorage.setItem('lastRecepcionCodHaciendaLechNumber', number.toString());
  
    // Genera el nuevo codLechero
    let newCodLechero = 'RHL-' + this.pad(number, 3);
    return newCodLechero;
  }

  // Esta función añade ceros a la izquierda de un número hasta que tenga un tamaño específico
  private pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
