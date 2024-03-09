import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { HaciendaLecheraService } from '../../services/hacienda-lechera/hacienda-lechera.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupRegistroComponent } from 'src/app/lechero-independiente/popup-registro/popup-registro.component';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-popup-registro-hl',
  templateUrl: './popup-registro-hl.component.html',
  styleUrls: ['./popup-registro-hl.component.scss']
})
export class PopupRegistroHlComponent implements OnInit {

  form_HaciendaLechera: FormGroup;
  dataSource: any[] = [];
  displayedColumns: string[] = ['codHacienda','nombreHacienda', 'ruc', 'direccion', 'telefonoEmpresa', 'email', 'responsable', 'telefonoContacto', 'fechaCompra', 'detallesSuministro', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  disableSelect = new FormControl(false);

  inputdata: any;
  closemessage = 'closed using directive';
  private haciendalecheServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataHacLechera: any,
    private ref: MatDialogRef<PopupRegistroComponent>,
    private formBuilder: FormBuilder,
    private haciendaLechera: HaciendaLecheraService
  ) {
    this.form_HaciendaLechera = this.formBuilder.group({});
  }


  ngOnInit(): void {
    this.buildForm();
    this.fetchData();

    this.inputdata = this.dataHacLechera;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }
  }

  private buildForm() {
    this.form_HaciendaLechera = this.formBuilder.group({
      codHacienda:[this.generateCodLechero(), Validators.required],
      nombreHacienda: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      direccion: ['', Validators.required],
      telefonoEmpresa: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['',[ Validators.required, Validators.email]],
      responsable: ['', Validators.required],
      telefonoContacto: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      fechaCompra: ['', Validators.required],
      detallesSuministro: [{ value: '', disabled: this.disableSelect.value }]
    });
  }

  
  fetchData() {
    this.haciendaLechera.getAllHaciendaLechera().subscribe((response: any) => {
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
    if (this.form_HaciendaLechera.valid) {
      const value = this.form_HaciendaLechera.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_HaciendaLechera.markAllAsTouched();
    }
  }

  editingcodHacienda: string | null = null;

  submitForm() {
    if (this.form_HaciendaLechera.valid) {
      const value = this.form_HaciendaLechera.value;
      console.log('values hacienda lechero'+value);
      if (this.editingcodHacienda) {
        this.haciendalecheServiceSubscription = this.haciendaLechera.updateHaciendaLechera(this.editingcodHacienda, value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.editingcodHacienda = null;
            this.form_HaciendaLechera.reset();
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
        this.haciendalecheServiceSubscription = this.haciendaLechera.addHaciendaLechera(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_HaciendaLechera.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Dato Guardado Correctamente :)",
              showConfirmButton: false,
              timer: 1900
            });
          },
          error => {
            console.error(error);
          }
        );
      }
    } else {
      this.form_HaciendaLechera.markAllAsTouched();
    }
  }


  delete(codHacienda: string) {
    this.haciendaLechera.deleteHaciendaLechera(codHacienda).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }


  edit(dataHacLechera: any) {
    console.log('Data received OpenPup:', dataHacLechera);
  
    // Set editingCedula to the cedula of the data object
    this.editingcodHacienda = dataHacLechera.codHacienda;
  
    // If the form has not been built, build it
    if (!this.form_HaciendaLechera) {
      this.buildForm();
    }
  
    // Set the form values before opening the dialog
    this.form_HaciendaLechera.setValue(
      {
        codHacienda: dataHacLechera.codHacienda || '',
        nombreHacienda: dataHacLechera.nombreHacienda || '',
        ruc: dataHacLechera.ruc || '',
        direccion: dataHacLechera.direccion || '',
        telefonoEmpresa: dataHacLechera.telefonoEmpresa || '',
        email: dataHacLechera.email || '',
        responsable: dataHacLechera.responsable || '',
        telefonoContacto: dataHacLechera.telefonoContacto || '',
        fechaCompra: dataHacLechera.fechaCompra || '',
        detallesSuministro: dataHacLechera.detallesSuministro || ''
      });
  
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


  //Metodo Para el ID automatico 
  generateCodLechero(): string {
    // Obtén el último codLechero generado del almacenamiento local
    let lastCodLecheroNumber = localStorage.getItem('lastCodHaciendaLechNumber');
    let number = lastCodLecheroNumber ? +lastCodLecheroNumber : 0;
  
    // Incrementa el número
    number++;
  
    // Almacena el nuevo número en el almacenamiento local
    localStorage.setItem('lastCodHaciendaLechNumber', number.toString());
  
    // Genera el nuevo codLechero
    let newCodLechero = 'HL-' + this.pad(number, 3);
    return newCodLechero;
  }

  // Esta función añade ceros a la izquierda de un número hasta que tenga un tamaño específico
  private pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
