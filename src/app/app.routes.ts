import { Routes } from '@angular/router';
import { CosmeticsComponent } from '../components/cosmetics/cosmetics.component';
import { ItemShopComponent } from '../components/item-shop/item-shop.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/cosmetics/latest',
        pathMatch: 'full'
    },
    {
        path: 'cosmetics',
        children: [
            {
                path: 'all',
                component: CosmeticsComponent
            },
            {
                path: 'latest',
                component: CosmeticsComponent
            }
        ]
    },    
    {
        path: 'shop',
        component: ItemShopComponent
    },
    //prevents invalid URLs
    { path: '**', redirectTo: 'cosmetics/latest', pathMatch: 'full' },
];
