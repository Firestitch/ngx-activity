import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsHtmlRendererModule } from '@firestitch/html-editor';
import { FsLabelModule } from '@firestitch/label';


@Component({
  selector: 'fs-activity-preview-outgoing-email',
  templateUrl: './activity-preview-outgoing-email.component.html',
  styleUrls: ['./activity-preview-outgoing-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsLabelModule,
    FsHtmlRendererModule,
  ],
})
export class FsActivityPreviewOutgoingEmailComponent {

  @Input() public data;
  @Input() public activity;
  
}
