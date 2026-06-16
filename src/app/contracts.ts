export type StageId = 'cover' | 'stage1' | 'stage2' | 'stage3' | 'final';

export type StageContext = {
  root: HTMLElement;
  goTo: (stageId: StageId) => void;
  emit: (eventName: string, detail?: unknown) => void;
};

export type StageModule = {
  id: StageId;
  mount: (ctx: StageContext) => void;
  unmount: () => void;
};
