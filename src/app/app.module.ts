import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
    MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule, MatTableModule, MatTabsModule,
    MatToolbarModule, MatInputModule, MatChip, MatChipsModule, MatDividerModule
} from '@angular/material';
import {TopbarComponent} from './topbar/topbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MainComponent} from './main/main.component';
import {YoutubePlayerModule} from 'ng2-youtube-player';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HakuPipe} from './haku/haku.pipe';
import {VideosService} from './services/videos.service';
import {AngularResizedEventModule} from 'angular-resize-event';
import {NumbersPipe} from './pipes/numbers.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './list/list.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import { DialogComponent } from './dialog/dialog.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'topbar',
        component: TopbarComponent,
        pathMatch: 'full'
    },
];

@NgModule({
    declarations: [
        AppComponent,
        TopbarComponent,
        MainComponent,
        HakuPipe,
        NumbersPipe,
        FilterPipe,
        LoginComponent,
        ListComponent,
        PlaylistsComponent,
        DialogComponent,
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
        ),
        BrowserModule,
        NgxSmartModalModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatToolbarModule,
        MatTabsModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatDialogModule,
        MatTableModule,
        MatExpansionModule,
        MatCardModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        ScrollDispatchModule,
        FlexLayoutModule,
        YoutubePlayerModule,
        HttpClientModule,
        MatChipsModule,
        AngularResizedEventModule,
        MatDividerModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ],
    providers: [VideosService],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogComponent
    ]
})
export class AppModule {
}
