import './styles/global.css';
import { createStageManager } from './app/stage-manager';
import { createStage1 } from './stages/stage1/stage1';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('No existe #app');

const manager = createStageManager(root);
manager.register('stage1', createStage1());
// Stages futuros:
// manager.register('stage2', createStage2());
// manager.register('stage3', createStage3());
// manager.register('final', createFinalStage());
manager.start('stage1');
