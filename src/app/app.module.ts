import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    NgxsModule.forRoot([], {
      developmentMode: isDevMode(),
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsWebsocketPluginModule.forRoot({
      url: 'ws://localhost:4000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
