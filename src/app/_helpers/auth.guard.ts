import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // verifique se a rota é restrita por função
            if (route.data.roles && !route.data.roles.includes(account.role)) {
                // função não autorizada, então redirecionar para a página inicial
                this.router.navigate(['/']);
                return false;
            }

            // autorizado então retorna verdadeiro
            return true;
        }

        // não está logado, então redirecione para a página de login com o url de retorno
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
