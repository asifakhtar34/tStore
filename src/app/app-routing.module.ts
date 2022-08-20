import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/app/componets/cart/cart.component';
import { ProductListComponent } from 'src/app/componets/product-list/product-list.component';

const routes: Routes = [{path:'', redirectTo: 't-shirt', pathMatch: 'full'},
{path:'t-shirt', component: ProductListComponent},
{path:'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
