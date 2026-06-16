# Arquitectura base del proyecto

Objetivo: proyecto web estático, modular, deployable en Vercel, fácil de editar por microtareas sin que el copiloto rompa otras partes.

## Stack recomendado
- Vite + TypeScript + CSS vanilla.
- Sin React al inicio: menos boilerplate, menos puntos de ruptura, mejor para SVG/CSS/DOM directo.
- Sin Python: esto es una experiencia visual web; Python solo serviría para scripts auxiliares de assets, no para el producto final.

## Reglas de oro para trabajar con IA copiloto
1. Un prompt = una microtarea = máximo 1-3 archivos permitidos.
2. Antes de modificar, pedirle que lea solo el contrato del stage y los archivos tocados.
3. Prohibir cambios globales salvo que la tarea lo diga.
4. Si una tarea es visual, pedir captura/criterios de aceptación, no “mejoralo”.
5. Hacer commit o backup después de cada microtarea aprobada.

## Estructura
```txt
src/
  app/
    contracts.ts          # Contrato StageModule/StageContext
    stage-manager.ts      # Monta/desmonta stages
  shared/
    dom.ts                # Helpers DOM pequeños
    events.ts             # Nombres de eventos
  styles/
    tokens.css            # Paleta, easing, tamaños globales
    global.css            # Reset + shell + imports
  stages/
    stage1/
      stage1.ts           # Lógica/DOM stage 1
      sprites/            # SVG pixel art del perro/gato
      styles/stage1.css   # Solo CSS stage 1
    stage2/
    stage3/
    final/
```

## Límite de edición por IA
- Stage 1 solo puede tocar `src/stages/stage1/**` y, si se aprueba, `src/styles/tokens.css`.
- Stage 2 solo `src/stages/stage2/**`.
- Transiciones en una carpeta futura `src/transitions/**`.
- Nada de mezclar estilos stage 1 en global.
