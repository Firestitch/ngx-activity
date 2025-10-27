import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FsActivitiesComponent } from '@firestitch/activity';

import { Activity } from 'src/app/interfaces/activity';

import { ActivityConfig } from '../../../../src/app/interfaces/activity-config';
import { FsActivitiesComponent as FsActivitiesComponent_1 } from '../../../../src/app/components/activities/activities.component';
import { FsActivityPreviewDirective } from '../../../../src/app/directives/activity-preview.directive';
import { FsLabelModule } from '@firestitch/label';
import { FsHtmlRendererModule } from '@firestitch/html-editor';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsActivitiesComponent_1,
        FsActivityPreviewDirective,
        FsLabelModule,
        FsHtmlRendererModule,
        JsonPipe,
    ],
})
export class ActivitiesComponent {

  @ViewChild(FsActivitiesComponent)
  public activities: FsActivitiesComponent;

  public config: ActivityConfig;

  constructor() {
    this.config = {
      apiPath: ['activities'],
      showDeleteAction: () => true,
      activityClick: (activity, event) => {
        console.log(activity, event);
      },
      actions: [
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
      ],
    };
  }

  public showDeleteAction: (activity: Activity) => boolean = () => true;
}
