import { Routes } from '@angular/router';
import { Route } from '@angular/router';
//export const routes: Routes = [];
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { GraphAnalyzerComponent } from './graph-analyzer/graph-analyzer.component';


export const routes: Route[] = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'posts', component: AllPostComponent, canActivate: [AuthGuard] },
    { path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'subscribers', component: SubscribersComponent, canActivate: [AuthGuard] },
    { path: 'analyzer', component: GraphAnalyzerComponent, canActivate: [AuthGuard] }
];
