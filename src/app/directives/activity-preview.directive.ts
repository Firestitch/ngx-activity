import { Directive, inject, Input, TemplateRef } from '@angular/core';

import { Activity } from '../interfaces';


@Directive({
  selector: '[fsActivityPreview]',
  standalone: true,
})
export class FsActivityPreviewDirective {

  @Input() public activityType: any;
  @Input() public showPrevious: boolean = false;

  public templateRef = inject(TemplateRef);

  public static ngTemplateContextGuard(
    directive: FsActivityPreviewDirective,
    context: any,
  ): context is {
    data: any,
    activity: Activity
  } {
    return true;
  }

}
