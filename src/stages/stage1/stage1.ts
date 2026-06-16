import type { StageContext, StageModule } from '../../app/contracts';
import { GAME_EVENTS } from '../../shared/events';
import { el } from '../../shared/dom';
import { renderDogSprite } from './sprites/dog';
import { renderCatSprite } from './sprites/cat';

type FoodId = 'bone' | 'chicken';
type PlateId = 'dog' | 'cat';
type FoodLocation = 'tray' | PlateId;

type Stage1State = {
  selected: FoodId | null;
  foodLocation: Record<FoodId, FoodLocation>;
  sourcePlate: Record<FoodId, PlateId | null>;
  reaction: Record<PlateId, 'idle' | 'confused' | 'happy'>;
  completed: boolean;
};

const CORRECT: Record<FoodId, PlateId> = { bone: 'dog', chicken: 'cat' };
const FOOD_LABEL: Record<FoodId, string> = { bone: 'croqueta-hueso', chicken: 'pata de pollo' };

export function createStage1(): StageModule {
  let ctx: StageContext | null = null;
  let container: HTMLElement | null = null;
  let state: Stage1State = createInitialState();

  function mount(nextCtx: StageContext) {
    ctx = nextCtx;
    state = createInitialState();
    container = buildDOM();
    container.addEventListener('click', handleClick);
    ctx.root.append(container);
    renderState();
  }

  function unmount() {
    container?.removeEventListener('click', handleClick);
    container?.remove();
    container = null;
    ctx = null;
  }

  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const foodButton = target.closest<HTMLElement>('[data-food]');
    const plateButton = target.closest<HTMLElement>('[data-plate]');

    if (foodButton) {
      const foodId = foodButton.dataset.food as FoodId;
      const location = state.foodLocation[foodId];

      if (state.selected && location !== 'tray') {
        placeSelectedFood(location as PlateId);
      } else {
        selectFood(foodId);
      }
      return;
    }

    if (plateButton) {
      if (state.selected) {
        placeSelectedFood(plateButton.dataset.plate as PlateId);
      } else {
        const plate = plateButton.dataset.plate as PlateId;
        const foodOnPlate = getFoodOnPlate(plate);
        if (foodOnPlate) selectFood(foodOnPlate);
      }
    }
  }

  function selectFood(food: FoodId) {
    if (state.completed) return;
    state.selected = food;
    renderState();
  }

  function placeSelectedFood(plate: PlateId) {
    if (state.completed) return;

    const selected = state.selected;
    if (!selected) return;

    const occupyingFood = getFoodOnPlate(plate, selected);

    state.foodLocation[selected] = plate;
    state.sourcePlate[selected] = null;

    if (occupyingFood) {
      state.sourcePlate[occupyingFood] = plate;
      state.foodLocation[occupyingFood] = 'tray';
      state.selected = occupyingFood;
    } else {
      state.selected = null;
    }

    syncAnimalReactionsWithPlates();

    const bothCorrect = state.foodLocation.bone === 'dog' && state.foodLocation.chicken === 'cat';
    if (bothCorrect) {
      state.completed = true;
      window.setTimeout(() => ctx?.emit(GAME_EVENTS.STAGE1_COMPLETE), 900);
      console.info('[Stage1] complete');
    }

    renderState();
  }

  function getFoodOnPlate(plate: PlateId, exceptFood?: FoodId): FoodId | null {
    return (Object.keys(state.foodLocation) as FoodId[]).find(
      food => food !== exceptFood && state.foodLocation[food] === plate
    ) ?? null;
  }

  function syncAnimalReactionsWithPlates() {
    for (const plate of ['dog', 'cat'] as PlateId[]) {
      const food = getFoodOnPlate(plate);
      if (!food) {
        state.reaction[plate] = 'idle';
      } else if (CORRECT[food] === plate) {
        state.reaction[plate] = 'happy';
      } else {
        state.reaction[plate] = 'confused';
      }
    }
  }

  function buildDOM() {
    const stage = el('section', {
      className: 'stage stage-1 pixel-art',
      attrs: { 'aria-label': 'Stage 1: Despertá a Cucker' }
    });

    stage.innerHTML = `
      <div class="s1-sky" aria-hidden="true"></div>
      <div class="s1-architecture" aria-hidden="true">
        <div class="s1-arch"></div>
        <div class="s1-rail"></div>
      </div>
      <div class="s1-grass" aria-hidden="true"></div>
      <div class="s1-scene" data-stage1-scene>
        <div class="s1-animal s1-dog" data-animal="dog" aria-label="Cucker dormido">${renderDogSprite('sleep')}</div>
        <div class="s1-animal s1-cat" data-animal="cat" aria-label="Gato relajado">${renderCatSprite('relax')}</div>
        <button class="s1-plate s1-plate-dog" data-plate="dog" type="button" aria-label="Plato del perro"><span class="s1-plate-mark s1-paw-mark" aria-hidden="true"></span></button>
        <button class="s1-plate s1-plate-cat" data-plate="cat" type="button" aria-label="Plato del gato"><span class="s1-plate-mark s1-fish-mark" aria-hidden="true"></span></button>
        <div class="s1-food-tray" aria-hidden="true"></div>
        <button class="s1-food s1-food-bone" data-food="bone" type="button" aria-label="Croqueta con forma de hueso"></button>
        <button class="s1-food s1-food-chicken" data-food="chicken" type="button" aria-label="Pata de pollo"></button>
      </div>
      <p class="s1-hint">Elegí una comida y después su plato.</p>
    `;
    return stage;
  }

  function renderState() {
    if (!container) return;
    container.dataset.selected = state.selected ?? '';
    container.dataset.dogReaction = state.reaction.dog;
    container.dataset.catReaction = state.reaction.cat;
    container.dataset.completed = String(state.completed);

    for (const food of Object.keys(state.foodLocation) as FoodId[]) {
      const node = container.querySelector<HTMLElement>(`[data-food="${food}"]`);
      if (!node) continue;
      const isSelected = state.selected === food;
      const actualLocation = state.foodLocation[food];
      const visualLocation = isSelected && actualLocation === 'tray' && state.sourcePlate[food]
        ? state.sourcePlate[food]!
        : actualLocation;
      node.classList.toggle('is-selected', isSelected);
      node.dataset.location = visualLocation;
      node.setAttribute('aria-pressed', String(isSelected));
      node.setAttribute('aria-label', `${FOOD_LABEL[food]} ${isSelected ? 'seleccionada' : ''}`.trim());
    }

    const dog = container.querySelector<HTMLElement>('[data-animal="dog"]');
    if (dog) dog.innerHTML = renderDogSprite(state.reaction.dog === 'happy' ? 'happy' : state.reaction.dog === 'confused' ? 'confused' : 'sleep');

    const cat = container.querySelector<HTMLElement>('[data-animal="cat"]');
    if (cat) cat.innerHTML = renderCatSprite(state.reaction.cat === 'happy' ? 'happy' : state.reaction.cat === 'confused' ? 'confused' : 'relax');
  }

  return { id: 'stage1', mount, unmount };
}

function createInitialState(): Stage1State {
  return {
    selected: null,
    foodLocation: { bone: 'tray', chicken: 'tray' },
    sourcePlate: { bone: null, chicken: null },
    reaction: { dog: 'idle', cat: 'idle' },
    completed: false
  };
}
