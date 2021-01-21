export default interface = {
  name: string | null;
  importance: AndroidImportance;
  // Optional attributes
  bypassDnd?: boolean;
  description?: string | null;
  groupId?: string | null;
  lightColor?: string;
  lockscreenVisibility?: AndroidNotificationVisibility;
  showBadge?: boolean;
  sound?: string | null;
  audioAttributes?: Partial<AudioAttributes>;
  vibrationPattern?: number[] | null;
  enableLights?: boolean;
  enableVibrate?: boolean;
}