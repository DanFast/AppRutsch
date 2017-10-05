import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportOnePage } from './report-one';

@NgModule({
  declarations: [
    ReportOnePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportOnePage),
  ],
})
export class ReportOnePageModule {}
