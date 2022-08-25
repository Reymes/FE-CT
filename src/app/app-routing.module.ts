import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationComponent } from './annotation/annotation.component';


const routes: Routes = [
  { path: '', redirectTo: 'annotation/1', pathMatch: 'full' },
  { path: 'annotation/:id', component: AnnotationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
