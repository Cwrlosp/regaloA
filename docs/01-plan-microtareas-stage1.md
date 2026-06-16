# Plan de microtareas — Stage 1: “Despertá a Cucker”

Este plan está pensado para trabajar barato y seguro con copiloto. Cada tarea debe terminar con prueba visual en desktop + mobile.

## Definición congelada de Stage 1
- Solo 2 comidas: croqueta-hueso para perro y pata de pollo para gato.
- Solo 2 platos: perro azul con huellas, gato verde salvia con espinas.
- Interacción por click, no drag & drop.
- Error: comida incorrecta queda en plato; se puede reseleccionar; reemplazo automático si se pone otra comida en plato ocupado.
- Perro: sleep → confused → happy.
- Gato: relax → confused → happy.
- Estilo: pixel art/SVG 16x16, atardecer Spanish Revival.

## Fase A — Preparación manual de referencias
A1. Crear carpeta de referencias.
- Guardar en `src/assets/references/stage1/` o `assets/references/stage1/`.
- Subcarpetas: `cocker/`, `cat-tabby/`, `spanish-revival/`, `pixel-art-style/`.

A2. Buscar 6-10 referencias de Cocker Spaniel.
- Priorizar: orejas largas caídas, pelaje jengibre/marrón, proporción cuerpo/cabeza legible.
- No copiar una foto literal; usar como guía de silueta.

A3. Buscar 6-10 referencias de gato tabby sentado/lamiéndose.
- Priorizar: rayas visibles, ojos verdes, postura compacta.

A4. Buscar 6-8 pixel arts que tengan la MISMA resolución/estilo.
- Preferir 16x16 o 32x32, paleta limitada, vista lateral/3-4.
- Evitar mezclar pixel art ultra detallado con minimalista.

A5. Buscar 4-6 referencias de jardín Spanish Revival.
- Arcos, tejas, hierro forjado, jardín/pasto al atardecer.
- No hace falta mansión exacta si eso complica; capturar “arco + baranda + luz cálida”.

A6. Crear un moodboard simple.
- Canva sirve para mirar, pero no como fuente final editable.
- Exportá el moodboard como PNG solo para referencia del copiloto.
- Los sprites finales conviene hacerlos como SVG rects o dibujarlos en editor pixel.

## Fase B — Herramientas recomendadas para sprites
B1. Elegir herramienta principal.
- Opción recomendada: Piskel o Lospec Pixel Editor para dibujar 16x16/32x32.
- Aseprite es mejor si lo tenés, pero no es obligatorio.
- Canva puede servir para moodboard, no para sprites finales consistentes.

B2. Decidir resolución de trabajo.
- Recomendación práctica: dibujar en 16x16 si querés look muy retro/simple; 32x32 si 16x16 se siente ilegible.
- Tu MD dice 16x16. Empezá con 16x16 para comidas/platos y quizá 32x32 para animales si el Cocker no se entiende. Si cambiás a 32x32, hacerlo para perro y gato juntos, no uno sí y otro no.

B3. Exportar sprite como PNG + matriz.
- PNG para ver.
- Matriz de colores o SVG para código.
- Si usás Piskel/Aseprite: podés exportar PNG y luego convertir a SVG rects con script.

B4. Mantener una paleta cerrada.
- Perro: los 5 colores del MD.
- Gato: los 6 colores del MD.
- Comidas y platos: colores del MD.
- No permitir que una IA agregue gradientes a sprites pixel art.

## Fase C — Base técnica aislada
C1. Correr proyecto y verificar que Stage 1 placeholder aparece.
- `npm install`
- `npm run dev`
- Revisar mobile y desktop.

C2. Revisar contrato de estado.
- `selected`, `foodLocation`, `reaction`, `completed`.
- Confirmar que solo existen `bone`, `chicken`, `dog`, `cat`.

C3. Agregar prueba manual de flujo correcto.
- Click bone → dog plate.
- Click chicken → cat plate.
- Debe loguear `[Stage1] complete`.

C4. Agregar prueba manual de flujo incorrecto.
- bone → cat plate: gato confused.
- reseleccionar bone en plato gato → dog plate.
- chicken → dog plate: perro confused.

C5. Agregar prueba manual de reemplazo.
- bone → cat plate.
- chicken → cat plate.
- Resultado esperado: chicken queda en cat, bone vuelve seleccionada/lista para dog.

## Fase D — Composición visual de escena
D1. Ajustar fondo de cielo.
- Gradiente naranja → violeta → azul noche.
- Añadir overlay radial cálido desde izquierda.
- Criterio: no parecer fondo genérico de IA; debe sentirse atardecer suave.

D2. Ajustar pasto pixel art.
- Parte inferior 20-30% según mobile.
- Patrón pixelado/repetido, sombras hacia derecha.

D3. Diseñar arco Spanish Revival.
- Forma simple, fondo, baja opacidad.
- No robar atención a animales y platos.

D4. Diseñar baranda hierro forjado simple.
- Líneas repetidas oscuras, opacidad baja.
- Debe leerse como decoración, no jaula.

