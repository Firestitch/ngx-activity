import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FsMenuModule } from '@firestitch/menu';


import { Activity } from '../../interfaces';


@Component({
  selector: 'app-activity-menu',
  templateUrl: './activity-menu.component.html',
  styleUrls: ['./activity-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,

    FsMenuModule,
  ],
})
export class ActivityMenuComponent implements OnInit {

  @Input() public activity: Activity;

  @Output() public activityDelete = new EventEmitter<Activity>();

  @Input() public actions: {
    label: string;
    click: (activity: Activity) => void;
    show: (activity: Activity) => boolean;
  }[] = [];

  @Input() public showDeleteAction: (activity: Activity) => boolean;

  public showDelete: boolean;
  public menuActions: {
    label: string;
    click: (activity: Activity) => void;
    show: boolean;
  }[] = [];

  public ngOnInit(): void {
    this.showDelete = (this.showDeleteAction || (() => false))(this.activity);
    this.menuActions = this.actions
      .filter((action) => action.show(this.activity))
      .map((action) => ({
        ...action,
        show: true,
      }));
  }
}
