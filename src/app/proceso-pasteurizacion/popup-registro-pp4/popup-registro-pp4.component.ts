import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, map, of, startWith } from 'rxjs';
import { ProcesoPasteurizacionService } from 'src/app/services/proceso-pasteurizacion/proceso-pasteurizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-registro-pp4',
  templateUrl: './popup-registro-pp4.component.html',
  styleUrls: ['./popup-registro-pp4.component.scss']
})
export class PopupRegistroPp4Component  implements OnInit{

   //buscar select
   searchControl = new FormControl();
   filteredRecepcionesLecheras: Observable<string[]>;

 //lista para las recepciones de leche 
  recepcionesLeche: string[] = [];
  
  form_procesoParteurizacion: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codProcesoPastz', 'cantidadLitrosUsados', 'temperatura', 'tiempoTratamiento', 'tipoProcesamiento', 'detallesProceso', 'recepcionLeche', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  
  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private   procesoParteurizacionServiceSubscription  : Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataProcesoPasteurizacion: any,
    private ref: MatDialogRef<PopupRegistroPp4Component>,
    private formBuilder: FormBuilder,
    private procesoPasteurizacion: ProcesoPasteurizacionService
  ) {
    this.form_procesoParteurizacion = this.formBuilder.group({});
    this.filteredRecepcionesLecheras = of([]);
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();

    this.inputdata = this.dataProcesoPasteurizacion;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }

    this.getCodProcesoPastz(); // Obtén las haciendas lecheras disponibles

    //select 
    this.filteredRecepcionesLecheras = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filterRecepcionLecheras(value))
    );

  }

  //select 
  private filterRecepcionLecheras(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.recepcionesLeche.filter(recepcion => recepcion.toLowerCase().includes(filterValue));
  }

  getCodProcesoPastz() {
    this.procesoPasteurizacion.getCodRecepcionLeche().subscribe(
      (response: string[]) => {
        this.recepcionesLeche = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  private buildForm() {
    this.form_procesoParteurizacion = this.formBuilder.group({
      codProcesoPastz:[this.generateCodLechero(), Validators.required],
      cantidadLitrosUsados: ['', Validators.required],
      temperatura: ['', Validators.required],
      tiempoTratamiento: ['', Validators.required],
      tipoProcesamiento: ['', Validators.required],
      detallesProceso: ['', Validators.required],
     // recepcionLeche: ['']
      recepcionLeche: [[], Validators.required]
    });
  }

  fetchData() {
    this.procesoPasteurizacion.getAllProcesoPasteurizacion().subscribe((response: any) => {
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
    if (this.form_procesoParteurizacion.valid) {
      const value = this.form_procesoParteurizacion.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_procesoParteurizacion.markAllAsTouched();
    }
  }

  editingcodProcesoPastz: string | null = null;



  submitForm() {
    if (this.form_procesoParteurizacion.valid) {
      const value = this.form_procesoParteurizacion.value;
  
      // Asegurarse de que haciendaLechera sea un array en ambos casos
      value.recepcionLeche = Array.isArray(value.recepcionLeche) ? value.recepcionLeche : [value.recepcionLeche];
  
      console.log('Value del Subtmit:', value);
  
      if (this.editingcodProcesoPastz) {
        value.codProcesoPastz = this.editingcodProcesoPastz;
        this.procesoParteurizacionServiceSubscription = this.procesoPasteurizacion.updateProcesoPasteurizacion(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodProcesoPastz = null;
            this.form_procesoParteurizacion.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Almacenado Correctamente :)",
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error(error);
          }
        );
      } else {
        // Asegurarse de que recepcionLeche sea un array antes de guardar
        value.recepcionLeche = Array.isArray(value.recepcionLeche) ? value.recepcionLeche : [value.recepcionLeche];
  
        this.procesoParteurizacionServiceSubscription = this.procesoPasteurizacion.saveProcesoPasteurizacion(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_procesoParteurizacion.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Almacenado Correctamente :)",
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
      this.form_procesoParteurizacion.markAllAsTouched();
    }
  }


  delete(codProcesoPastz: string) {
    this.procesoPasteurizacion.deleteProcesoPasteurizacion(codProcesoPastz).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }


  edit(dataProcesoPasteurizacion: any) {
    console.log('Data received OpenPup:', dataProcesoPasteurizacion);
  
    // Set editingCedula to the cedula of the data object
    this.editingcodProcesoPastz = dataProcesoPasteurizacion.codRecepcion;
  
    // If the form has not been built, build it
    if (!this.form_procesoParteurizacion) {
      this.buildForm();
    }
  
    // Set the form values before opening the dialog
    this.form_procesoParteurizacion.setValue(
      {
        codProcesoPastz: dataProcesoPasteurizacion.codProcesoPastz || '',
        cantidadLitrosUsados: dataProcesoPasteurizacion.cantidadLitrosUsados || '',
        temperatura: dataProcesoPasteurizacion.temperatura || '',
        tiempoTratamiento: dataProcesoPasteurizacion.tiempoTratamiento || '',
        tipoProcesamiento: dataProcesoPasteurizacion.tipoProcesamiento || '',
        detallesProceso: dataProcesoPasteurizacion.tipoProcesamiento || '',
       // recepcionLeche: dataProcesoPasteurizacion.recepcionLeche || ''
       recepcionLeche: Array.isArray(dataProcesoPasteurizacion.recepcionLeche)
       ? dataProcesoPasteurizacion.recepcionLeche
       : [dataProcesoPasteurizacion.recepcionLeche || ''] 

      });
  
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


  //Metodo Para el ID automatico 
  generateCodLechero(): string {
    // Obtén el último codLechero generado del almacenamiento local
    let lastCodLecheroNumber = localStorage.getItem('dataProcesoPasteurizacionLechNumber');
    let number = lastCodLecheroNumber ? +lastCodLecheroNumber : 0;
  
    // Incrementa el número
    number++;
  
    // Almacena el nuevo número en el almacenamiento local
    localStorage.setItem('dataProcesoPasteurizacionLechNumber', number.toString());
  
    // Genera el nuevo codLechero
    let newCodLechero = 'PP-' + this.pad(number, 3);
    return newCodLechero;
  }

  // Esta función añade ceros a la izquierda de un número hasta que tenga un tamaño específico
  private pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }


}
