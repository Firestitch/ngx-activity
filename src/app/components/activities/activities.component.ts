import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FsApi } from '@firestitch/api';
import { FsBadgeModule } from '@firestitch/badge';
import { FsDateModule } from '@firestitch/date';
import { FilterConfig } from '@firestitch/filter';
import { FsMenuModule } from '@firestitch/menu';
import { FsPrompt } from '@firestitch/prompt';

import { of } from 'rxjs';
import { catchError, skip, switchMap } from 'rxjs/operators';

import { FsActivityPreviewDirective } from '../../directives';
import { ActivityAction } from '../../enums';
import { Activity, ActivityConfig } from '../../interfaces';
import { ActivityMenuComponent } from '../activity-menu';
import { FsActivityObjectTypeComponent } from '../activity-object-type';


@Component({
  selector: 'fs-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,

    FsMenuModule,
    FsBadgeModule,
    FsDateModule,

    FsActivityObjectTypeComponent,
    ActivityMenuComponent,
  ],
})
export class FsActivitiesComponent implements OnInit {

  @Input() public config: ActivityConfig;

  @ContentChildren(FsActivityPreviewDirective)
  public set setActivityObjects(templates: QueryList<FsActivityPreviewDirective>) {
    this.activityPreviews = templates.toArray()
      .reduce((acc, template) => {
        acc[template.activityType] = template;

        return acc;
      }, {});
  }

  public filterConfig: FilterConfig;
  public activities: Activity[] = [];
  public maxActivityId = null;
  public ActivityAction = ActivityAction;
  public activityPreviews: { [key: string]: FsActivityPreviewDirective } = {};

  private _api = inject(FsApi);
  private _prompt = inject(FsPrompt);
  private _cdRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.load();
  }

  public loadNew(): void {
    this._load();
  }

  public load() {
    this.maxActivityId = null;
    this._load();
  }

  public updateActivity(activity: Activity, track: (activity: Activity) => boolean): void {
    const index = this.activities.findIndex((a) => track(a));
    
    if(index !== -1) {
      this.activities[index] = activity;
      this._cdRef.markForCheck();
    }
  }

  public activityDelete(activity): void {
    this._prompt.confirm({
      title: 'Delete',
      template: 'Are you sure that you want to delete the record?',
    })
      .pipe(
        catchError(() => 
          of(false)
            .pipe(skip(1)),
        ),
        switchMap(() => this._api
          .delete(
            [
              ...this.config.apiPath,
              activity.id,
            ]
              .join('/'),
          )),
      )
      .subscribe(() => {
        this.activities = this.activities
          .filter((a) => a.id !== activity.id);
          
        this._cdRef.markForCheck();
      });
  }

  public activityClick(activity: Activity, event: MouseEvent): void {
    if(this.config.activityClick) {
      this.config.activityClick(activity, event);
    }
  }

  private _load(): void {
    this._api
      .get(this.config.apiPath.join('/'), {
        maxActivityId: this.maxActivityId || undefined,
        activityTypes: true,
        creatorObjects: true,
        concreteObjects: true,
        objectTypes: true,
        ...this.config.activitiesQuery,
      })
      .subscribe(({ activities }) => {
        this.maxActivityId = (
          activities?.length ? activities : this.activities
        ).reduce((max, activity) => {
          return activity.id > max ? activity.id : max;
        }, 0);

        this.activities = [
          ...activities,
          ...this.activities || [],
        ];

        this._cdRef.markForCheck();
      });
  }
}
