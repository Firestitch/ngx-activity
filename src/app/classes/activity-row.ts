import { Activity } from '../interfaces/activity';

export class ActivityRow {
  public activity: Activity;
  public actions: {
    label: string;
    click: (activity: Activity) => void;
    show: (activity: Activity) => boolean;
  }[];
}
