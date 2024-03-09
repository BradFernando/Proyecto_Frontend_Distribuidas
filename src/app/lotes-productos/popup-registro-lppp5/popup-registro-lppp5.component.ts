import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LotesProductosService } from 'src/app/services/lotes-productos/lotes-productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-registro-lppp5',
  templateUrl: './popup-registro-lppp5.component.html',
  styleUrls: ['./popup-registro-lppp5.component.scss']
})
export class PopupRegistroLppp5Component implements OnInit {

  form_Lote: FormGroup;
  dataSource: any[] = [];
  displayedColumns: string[] = ['codLote', 'nombreLote', 'tipoLote', 'fechadeProduccion', 'fechadeVencimiento', 'detallesLote', 'cantidadPaquetesTotales','cantidadPaquetesDisponibles', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private loteProductosServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataLote: any,
    private ref: MatDialogRef<PopupRegistroLppp5Component>,
    private formBuilder: FormBuilder,
    private loteProductosService: LotesProductosService
  ) {
    this.form_Lote = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();

    this.inputdata = this.dataLote;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }
  }

  private buildForm() {
    this.form_Lote = this.formBuilder.group({
      codLote:[this.generateCodLotesProductos(), Validators.required],
      nombreLote: ['', Validators.required],
      tipoLote: ['', Validators.required],
      fechadeProduccion: ['', Validators.required],
      fechadeVencimiento: ['', Validators.required],
      detallesLote: ['', Validators.required],
      cantidadPaquetesTotales: ['', Validators.required],
      cantidadPaquetesDisponibles: ['', Validators.required]
    });
  }

  fetchData() {
    this.loteProductosService.getAllLoteProductos().subscribe((response: any) => {
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
    if (this.form_Lote.valid) {
      const value = this.form_Lote.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_Lote.markAllAsTouched();
    }
  }

  editingcodLote: string | null = null;

  submitForm() {
    if (this.form_Lote.valid) {
      const value = this.form_Lote.value;
      console.log('values lote '+value);
      if (this.editingcodLote) {
        this.loteProductosServiceSubscription = this.loteProductosService.updateLoteProductos(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodLote = null;
            this.form_Lote.reset();
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
        this.loteProductosServiceSubscription = this.loteProductosService.saveLoteProductos(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_Lote.reset();
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
      this.form_Lote.markAllAsTouched();
    }
  }

  


  delete(codLote: string) {
    this.loteProductosService.deleteLoteProductos(codLote).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }

  edit(dataLote: any) {
    console.log('Data received OpenPup:', dataLote);

    this.editingcodLote = dataLote.codLote;

    if (!this.form_Lote) {
      this.buildForm();
    }

    this.form_Lote.setValue(
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
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


  

  //Metodo Para el ID automatico 
  generateCodLotesProductos(): string {
    // Obtén el último codLechero generado del almacenamiento local
    let lastCodLecheroNumber = localStorage.getItem('lastCodLotesProducNumber');
    let number = lastCodLecheroNumber ? +lastCodLecheroNumber : 0;
  
    // Incrementa el número
    number++;
  
    // Almacena el nuevo número en el almacenamiento local
    localStorage.setItem('lastCodLotesProducNumber', number.toString());
  
    // Genera el nuevo codLechero
    let newCodLechero = 'LP-' + this.pad(number, 3);
    return newCodLechero;
  }

  // Esta función añade ceros a la izquierda de un número hasta que tenga un tamaño específico
  private pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
