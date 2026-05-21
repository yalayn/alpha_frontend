---
name: frontend-feature-generator
description: >
  Instrucciones de generación para FEATURES en Project Alpha Frontend.
  Activar cuando se solicite crear o modificar cualquier carpeta dentro de
  src/features/: componentes de feature, hooks de composición, utils, tipos
  locales, o barrel exports. También activar cuando un nuevo operationId aparezca
  en docs/openapi.yaml y deba conectarse a una feature existente o nueva.
  Este skill no redefine las reglas de arquitectura — esas viven en
  FRONTEND_ARCHITECTURE.md. Solo agrega las instrucciones operativas de
  generación que el modelo necesita para ejecutarlas correctamente.
---

# Skill: Generación de Features — Project Alpha Frontend

## Fuente de Verdad

Las reglas que gobiernan esta capa están en `FRONTEND_ARCHITECTURE.md`.
Antes de generar cualquier código, internaliza:

- **Sección 2** — Principios fundamentales (Feature-First, OpenAPI como fuente de tipos)
- **Sección 5** — Anatomía de una feature (componentes, hooks, utils, types, index)
- **Sección 8** — Árbol de decisión de estado
- **Sección 9** — Convenciones de naming
- **Sección 12** — Checklist de PR

Este skill no repite esas reglas. Las asume conocidas y agrega solo las
instrucciones de generación que el documento de arquitectura no puede expresar.

---

## Instrucciones de Generación

### Antes de escribir cualquier archivo

Responde internamente estas preguntas. Si alguna es **sí**, detente y rediseña:

1. ¿Este componente importa algo de otra `feature/`?
2. ¿Este hook llama a `fetch` o `axios` directamente en lugar de usar un hook generado?
3. ¿Este archivo de `utils/` importa React o algún hook?
4. ¿Estoy escribiendo a mano un tipo que debería venir del OpenAPI?
5. ¿Estoy importando tipos de `generated/` por ruta interna en lugar de `@/api/model`?

### Al generar una feature completa

**Paso 0 — Modelado desde OpenAPI (obligatorio antes de escribir código):**
Antes de crear cualquier archivo, identifica en el OpenAPI del backend (`https://raw.githubusercontent.com/yalayn/alpha_ia/main/docs/openapi.yaml`):
- ¿Qué `operationId` consume esta feature? (determina qué hooks generados usará)
- ¿Qué schemas de `components/schemas` usa? (determina los tipos a importar desde `@/api/model`)
- ¿Hay operaciones GET y mutaciones (POST/PUT/DELETE)? (determina la estructura del hook de feature)

Solo después de tener ese mapa claro, genera los archivos en este orden:

1. `types/{feature}.types.ts` — tipos locales de UI que no vienen del OpenAPI
2. `utils/{feature}.utils.ts` — funciones puras de transformación y formateo
3. `hooks/use-{feature}.ts` — composición de hooks generados + lógica de UI
4. `components/{Feature}{Role}.tsx` — uno por cada rol necesario (Page, List, Card, Form...)
5. `index.ts` — barrel export con solo lo que debe ser público
6. `store/{feature}.store.ts` — **solo si** el árbol de decisión de la sección 8 del FRONTEND_ARCHITECTURE.md lo justifica

Nunca entregues solo el componente sin el hook, ni el hook sin el barrel export.
Una feature incompleta es código inválido.

### Al generar componentes de feature

- El componente `{Feature}Page` es el único que orquesta — llama al hook y distribuye datos.
- Los componentes `{Feature}List`, `{Feature}Card`, `{Feature}Form` reciben props tipadas. No llaman hooks de API directamente.
- Siempre incluye los tres estados: loading (`{Feature}Skeleton`), error, y dato cargado.
- El estado de loading usa el componente `{Feature}Skeleton`, no un spinner genérico inline.

```tsx
// Patrón obligatorio en {Feature}Page
export function {Feature}Page() {
  const { {data}, isLoading, error } = use{Feature}();

  if (isLoading) return <{Feature}Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!{data}?.length) return <{Feature}Empty />;

  return <{Feature}List items={{data}} />;
}
```

### Al generar hooks de feature

- El hook recibe parámetros de UI (ids, filtros de usuario), no parámetros de API crudos.
- La invalidación de cache tras mutaciones va en el hook, nunca en el componente.
- Retorna valores ya procesados — el componente no transforma datos.

```typescript
// Patrón de hook con mutación e invalidación
export function use{Feature}() {
  const queryClient = useQueryClient();

  const query = use{GetOperation}();

  const mutation = use{WriteOperation}({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['{entity}'] });
      },
    },
  });

  return {
    {data}: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    {action}: mutation.mutate,
    isPending: mutation.isPending,
  };
}
```

### Al generar utils de feature

- Solo funciones puras: entrada → salida, sin efectos secundarios.
- Verifica que la función sea testeable sin montar ningún componente.
- Si la misma util aparece en dos features distintas, no la dupliques — señala que debe moverse a `shared/utils/`.

### Al generar el barrel export

Exporta solo lo que otras partes de la app necesitan ver. Los detalles internos no se exportan.

```typescript
// index.ts — exporta la página (entry point de routing) y tipos públicos
export { {Feature}Page } from './components/{Feature}Page';
export type { {Feature}PublicType } from './types/{feature}.types';

// NO exportar: hooks internos, utils, componentes hijos que no se usan fuera
```

### Al conectar un nuevo operationId del OpenAPI

Cuando el backend (`alpha_ia`) agrega un nuevo `operationId` a su OpenAPI, el flujo en el frontend es:

1. Ejecutar `npm run generate-api` — el hook aparece en `src/api/generated/`
2. Identificar qué feature lo consume según la tabla de la sección 10 del FRONTEND_ARCHITECTURE.md
3. Agregar el hook al `hooks/use-{feature}.ts` correspondiente
4. Exponer el resultado en el componente `{Feature}Page`

Nunca consumir un hook generado directamente en un componente sin pasar por el hook de feature.

---

## Lo que este skill NO hace

- No redefine la estructura de carpetas de una feature → ver `FRONTEND_ARCHITECTURE.md` sección 5
- No redefine las convenciones de naming → ver `FRONTEND_ARCHITECTURE.md` sección 9
- No define cuándo usar Zustand → ver `FRONTEND_ARCHITECTURE.md` secciones 2.5 y 8.2
- No contiene ejemplos concretos del dominio (Plans, Subscriptions) → esos viven en el código generado
- No define cómo crear componentes de `shared/` → ver `SKILL-ui-component.md`
