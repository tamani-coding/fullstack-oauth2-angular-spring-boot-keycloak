import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideOAuthClient, AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { APP_INITIALIZER } from '@angular/core';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/my-test-realm',
  tokenEndpoint: 'http://localhost:8180/realms/my-test-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'my-webapp-client',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    }
  ],
});
