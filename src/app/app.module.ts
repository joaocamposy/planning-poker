import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { PagesModule } from './pages/pages.module';
import { ButtonModule } from './atoms/button/button.module';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { IconModule } from './atoms/icon/icon.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    PagesModule,
    ButtonModule,
    IconModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AppService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
