import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AplicarEstrategiaInterceptor } from './../core/interceptor/aplicar-estrategia.interceptor';
import { IndexModule } from './index/index.module';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { AdicionarOuAtualizarTokenInterceptor } from 'src/core/interceptor/adicionar-ou-atualizar-token.interceptor';
import { PrograssoInterceptor } from 'src/core/interceptor/progresso-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';

registerLocaleData(ptBr);
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
		HttpClientModule,
		BrowserAnimationsModule
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: PrograssoInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AdicionarOuAtualizarTokenInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AplicarEstrategiaInterceptor, multi: true },
	{ provide: LOCALE_ID, useValue: 'pt', },
	{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL', },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
