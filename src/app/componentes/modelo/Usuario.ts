import { UsuarioIntarface } from "./UsuarioIntarface";

export class Usuario implements UsuarioIntarface{

  id: number;
  nome: string;
  idade: string;


  constructor(id: number = 0, nome: string = '', idade: string = '') {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
  }

}
