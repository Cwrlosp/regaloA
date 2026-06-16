export type CatPose = 'relax' | 'confused' | 'happy';

// Placeholder intencional: reemplazar pixel por pixel cuando se redibuje el sprite definitivo.
export function renderCatSprite(pose: CatPose): string {
  const symbol = pose === 'confused'
    ? '<text x="12" y="4" font-size="4" fill="#FFF5E6">?</text>'
    : pose === 'happy'
      ? '<rect x="3" y="3" width="1" height="1" fill="#FF8A9E"/><rect x="4" y="2" width="1" height="1" fill="#FF8A9E"/><rect x="5" y="3" width="1" height="1" fill="#FF8A9E"/>'
      : '';
  const eyes = pose === 'happy'
    ? '<rect x="6" y="7" width="2" height="1" fill="#2A2A2A"/><rect x="10" y="7" width="2" height="1" fill="#2A2A2A"/>'
    : '<rect x="6" y="7" width="1" height="1" fill="#A3C985"/><rect x="11" y="7" width="1" height="1" fill="#A3C985"/>';
  return `<svg class="s1-sprite s1-cat-sprite" viewBox="0 0 16 16" role="img" aria-label="Gato ${pose}">
    ${symbol}
    <rect x="5" y="5" width="7" height="7" fill="#B8B4A9"/>
    <rect x="4" y="6" width="2" height="6" fill="#6D6A65"/>
    <rect x="6" y="4" width="2" height="2" fill="#6D6A65"/>
    <rect x="10" y="4" width="2" height="2" fill="#6D6A65"/>
    <rect x="7" y="9" width="3" height="3" fill="#EAE6DC"/>
    <rect x="5" y="6" width="1" height="1" fill="#2A2A2A"/><rect x="8" y="5" width="1" height="1" fill="#2A2A2A"/><rect x="11" y="6" width="1" height="1" fill="#2A2A2A"/>
    ${eyes}
    <rect x="9" y="8" width="1" height="1" fill="#C87A6B"/>
    <rect x="12" y="10" width="2" height="1" fill="#6D6A65"/><rect x="13" y="9" width="1" height="1" fill="#6D6A65"/>
  </svg>`;
}
