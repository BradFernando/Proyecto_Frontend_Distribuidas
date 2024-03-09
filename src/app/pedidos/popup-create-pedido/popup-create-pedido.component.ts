import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-popup-create-pedido',
  templateUrl: './popup-create-pedido.component.html',
  styleUrls: ['./popup-create-pedido.component.scss']
})
export class PopupCreatePedidoComponent implements OnInit{

  form_Pedido: FormGroup;
  //dataSource: Array<any> = [];
  dataSource: any;

  inputdata: any;

  private pedidoServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataPedido: any,
    private ref: MatDialogRef<PopupCreatePedidoComponent>,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private pedidosService: PedidosService){
      this.form_Pedido = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.clienteCombo();

    this.inputdata = this.dataPedido;
  }

  private buildForm() {
    this.form_Pedido = this.formBuilder.group({
      _cliente: ['', Validators.required],
      cantidad_solicitada: ['', Validators.required],
      observaciones: ['', Validators.required]
    });
  }

  clienteCombo() {
    this.clienteService.getAllClientes().subscribe((response: any) => {
      this.dataSource = response;
    }, (error: any) => {
      console.error(error);
    });
  }

  submitForm() {
    if (this.form_Pedido.valid) {
      const value = this.form_Pedido.value;
      console.log(value);
    
        this.pedidoServiceSubscription = this.pedidosService.createPedido(value).subscribe(
          response => {
            console.log(response);
            this.clienteCombo();
            this.form_Pedido.reset();
          },
          error => {
            console.error(error);
          }
        );
    } else {
      this.form_Pedido.markAllAsTouched();
    }
  }
  
  save(event: Event) {
    event.preventDefault();
    if (this.form_Pedido.valid) {
      const value = this.form_Pedido.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_Pedido.markAllAsTouched();
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

}
