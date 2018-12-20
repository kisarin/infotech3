import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpModule} from "@angular/http";
import {HomeComponent} from "../home/home.component";
import {PageNotFoundComponent} from "../not-found.component";
import {A2Edatetimepicker} from "ng2-eonasdan-datetimepicker";



/*export function restangular (RestangularProvider) {
  RestangularProvider.setBaseUrl(environment.restdb.databaseUrl); //('https://todos-876a.restdb.io/rest/');
  RestangularProvider.setDefaultHeaders({'x-apikey': environment.restdb.xApikey});
  //RestangularProvider.setDefaultRequestParams({apikey: environment.restdb.xApikey});
  //RestangularProvider.setRestangularFields({id: "_id"});
}*/

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule, // AuthModule is a sibling and can use this without us exporting it
    FormsModule,
    A2Edatetimepicker
    //RestangularModule.forRoot(restangular)
  ],
  declarations: [
    HomeComponent,
    PageNotFoundComponent
  ],
  exports: [
    FormsModule // Export FormsModule so CommentsModule can use it
    ,
    A2Edatetimepicker

  ],
  providers: []
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}