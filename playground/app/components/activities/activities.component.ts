import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FsActivitiesComponent } from '@firestitch/activity';

import { Activity } from 'src/app/interfaces/activity';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesComponent {

  @ViewChild(FsActivitiesComponent)
  public activities: FsActivitiesComponent;

  public actions: {
    label: string;
    click: (activity: Activity) => void;
    show: (activity: Activity) => boolean;
  }[] = [];

  constructor() {
    this.actions = [
      {
        label: 'Edit',
        click: (activity) => {
          activity.concreteActivityObject = {
            ...activity.concreteActivityObject,
            name: 'Edited',
          };

          this.activities
            .updateActivity(activity, (a) => a.id === activity.id);
        },
        show: (activity) => (activity.activityType.type === 'crmLeadStatus'),
      },
    ];
  }

  public showDeleteAction: (activity: Activity) => boolean = () => true;
}
