import { UsuarioIntarface } from './../modelo/UsuarioIntarface';
import { Usuario } from './../modelo/Usuario';
import { Component, OnInit } from '@angular/core';
import { ServiceApiService } from 'src/app/service-api.service';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit{


  usuarioModel: Usuario = new Usuario();
  vetorUsuraios: Usuario[] = [];
  btnCadastro: boolean = true;

  constructor(private service: ServiceApiService){

  }
  ngOnInit(): void {
    this.setarUsuarioSelecionarNaTabela()
  }


  setarUsuarioSelecionarNaTabela(): void{
    this.service.usuarioSelecionadoSubject.asObservable().subscribe((usuarioSelecionado: Usuario | null) => {
      if (usuarioSelecionado) {
        this.usuarioModel = usuarioSelecionado;
        this.btnCadastro = false;
      }
    })
  }

  cancelarSelecao():void{
    this.usuarioModel = new Usuario();
    this.btnCadastro = true;
  }

  cadastrarUsuarioSimples(): void{
    this.service.cadastrar2(this.usuarioModel).subscribe();
  }
  cadastrarUsuario(): void{
    this.service.cadastrar2(this.usuarioModel).subscribe((user: Usuario) => {

    //      this.vetorUsuraios.push(user);
          this.usuarioModel = new Usuario();
          this.btnCadastro = true;
         // alert("Salvei o "+user.nome)
        });

  }

  editar(): void{
    this.service.editar(this.usuarioModel).subscribe(user => {

          this.vetorUsuraios.push(user);
          this.usuarioModel = new Usuario();
          this.btnCadastro = true;
         // alert("Salvei o "+user.nome)
        });

  }

  editarRecuperandoCliente(): void{
    this.service.editar(this.usuarioModel).subscribe( UserRetorno => {
        alert(UserRetorno.nome);
        //Obter posicao do cliente no vetor
        let posicao = this.vetorUsuraios.findIndex(obj => {
          return obj.id == UserRetorno.id;
        })

        //Altera os dados do cliente no vetor
        this.vetorUsuraios[posicao] = UserRetorno;
        //Limpar usuário no cadastro
        this.usuarioModel = new Usuario();
        //Visibilidade dos botões
        this.btnCadastro = true;

    })


  }

}
