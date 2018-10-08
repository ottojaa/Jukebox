import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
    MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule, MatTableModule, MatTabsModule,
    MatToolbarModule, MatInputModule, MatChip, MatChipsModule
} from '@angular/material';
import { TopbarComponent } from './topbar/topbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MainComponent } from './main/main.component';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HakuPipe } from './haku/haku.pipe';
import {VideosService} from './services/videos.service';
import {AngularResizedEventModule} from 'angular-resize-event';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MainComponent,
    HakuPipe,
  ],
  imports: [
    BrowserModule,
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
      AngularResizedEventModule
  ],
  providers: [VideosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
