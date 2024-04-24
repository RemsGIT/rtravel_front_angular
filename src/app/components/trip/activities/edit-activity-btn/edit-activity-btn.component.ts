import {Component, Input, input, output} from '@angular/core';
import {Activity} from "../../../../../models/trip.model";
import {SidebarModule} from "primeng/sidebar";
import {FormActivityComponent} from "../../../forms/form-activity/form-activity.component";

@Component({
  selector: 'app-edit-activity-btn',
  standalone: true,
  imports: [
    SidebarModule,
    FormActivityComponent
  ],
  templateUrl: './edit-activity-btn.component.html',
})
export class EditActivityBtnComponent {

  sidebarVisible =  input.required<boolean>()
  activityToEdit = input.required<Activity>()

  onChangeVisible = output<boolean>()

  onVisibilityChange($event: boolean) {
    this.onChangeVisible.emit($event)
  }

  handleSubmitSuccess() {
    this.onChangeVisible.emit(false)
  }
}
