import { AccountService } from '../_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // tentativa de atualizar o token na inicialização do aplicativo para autenticação automática
        accountService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}
