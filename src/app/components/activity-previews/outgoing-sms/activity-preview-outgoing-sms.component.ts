import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsLabelModule } from '@firestitch/label';


@Component({
  selector: 'fs-activity-preview-outgoing-sms',
  templateUrl: './activity-preview-outgoing-sms.component.html',
  styleUrls: ['./activity-preview-outgoing-sms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsLabelModule,
  ],
})
export class FsActivityPreviewOutgoingSmsComponent {

  @Input() public data;
  @Input() public activity;
  
}
