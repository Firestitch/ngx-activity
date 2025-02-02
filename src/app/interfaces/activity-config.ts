import { Activity } from './activity';

export interface ActivityConfig {
  apiPath: (string | number)[];
  showDeleteAction: (activity: Activity) => boolean;
  activityClick: (activity: Activity, event: MouseEvent) => void;
  actions: {
    label: string;
    click: (activity: Activity) => void;
    show: (activity: Activity) => boolean;
  }[];
}
