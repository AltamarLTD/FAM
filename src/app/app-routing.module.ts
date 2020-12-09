import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './shared/helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule), canActivate: [AuthGuard] },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule), canActivate: [AuthGuard] },
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: '**', redirectTo: 'product-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
