import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, of } from 'rxjs';
import { RecepcionLecheService } from 'src/app/services/recepcion-leche/recepcion-leche.service';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-popup-registro-rl',
  templateUrl: './popup-registro-rl.component.html',
  styleUrls: ['./popup-registro-rl.component.scss']
})
export class PopupRegistroRlComponent implements OnInit{
  
  //buscar select
  searchControl = new FormControl();
filteredHaciendasLecheras: Observable<string[]>;

  //haciendasLecheras: any[] = [];
  haciendasLecheras: string[] = [];
  
  form_RecepcionHacLechera: FormGroup;
  //  dataSource: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codRecepcion', 'fechaRecepcion', 'resultadosPruebasCalidad', 'cantidadLecheRecibida', 'pagoTotal', 'haciendaLechera', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  
  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private recepcionHaclecheServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public recepciondeLechero_dto: any,
    private ref: MatDialogRef<PopupRegistroRlComponent>,
    private formBuilder: FormBuilder,
    private recepcionHacLechera: RecepcionLecheService
  ) {
    this.form_RecepcionHacLechera = this.formBuilder.group({});
    this.filteredHaciendasLecheras = of([]);
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();

    this.inputdata = this.recepciondeLechero_dto;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }

    this.getCodHacienda(); // Obtén las haciendas lecheras disponibles

    this.filteredHaciendasLecheras = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filterHaciendasLecheras(value))
    );
  }

  private filterHaciendasLecheras(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.haciendasLecheras.filter(hacienda => hacienda.toLowerCase().includes(filterValue));
  }

  getCodHacienda() {
    this.recepcionHacLechera.getCodHacienda().subscribe(
      (response: string[]) => {
        this.haciendasLecheras = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  private buildForm() {
    this.form_RecepcionHacLechera = this.formBuilder.group({
      codRecepcion:[this.generateCodLechero(), Validators.required],
      fechaRecepcion: ['', Validators.required],
      resultadosPruebasCalidad: ['', Validators.required],
      cantidadLecheRecibida: ['', Validators.required],
      pagoTotal: ['', Validators.required],
      //haciendaLechera: ['']
      haciendaLechera: [[], Validators.required]
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
    if (this.form_RecepcionHacLechera.valid) {
      const value = this.form_RecepcionHacLechera.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_RecepcionHacLechera.markAllAsTouched();
    }
  }

  editingcodRecepcion: string | null = null;


  //otra version nueva multiples
  submitForm() {
    if (this.form_RecepcionHacLechera.valid) {
      const value = this.form_RecepcionHacLechera.value;
  
      // Asegurarse de que haciendaLechera sea un array en ambos casos
      value.haciendaLechera = Array.isArray(value.haciendaLechera) ? value.haciendaLechera : [value.haciendaLechera];
  
      console.log('Value del Subtmit:', value);
  
      if (this.editingcodRecepcion) {
        value.codRecepcion = this.editingcodRecepcion;
        this.recepcionHaclecheServiceSubscription = this.recepcionHacLechera.updateRecepcionLeche(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodRecepcion = null;
            this.form_RecepcionHacLechera.reset();
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
        // Asegurarse de que haciendaLechera sea un array antes de guardar
        value.haciendaLechera = Array.isArray(value.haciendaLechera) ? value.haciendaLechera : [value.haciendaLechera];
  
        this.recepcionHaclecheServiceSubscription = this.recepcionHacLechera.saveRecepcionHaciendaLechera(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_RecepcionHacLechera.reset();
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
      this.form_RecepcionHacLechera.markAllAsTouched();
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
    if (!this.form_RecepcionHacLechera) {
      this.buildForm();
    }
  
    // Set the form values before opening the dialog
    this.form_RecepcionHacLechera.setValue(
      {
        codRecepcion: recepciondeLechero_dto.codRecepcion || '',
        fechaRecepcion: recepciondeLechero_dto.fechaRecepcion || '',
        resultadosPruebasCalidad: recepciondeLechero_dto.resultadosPruebasCalidad || '',
        cantidadLecheRecibida: recepciondeLechero_dto.cantidadLecheRecibida || '',
        pagoTotal: recepciondeLechero_dto.pagoTotal || '',
       // haciendaLechera: [recepciondeLechero_dto.haciendaLechera[0].codHacienda] || [''] vale para select
       //haciendaLechera: recepciondeLechero_dto.haciendaLechera[0].codHacienda || ''
       //haciendaLechera: [recepciondeLechero_dto.haciendaLechera[0].codHacienda] || ''
      //valido
      // haciendaLechera: recepciondeLechero_dto.haciendaLechera || ''
      haciendaLechera: Array.isArray(recepciondeLechero_dto.haciendaLechera)
      ? recepciondeLechero_dto.haciendaLechera
      : [recepciondeLechero_dto.haciendaLechera || '']  // Asegúrate de que haciendaLechera sea un array

//haciendaLechera: recepciondeLechero_dto.haciendaLechera.map((hacienda: any) => hacienda.codHacienda)
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
