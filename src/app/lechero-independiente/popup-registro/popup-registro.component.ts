import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LecheroIndependienteService } from '../../services/lechero-independiente/lechero-independiente.service';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-registro',
  templateUrl: './popup-registro.component.html',
  styleUrls: ['./popup-registro.component.scss']
})
export class PopupRegistroComponent implements OnInit{
  form_LecheroIndependiente: FormGroup;
  dataSource: any[] = [];
  displayedColumns: string[] = ['codLechero','nombres', 'apellidos', 'cedula', 'direccion', 'email', 'contacto', 'fechaCompra', 'detallesSuministro', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private lecheroServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupRegistroComponent>,
    private formBuilder: FormBuilder,
    private lecheroService: LecheroIndependienteService
  ) {
    this.form_LecheroIndependiente = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
    
   /* this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.edit(this.inputdata.code);
    }*/
    this.inputdata = this.data;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }
  }

  /*
  ngOnDestroy(): void {
    if (this.lecheroServiceSubscription) {
      this.lecheroServiceSubscription.unsubscribe();
    }
  }*/

  private buildForm() {
    this.form_LecheroIndependiente = this.formBuilder.group({
      codLechero: [this.generateCodLechero(), Validators.required],
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      cedula: ['',[Validators.required,  Validators.pattern(/^\d{10}$/), this.validacionIDEcuatoriana]],
      direccion: ['',Validators.required],
      contacto: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['',[Validators.required,Validators.email]],
      fechaCompra: ['',Validators.required],
      detallesSuministro: [{ value: '', disabled: this.disableSelect.value }]
    });
  }


  //validacion de cedula Ecuatoriana 
  validacionIDEcuatoriana(control: AbstractControl) {
    
    if (control.value === null || control.value === undefined) {
      return { 'cedulaInvalida': true };
    }
    
    const cedula = control.value.toString(); // Convertir a cadena

    const Ncedula = cedula.length;

    if (Ncedula !== 10) {
      return { 'cedulaInvalida': true };
    } else {
      let suma = 0;
      const verif = parseInt(cedula.charAt(9), 10);

      for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedula.charAt(i), 10);

        if (i % 2 === 0) {
          digito *= 2;

          if (digito > 9) {
            digito -= 9;
          }
        }

        suma += digito;
      }
      const resultado = 10 - (suma % 10);
      if (resultado === verif || (resultado === 10 && verif === 0)) {
        return null;
      } else {
        return { 'cedulaInvalida': true };
      }
    }
  }
    

  fetchData() {
    this.lecheroService.getAllLecheros().subscribe(
      (response: any) => {
        console.log('Datos obtenidos del servicio:', response);
        this.dataSource = response;
        if (this.table) {
          this.table.renderRows();
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  

  save(event: Event) {
    event.preventDefault();
    if (this.form_LecheroIndependiente.valid) {
      const value = this.form_LecheroIndependiente.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_LecheroIndependiente.markAllAsTouched();
    }
  }

  submitForm() {
    if (this.form_LecheroIndependiente.valid) {
      const value = this.form_LecheroIndependiente.value;
      if (this.editingcodLechero) {
        this.lecheroServiceSubscription = this.lecheroService.updateLechero(this.editingcodLechero, value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodLechero = null;
            this.form_LecheroIndependiente.reset();
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
        this.lecheroServiceSubscription = this.lecheroService.addLechero(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_LecheroIndependiente.reset();
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
      this.form_LecheroIndependiente.markAllAsTouched();
    }
  }

  delete(codLechero: string) {
    this.lecheroServiceSubscription = this.lecheroService.deleteLechero(codLechero).subscribe(
      response => {
        console.log(response);
        this.fetchData();
      },
      error => {
        console.error(error);
      }
    );
  }

  editingcodLechero: string | null = null;

  /*edit(data: any) {
    this.editingCedula = data.cedula;
    this.form_LecheroIndependiente.setValue({
      nombres: data.nombres || '',
      apellidos: data.apellidos || '',
      cedula: data.cedula || '',
      direccion: data.direccion || '',
      email: data.email || '',
      contacto: data.contacto || '',
      fechaCompra: data.fechaCompra || '',
    //  informacionContacto: data.informacionContacto || '',
      detallesSuministro: data.detallesSuministro || ''
    });
  }*/

  edit(data: any) {
    console.log('Data received OpenPup:', data);
  
    // Set editingCedula to the cedula of the data object
    this.editingcodLechero = data.codLechero;
  
    // If the form has not been built, build it
    if (!this.form_LecheroIndependiente) {
      this.buildForm();
    }
  
    // Set the form values before opening the dialog
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
  
    console.log('Form after setValue OpenPup:', this.form_LecheroIndependiente.value);
  }
  
  

  closepopup() {
    this.ref.close('Closed using function');
  }


  //Metodo Para el ID automatico 
  generateCodLechero(): string {
    // Obtén el último codLechero generado del almacenamiento local
    let lastCodLecheroNumber = localStorage.getItem('lastCodLecheroNumber');
    let number = lastCodLecheroNumber ? +lastCodLecheroNumber : 0;
  
    // Incrementa el número
    number++;
  
    // Almacena el nuevo número en el almacenamiento local
    localStorage.setItem('lastCodLecheroNumber', number.toString());
  
    // Genera el nuevo codLechero
    let newCodLechero = 'LI-' + this.pad(number, 3);
    return newCodLechero;
  }

  // Esta función añade ceros a la izquierda de un número hasta que tenga un tamaño específico
  private pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  
}

  