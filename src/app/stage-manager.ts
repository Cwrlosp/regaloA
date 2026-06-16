import type { StageContext, StageId, StageModule } from './contracts';

export function createStageManager(root: HTMLElement) {
  const stages = new Map<StageId, StageModule>();
  let current: StageModule | null = null;

  const ctx: StageContext = {
    root,
    goTo(stageId) {
      start(stageId);
    },
    emit(eventName, detail) {
      root.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  };

  function register(id: StageId, stage: StageModule) {
    stages.set(id, stage);
  }

  function start(id: StageId) {
    current?.unmount();
    root.replaceChildren();
    const stage = stages.get(id);
    if (!stage) throw new Error(`Stage no registrado: ${id}`);
    current = stage;
    stage.mount(ctx);
  }

  return { register, start };
}
