import { AplicarEstrategiaInterceptor } from './../core/interceptor/aplicar-estrategia.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IndexModule } from './index/index.module';

import { AdicionarOuAtualizarTokenInterceptor } from 'src/core/interceptor/adicionar-ou-atualizar-token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrograssoInterceptor } from 'src/core/interceptor/progresso-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: PrograssoInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AdicionarOuAtualizarTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AplicarEstrategiaInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 