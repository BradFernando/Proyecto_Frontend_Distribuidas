import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, map, of, startWith } from 'rxjs';
import { ProcesoVerificacionService } from 'src/app/services/proceso-verificacion/proceso-verificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-registro-pv5',
  templateUrl: './popup-registro-pv5.component.html',
  styleUrls: ['./popup-registro-pv5.component.scss']
})
export class PopupRegistroPv5Component implements OnInit {

   //buscar select
   searchControl = new FormControl();
   filteredLotes: Observable<string[]>;
   filteredprocesosPasteurizacion: Observable<string[]>;

   //lista para las lotes productos
  lotesProductos: string[] = [];
  //Procesos de Pasteurizacion
  procesosPasteurizacion: string[] = [];

  form_procesoVerificacion: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codProcesoVerificacion', 'resultadoVerificacion', 'tiempoTratamiento', 'observaciones', 'detallesProceso', 'procesoPasteurizacion', 'loteProductos', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private procesoVerificacionServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataProcesoVerificacion: any,
    private ref: MatDialogRef<PopupRegistroPv5Component>,
    private formBuilder: FormBuilder,
    private procesoVerificacionService: ProcesoVerificacionService
  ) {
    this.form_procesoVerificacion = this.formBuilder.group({});
    this.filteredLotes = of([]);
    this.filteredprocesosPasteurizacion = of([]);
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();

    this.inputdata = this.dataProcesoVerificacion;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }

    this.getCodLotesProductos(); // Obtén los lotes disponibles
    this.getProcesosPasteurizacion(); // Obtén los procesos de pasteurización disponibles

    //select 
    this.filteredLotes = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filterLotesProductos(value))
    );

    this.filteredprocesosPasteurizacion = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filterProcesosPasteurizacion(value))
    );

  }

  //select 
  private filterLotesProductos(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.lotesProductos.filter(lote => lote.toLowerCase().includes(filterValue));
  }

  private filterProcesosPasteurizacion(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.procesosPasteurizacion.filter(proceso => proceso.toLowerCase().includes(filterValue));
  }


  getCodLotesProductos() {
    this.procesoVerificacionService.getCodLoteProductos_cod().subscribe(
      (response: string[]) => {
        this.lotesProductos = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getProcesosPasteurizacion() {
    this.procesoVerificacionService.getCodProcesosPasteurizacion_cod().subscribe(
      (response: string[]) => {
        this.procesosPasteurizacion = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }



  private buildForm() {
    this.form_procesoVerificacion = this.formBuilder.group({
      codProcesoVerificacion:[this.generateCodProcesoVerificacion(), Validators.required],
      resultadoVerificacion: ['', Validators.required],
      tiempoTratamiento: ['', Validators.required],
      observaciones: ['', Validators.required],
      detallesProceso: ['', Validators.required],
      procesoPasteurizacion: ['', Validators.required],
      loteProductos: [[], Validators.required]
    });
  }

  fetchData() {
    this.procesoVerificacionService.getAllProcesoVerificacion().subscribe((response: any) => {
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
    if (this.form_procesoVerificacion.valid) {
      const value = this.form_procesoVerificacion.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_procesoVerificacion.markAllAsTouched();
    }
  }

  editingcodProcesoVerificacion: string | null = null;

  submitForm() {
    if (this.form_procesoVerificacion.valid) {
      const value = this.form_procesoVerificacion.value;
  
      // Asegurarse de que loteProductos sea un array en ambos casos
      value.loteProductos = Array.isArray(value.loteProductos) ? value.loteProductos : [value.loteProductos];
  
      // Eliminar procesoPasteurizacion si su valor es una cadena vacía
    if (value.procesoPasteurizacion === '') {
      delete value.procesoPasteurizacion;
    }

    console.log('Value del Subtmit:', value);
  
      if (this.editingcodProcesoVerificacion) {
        value.codProcesoVerificacion = this.editingcodProcesoVerificacion;
        this.procesoVerificacionServiceSubscription = this.procesoVerificacionService.updateProcesoVerificacion(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodProcesoVerificacion = null;
            this.form_procesoVerificacion.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Actualizado Correctamente :)",
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error(error);
          }
        );
      } else {
        this.procesoVerificacionServiceSubscription = this.procesoVerificacionService.saveProcesoVerificacion(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_procesoVerificacion.reset();
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
      this.form_procesoVerificacion.markAllAsTouched();
    }
  }

  delete(codProcesoVerificacion: string) {
    this.procesoVerificacionService.deleteProcesoVerificacion(codProcesoVerificacion).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }

  edit(dataProcesoVerificacion: any) {
    console.log('Data received OpenPup:', dataProcesoVerificacion);

    this.editingcodProcesoVerificacion = dataProcesoVerificacion.codProcesoVerificacion;

    if (!this.form_procesoVerificacion) {
      this.buildForm();
    }

    this.form_procesoVerificacion.setValue(
      {
        codProcesoVerificacion: dataProcesoVerificacion.codProcesoVerificacion || '',
        resultadoVerificacion: dataProcesoVerificacion.resultadoVerificacion,
        tiempoTratamiento: dataProcesoVerificacion.tiempoTratamiento || '',
        observaciones: dataProcesoVerificacion.observaciones || '',
        detallesProceso: dataProcesoVerificacion.detallesProceso || '',
        procesoPasteurizacion: dataProcesoVerificacion.procesoPasteurizacion.codProcesoPastz || '', //codProcesoPastz
        loteProductos: Array.isArray(dataProcesoVerificacion.loteProductos)
        ? dataProcesoVerificacion.loteProductos
        : [dataProcesoVerificacion.loteProductos || '']
      });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


  
  //Metodo Para el ID automatico 
  generateCodProcesoVerificacion(): string {
    // Obtén el último codLechero generado del almacenamiento local
    let lastCodLecheroNumber = localStorage.getItem('dataProcesoVerificacionLechNumber');
    let number = lastCodLecheroNumber ? +lastCodLecheroNumber : 0;
  
    // Incrementa el número
    number++;
  
    // Almacena el nuevo número en el almacenamiento local
    localStorage.setItem('dataProcesoVerificacionLechNumber', number.toString());
  
    // Genera el nuevo codLechero
    let newCodLechero = 'PV-' + this.pad(number, 3);
    return newCodLechero;
  }

  // Esta función añade ceros a la izquierda de un número hasta que tenga un tamaño específico
  private pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }


}
