import { Routes } from '@angular/router';
import { CosmeticsComponent } from '../components/cosmetics/cosmetics.component';
import { ItemShopComponent } from '../components/item-shop/item-shop.component';
import { CosmeticDetailComponent } from '../components/cosmetic-detail/cosmetic-detail.component';

const title = " - Fortnite API Front";

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
                title: 'All cosmetics' + title,
                component: CosmeticsComponent
            },
            {
                path: 'latest',
                title: 'Latest cosmetics' + title,
                component: CosmeticsComponent
            },
            {
                path: 'search',
                title: 'Cosmetic search results' + title,
                component: CosmeticsComponent
            },
            {
                path: ':id',
                component: CosmeticDetailComponent
            }
        ]
    },    
    {
        path: 'shop',
        title: 'Item shop' + title,
        component: ItemShopComponent
    },
    //prevents invalid URLs
    { path: '**', redirectTo: 'cosmetics/latest', pathMatch: 'full' },
];
