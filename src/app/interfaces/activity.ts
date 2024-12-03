export interface Activity {
  id?: number;
  activityType?: {
    id?: number;
    name?: string;
    type?: string;
  };
  previousActivityData?: any;
  activityData?: any;
  concreteActivityObject?: any;
  concretePreviousActivityObject?: any;
  creatorObject?: any;
  createDate?: Date;
  action?: string;
  objectType?: {
    id?: number;
    name?: string;
    color?: string;
    icon?: string;
  };
}
