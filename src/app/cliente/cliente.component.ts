import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ClienteService } from '../services/cliente/cliente.service';
import { PopupRegistroClienteComponent } from './popup-registro-cliente/popup-registro-cliente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  form_Cliente: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cedula_cliente', 'nombres', 'apellidos', 'celular', 'correo', 'direccion', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private clienteServiceSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    private clienteService: ClienteService) {
    this.form_Cliente = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  private buildForm() {
    this.form_Cliente = this.formBuilder.group({
      cedula_cliente: ['', Validators.required],
      nombres: [''],
      apellidos: [''],
      celular: [''],
      correo: [''],
      direccion: ['']
    });
  }

  fetchData() {
    this.clienteService.getAllClientes().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  addCliente() {
    this.openPopup({}, 'Añadir Cliente', PopupRegistroClienteComponent);
  }

 /*
  delete(id: string) { // Change this line
    this.clienteService.deleteCliente(id).subscribe(response => { // And this line
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }*/
  delete(id: string) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe(response => {
          console.log(response);
          this.fetchData();
          Swal.fire({
            title: "Eliminado!",
            text: "Tu dato ha sido eliminado.",
            icon: "success"
          });
        }, (error) => {
          console.error(error);
        });
      }
    });
  }

  edit(dataCliente: any) {
    this.openPopup(dataCliente, 'Editar Cliente', PopupRegistroClienteComponent);
  }

  openPopup(dataCliente: any, title: any, PopupRegistroClienteComponent: any) {
    const dialogRef = this.dialog.open(PopupRegistroClienteComponent, {
      width: '40%',
      data: {
        title: title,
        formData: dataCliente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.fetchData();
    });
  }

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
