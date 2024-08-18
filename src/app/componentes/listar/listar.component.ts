import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServiceApiService } from 'src/app/service-api.service';
import { Usuario } from '../modelo/Usuario';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  title = 'pessoa-front';

  arrayOfUsers: Usuario[] = [];
  onClick: any;

  //Variável para visibilidade da tabela
  tabela:boolean = true;

  constructor(private service: ServiceApiService ){}

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(): void {
     this.service.getObservableUsers().subscribe(
                  (data: Usuario[]) =>{
                  this.arrayOfUsers = data
                 });
  }

  selecionarUsuario(id: number): void {

    this.service.selecionarUsuarioTabela(id);

  }



}

