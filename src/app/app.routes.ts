import { Routes } from '@angular/router';
import { CosmeticsComponent } from '../components/cosmetics/cosmetics.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/cosmetics/latest',
        pathMatch: 'full'
    },
    {
        path: 'cosmetics/latest',
        component: CosmeticsComponent
    },
    //prevents invalid URLs
    { path: '**', redirectTo: 'cosmetics/latest', pathMatch: 'full' },
];
