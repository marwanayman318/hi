import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';

const routes : Routes = [
  {path: '**', component: ListTodosComponent},
  {path: '', component: ListTodosComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    ListTodosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
