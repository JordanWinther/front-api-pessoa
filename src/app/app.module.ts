
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListarComponent } from './componentes/listar/listar.component';
import { ServiceApiService } from './service-api.service';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    CadastrarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ServiceApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