D5. Posicionar animales/platos/comidas en desktop.
- Perro izquierda, gato derecha.
- Platos entre animales y comidas.
- Evitar que la comida tape los sprites.

D6. Posicionar en mobile vertical.
- Animales visibles sin scroll.
- Botones/comidas con área táctil suficiente.
- Nada pegado al notch: usar safe-area.

D7. Checklist visual cross-device.
- 390x844, 412x915, 1366x768, 1920x1080.
- Si falla mobile, se prioriza mobile.

## Fase E — Sprites finales
E1. Redibujar croqueta-hueso 16x16.
- Una pieza, forma hueso, color tostado rojizo.
- Debe contrastar con pelaje del perro.

E2. Redibujar pata de pollo 16x16.
- Dorado + huesito claro.
- Mismo tamaño visual que la croqueta.

E3. Redibujar plato perro 16x16/32x32.
- Azul apagado, huellitas blancas.
- Borde bajo, sombra coherente.

E4. Redibujar plato gato 16x16/32x32.
- Verde salvia, espinas blancas.
- Misma base que plato perro.

E5. Diseñar sprite perro sleep.
- Orejas largas + cuerpo acostado.
- Zzz flotantes separados del cuerpo.
- Collar/placa no visible o casi oculto.

E6. Diseñar sprite perro confused.
- Cabeza levantada, oreja inclinada, ojos entreabiertos, `?`.
- Placa YEONTAN visible cuando despierte.

E7. Diseñar sprite perro happy.
- Ojos achinados, lengua afuera, corazones.
- Que siga siendo el mismo perro, no otro sprite.

E8. Diseñar sprite gato relax.
- Sentado o lamiéndose pata.
- Rayas tabby visibles y ojos verdes.

E9. Diseñar sprite gato confused.
- Deja de lamerse, mira al plato, `?`.

E10. Diseñar sprite gato happy.
- Se estira/ronronea, corazones.

E11. Sustituir placeholders por SVG rects limpios.
- Archivos: `sprites/dog.ts`, `sprites/cat.ts`; comidas/platos pueden pasar a sprite separado.
- No tocar lógica de Stage1.

E12. Revisión de consistencia.
- Todos los sprites tienen misma dirección de luz.
- Misma escala de pixel; nada antialias blur.

## Fase F — Animaciones e interacción
F1. Selección de comida.
- Glow + levanta + scale 1.05.
- Cursor/estado claro.

F2. Animación de vuelo al plato.
- Arco breve 450-600ms.
- Implementar primero simple con CSS transform; si se complica, dejar snap + fade como fallback temporal.

F3. Reacción inmediata correcta perro.
- Al colocar bone en dog: estado happy sin delay.
- Corazones brotan 1 vez, no loop infinito.

F4. Reacción inmediata correcta gato.
- Al colocar chicken en cat: happy/purr/corazones.

F5. Reacción error perro.
- Chicken en dog: confused, `?`, placa visible.

F6. Reacción error gato.
- Bone en cat: confused, `?`.

F7. Reemplazo animado.
- Si plato ocupado, la comida reemplazada vuelve a bandeja o queda seleccionada visible.
- No desaparecer objetos.

F8. Animación conjunta final.
- Cuando ambos correctos: perro y gato bounce/pulse breve.
- Emitir `stage1:complete` después, no antes.

## Fase G — Calidad, accesibilidad y hardening
G1. Teclado mínimo.
- Tab a comidas/platos.
- Enter/Espacio funciona por ser button.

G2. ARIA labels actualizados.
- Comida seleccionada se anuncia como seleccionada.
- Platos tienen labels claros.

G3. Reduced motion.
- Con `prefers-reduced-motion: reduce`, sin vuelos largos ni loops.

G4. Protección de estados.
- No permitir clicks después de completed.
- No permitir seleccionar comida inexistente.

G5. No emojis como arte final.
- Emojis solo placeholder. En final deben ser SVG/pixel art.

G6. Performance.
- Animar transform/opacity/filter mínimo.
- Evitar layout thrashing.

G7. Build final.
- `npm run check`
- `npm run build`
- Deploy preview en Vercel.

## Prompts cortos para copiloto

### Prompt base para cualquier microtarea
“Trabajá solo en [archivos]. No modifiques global ni otros stages. Objetivo: [microtarea]. Criterios de aceptación: [lista]. No agregues comidas, platos, animales ni librerías. Conservá la lógica click comida → click plato.”

### Prompt para sprite
“Reemplazá únicamente el SVG placeholder de [perro/gato/comida] en [archivo]. Debe ser pixel art con rects, viewBox [16/32], paleta exacta de tokens.css. No cambies lógica ni CSS salvo clases internas necesarias. Debe conservar los estados [lista].”

### Prompt para CSS visual
“Editá solo `src/stages/stage1/styles/stage1.css`. Ajustá [elemento] para mobile y desktop. No cambies nombres de data attributes ni lógica TS. Criterios: [medidas/viewports].”
