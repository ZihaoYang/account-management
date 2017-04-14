import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MitCitySelectComponent} from "./mit-city-select.component";
import {MitCitySelectPipe} from "./mit-city-select.pipe";

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    MitCitySelectComponent,
    MitCitySelectPipe
  ],
  exports: [MitCitySelectComponent]
})
export class MitCitySelectModule {
}
