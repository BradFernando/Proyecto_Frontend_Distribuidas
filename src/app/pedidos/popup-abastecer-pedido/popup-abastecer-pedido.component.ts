import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LotesProductosService } from 'src/app/services/lotes-productos/lotes-productos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-popup-abastecer-pedido',
  templateUrl: './popup-abastecer-pedido.component.html',
  styleUrls: ['./popup-abastecer-pedido.component.scss']
})
export class PopupAbastecerPedidoComponent implements OnInit{
  form_abastecer: FormGroup;
  dataCombo: any;

  public inputWithRangeValue = 128;

  inputdata: any;
  idPedido: string = "";
  cantidad:any = 0;
  private pedidoServiceSubscription: Subscription | undefined;
  private lotesServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataAbastecer: any,
    private ref: MatDialogRef<PopupAbastecerPedidoComponent>,
    private formBuilder: FormBuilder,
    private pedidosService: PedidosService,
    private lotesService: LotesProductosService
  ){
    this.form_abastecer = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this.buildForm();
    this.inputdata = this.dataAbastecer;
    this.idPedido = this.dataAbastecer.idPedido;
    this.lotesCombo();
  }

  lotesCombo(){
    this.lotesServiceSubscription = this.lotesService.getListCodLoteNombreLote().subscribe(
      response => {
        console.log(response);
        this.dataCombo = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  cantidadPaquetesLote(idLote:string){
    this.lotesServiceSubscription = this.lotesService.getCantidadPaquetesDisponiblesByCodLote(idLote).subscribe(
      response => {
        this.cantidad = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  private buildForm() {
    this.form_abastecer = this.formBuilder.group({
      codLote: ['', Validators.required],
      cantidad_paquetes: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form_abastecer.valid) {
      const value = this.form_abastecer.value;
      const idPedido = {
        idPedido: this.idPedido
      };
      const finalResult = Object.assign(value, idPedido);
      console.log(finalResult);
      this.pedidoServiceSubscription = this.pedidosService.abastecerPedido(finalResult).subscribe(
        response => {
          console.log(response);
          // this.clienteCombo();
          //this.form_abastecer.reset();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.form_abastecer.markAllAsTouched();
    }
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form_abastecer.valid) {
      const value = this.form_abastecer.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_abastecer.markAllAsTouched();
    }
  }


  closepopup() {
    this.ref.close('Closed using function');
  }

}
