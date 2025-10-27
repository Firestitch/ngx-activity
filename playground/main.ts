import { enableProdMode, Injector, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { FS_API_REQUEST_INTERCEPTOR } from '@firestitch/api';
import { ApiInterceptorFactory } from './app/interceptors';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsHtmlRendererModule, FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsExampleModule } from '@firestitch/example';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsHtmlRendererModule, FsLabelModule, FsMessageModule.forRoot(), FsExampleModule.forRoot(), FsHtmlEditorModule.forRoot({
            activationKey: '2J1B10dD7F6F5A3F3I3cWHNGGDTCWHId1Eb1Oc1Yh1b2Ld1POkE3D3F3C9A4E5A3G3B2G2==',
        })),
        {
            provide: FS_API_REQUEST_INTERCEPTOR,
            useFactory: ApiInterceptorFactory,
            deps: [Injector],
        },
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch((err) => console.error(err));

