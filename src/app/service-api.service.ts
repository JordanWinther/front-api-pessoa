
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './componentes/modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  private userResponse$!: Observable<Usuario>;
  private url: string = 'http://localhost:8081/';

  usuario: Usuario = new Usuario();
  usuarioAdd: Usuario = new Usuario();


  private usuariosSubject: BehaviorSubject<Usuario[]> =  new BehaviorSubject<Usuario[]>([]);
  private usuarios$: Observable<Usuario[]> = this.usuariosSubject.asObservable();

  usuarioSelecionadoSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);


  constructor(private http: HttpClient) {
    this.loadInitialData();
   }


  loadInitialData(): void{
     this.http.get<Usuario[]>(this.url).subscribe(data => {
      this.usuariosSubject.next(data);
    });
  }

  getObservableUsers(): Observable<Usuario[]>{
    return this.usuarios$;
  }

  getTypeUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }



  cadastrar(usuario: Usuario): Observable<Usuario> {


   this.userResponse$ = this.http.post<Usuario>(this.url, usuario);


    //Extrai do Observable userResponse, o usuario para variavel usuarioAdd
      this.userResponse$.subscribe(userResponse => this.usuarioAdd = userResponse);

      //Verifica se usuarioAdd existe
      const vetorDeUsuarios = this.usuariosSubject.getValue();
          if(this.usuarioAdd){
            vetorDeUsuarios.push(this.usuarioAdd);

            }else{
              vetorDeUsuarios.push(usuario);

          }


   // this.usuariosSubject.next(vetorDeUsuarios);
    return this.userResponse$;
  }

  cadastrar2(usuario: Usuario): Observable<Usuario> {


    this.http.post<Usuario>(this.url, usuario).subscribe( objRetorno => {
        this.usuarioAdd = objRetorno;
    })


       //Verifica se usuarioAdd existe
       const vetorDeUsuarios = this.usuariosSubject.getValue();
           if(this.usuarioAdd.id === null ){
            alert('Cadastrar2 - adicionado usuário :'+this.usuarioAdd.nome);
             vetorDeUsuarios.push(this.usuarioAdd);

             }else{
               vetorDeUsuarios.push(usuario);

           }


     this.usuariosSubject.next(vetorDeUsuarios);
     return this.userResponse$;
   }
 // cadastrar(usuario: Usuario): Observable<Usuario> {
   // cliente: Usuario = new Usuario();

 //  this.userResponse = this.http.post<Usuario>(this.url, usuario);
  //  = this.userResponse.subscribe(u => u);

  // const usersArray = this.usuariosSubject.getValue();
  //  usersArray.push(usuario);

  //  this.usuariosSubject.next(usersArray);
//    return this.userResponse;
//  }



  editar(usuario: Usuario): Observable<Usuario> {

    this.userResponse$ = this.http.put<Usuario>(this.url, usuario);

   // const usersArray = this.usuariosSubject.getValue();
   //  usersArray.push(usuario);

   //  this.usuariosSubject.next(usersArray);
     return this.userResponse$;
   }
  selecionarUsuarioTabela(posicao:number):void{

      let user = this.usuariosSubject.getValue()[posicao];
      this.usuarioSelecionadoSubject.next(user);

  }

}
