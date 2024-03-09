import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-popup-verdetalles',
  templateUrl: './popup-verdetalles.component.html',
  styleUrls: ['./popup-verdetalles.component.scss']
})
export class PopupVerdetallesComponent {
  inputdata: any;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id_lote', 'nombre', 'cantidadPaquetesDisponibles'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDetalles: any,
    private ref: MatDialogRef<PopupVerdetallesComponent>
  ){}
  ngOnInit(): void {
    this.inputdata = this.dataDetalles;
    this.dataSource = this.inputdata.lista;
    console.log(this.dataSource);
  }

  closepopup() {
    this.ref.close('Closed using function');
  }
}
