
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'fs-activity-object-type',
  templateUrl: './activity-object-type.component.html',
  styleUrls: ['./activity-object-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule
],
})
export class FsActivityObjectTypeComponent {

  @Input() public color;
  @Input() public icon;
  
}
