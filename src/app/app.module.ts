import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

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
      developmentMode: isDevMode(), // Dev Features wie Object.freeze. Wird nur bei der entwicklung benötigt.
      selectorOptions: {
        injectContainerState: false, // Jeder Selector checkt den State Container bei jeder Änderung. Nicht gut! Daher abgeschaltet. ab V4 Standardwert=false
        suppressErrors: false, // Fehler verschlucken?  ab V4 standardwert=false
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
