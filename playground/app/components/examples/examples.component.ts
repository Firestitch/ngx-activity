import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FsExampleModule } from '@firestitch/example';
import { ActivitiesComponent } from '../activities/activities.component';


@Component({
    templateUrl: './examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsExampleModule, ActivitiesComponent],
})
export class ExamplesComponent {
}
  
