import {Component, input, OnInit} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {LucideAngularModule} from "lucide-angular";
import dayjs from "dayjs";
import {FormActivityComponent} from "../../../forms/form-activity/form-activity.component";

export type ICreateBtnStyle = "solid" | "floating"

@Component({
  selector: 'app-create-activity-btn',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    LucideAngularModule,
    FormActivityComponent,
  ],
  templateUrl: './create-activity-btn.component.html',

})
export class CreateActivityBtnComponent{
  protected sidebarVisible: boolean = false
  protected readonly dayjs = dayjs;

  selectedDate = input.required<Date>();
  style = input<ICreateBtnStyle>("solid")


  onVisibilityChange($event: boolean) {
    this.sidebarVisible = $event
  }

  handleSubmitSuccess() {
    this.sidebarVisible = false
  }
}
