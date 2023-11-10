type ScheduledHook = {
  callback: (() => void),
  synchronous: boolean
};

export default ScheduledHook;
export type {
  ScheduledHook
};
