export type DogPose = 'sleep' | 'confused' | 'happy';

// Placeholder intencional: reemplazar pixel por pixel cuando se redibuje el sprite definitivo.
export function renderDogSprite(pose: DogPose): string {
  const eyes = pose === 'sleep'
    ? '<rect x="7" y="8" width="1" height="1" fill="#7A3E17"/><rect x="10" y="8" width="1" height="1" fill="#7A3E17"/>'
    : pose === 'happy'
      ? '<rect x="7" y="8" width="2" height="1" fill="#7A3E17"/><rect x="10" y="8" width="2" height="1" fill="#7A3E17"/><rect x="9" y="10" width="1" height="1" fill="#FF8A9E"/>'
      : '<rect x="7" y="8" width="1" height="1" fill="#7A3E17"/><rect x="11" y="7" width="1" height="1" fill="#7A3E17"/>';
  const symbol = pose === 'sleep'
    ? '<text x="2" y="4" font-size="3" fill="#FFF5E6">Z</text>'
    : pose === 'confused'
      ? '<text x="12" y="4" font-size="4" fill="#FFF5E6">?</text>'
      : '<rect x="2" y="3" width="1" height="1" fill="#FF8A9E"/><rect x="3" y="2" width="1" height="1" fill="#FF8A9E"/><rect x="4" y="3" width="1" height="1" fill="#FF8A9E"/>';
  return `<svg class="s1-sprite s1-dog-sprite" viewBox="0 0 16 16" role="img" aria-label="Cucker ${pose}">
    ${symbol}
    <rect x="4" y="8" width="8" height="5" fill="#B3622D"/>
    <rect x="3" y="9" width="2" height="4" fill="#7A3E17"/>
    <rect x="11" y="7" width="3" height="5" fill="#D28546"/>
    <rect x="5" y="7" width="5" height="2" fill="#EAA869"/>
    <rect x="13" y="8" width="1" height="2" fill="#F3C698"/>
    ${eyes}
    <rect x="7" y="12" width="5" height="1" fill="#5D9CEC"/>
  </svg>`;
}
