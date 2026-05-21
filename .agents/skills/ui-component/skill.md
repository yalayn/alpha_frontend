---
name: ui-component-factory
description: >
  Instrucciones de generación para COMPONENTES SHARED en Project Alpha Frontend.
  Activar cuando se solicite crear o modificar cualquier elemento dentro de
  src/shared/: átomos (Button, Input, Badge, Spinner), moléculas (FormField,
  Card, Modal, Table), o su barrel exports. También activar cuando un componente
  de feature se detecte como candidato a ser promovido a shared/ por ser
  reutilizable y ciego al negocio.
  Este skill no redefine las reglas de arquitectura — esas viven en
  FRONTEND_ARCHITECTURE.md. Solo agrega las instrucciones operativas de
  generación que el modelo necesita para ejecutarlas correctamente.
---

# Skill: Generación de Componentes UI Shared — Project Alpha Frontend

## Fuente de Verdad

Las reglas que gobiernan esta capa están en `FRONTEND_ARCHITECTURE.md`.
Antes de generar cualquier código, internaliza:

- **Sección 2.4** — `shared/` es ciego al negocio
- **Sección 6** — Atomic Design (átomos, moléculas), estructura y reglas
- **Sección 9** — Convenciones de naming
- **Sección 12** — Checklist de PR

Este skill no repite esas reglas. Las asume conocidas y agrega solo las
instrucciones de generación que el documento de arquitectura no puede expresar.

---

## Instrucciones de Generación

### Antes de escribir cualquier archivo

Responde internamente estas preguntas. Si alguna es **sí**, detente y rediseña:

1. ¿Este componente importa algo de `features/`?
2. ¿Este componente conoce conceptos de negocio como "Plan", "Subscription" o "Customer"?
3. ¿Este componente llama a algún hook de API (`useGetPlans`, `useCreatePlan`, etc.)?
4. ¿Estoy hardcodeando clases de Tailwind condicionales inline en lugar de usar variantes definidas?

Si alguna es sí → el componente no pertenece a `shared/`. Pertenece a la feature que lo usa.

### Al decidir átomo vs molécula

Usa esta regla antes de elegir la carpeta:

- **Átomo** — no puede descomponerse en componentes más pequeños del sistema. Ejemplos: `Button`, `Input`, `Badge`, `Spinner`, `Avatar`, `Checkbox`, `Label`.
- **Molécula** — composición de dos o más átomos con una responsabilidad única. Ejemplos: `FormField` (Label + Input + mensaje de error), `Card` (contenedor + header + body), `Modal` (overlay + panel + Button de cierre).

Si el componente que vas a crear puede ser un átomo, hazlo átomo. Preferir la unidad más pequeña posible.

### Al generar un átomo

Genera siempre los dos archivos juntos:

1. `shared/components/atoms/{Component}/{Component}.tsx`
2. `shared/components/atoms/{Component}/index.ts`

Y actualiza `shared/index.ts` para incluir el nuevo export.

**Patrón obligatorio de átomo:**

```tsx
// shared/components/atoms/{Component}/{Component}.tsx
import { cn } from '@/shared/utils/cn';

interface {Component}Props {
  variant?: '{variantA}' | '{variantB}';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  // props semánticas explícitas — sin spreads de props desconocidas
}

const variantStyles: Record<Required<{Component}Props>['variant'], string> = {
  {variantA}: '{tailwind classes}',
  {variantB}: '{tailwind classes}',
};

const sizeStyles: Record<Required<{Component}Props>['size'], string> = {
  sm: '{tailwind classes}',
  md: '{tailwind classes}',
  lg: '{tailwind classes}',
};

export function {Component}({
  variant = '{variantA}',
  size = 'md',
  disabled = false,
  className,
  children,
}: {Component}Props) {
  return (
    <element
      disabled={disabled}
      className={cn(
        '{base tailwind classes}',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </element>
  );
}
```

**Reglas específicas de átomos:**
- Las variantes y tamaños se definen como objetos de lookup (`variantStyles`, `sizeStyles`), nunca como ternarios inline.
- Siempre aceptar `className` como prop para override puntual desde el consumidor.
- Siempre usar `cn()` (clsx + tailwind-merge) para componer clases. Nunca template literals con clases condicionales.
- El valor por defecto de cada prop opcional va en la desestructuración, no en el cuerpo del componente.

### Al generar una molécula

Genera siempre los dos archivos juntos:

1. `shared/components/molecules/{Molecule}/{Molecule}.tsx`
2. `shared/components/molecules/{Molecule}/index.ts`

Y actualiza `shared/index.ts`.

**Patrón obligatorio de molécula:**

```tsx
// shared/components/molecules/{Molecule}/{Molecule}.tsx
import { {Atom1}, {Atom2} } from '@/shared';

interface {Molecule}Props {
  // props que componen el comportamiento de la molécula
  // sin props de negocio — solo UI
}

export function {Molecule}({ ...props }: {Molecule}Props) {
  return (
    <div className="{layout classes}">
      <{Atom1} {...} />
      <{Atom2} {...} />
    </div>
  );
}
```

**Reglas específicas de moléculas:**
- Importan átomos siempre desde el barrel `@/shared`, nunca desde la ruta interna.
- No añaden lógica de negocio — si necesitan un callback, lo reciben como prop.
- Máximo un nivel de composición: molécula de átomos. No moléculas de moléculas.

### Al generar el barrel export de un componente

```typescript
// {Component}/index.ts
export { {Component} } from './{Component}';
export type { {Component}Props } from './{Component}';
```

### Al actualizar shared/index.ts

Agregar al final del archivo, manteniendo el orden alfabético por categoría:

```typescript
// átomos primero, luego moléculas
export * from './components/atoms/{NewAtom}';
// o
export * from './components/molecules/{NewMolecule}';
```

### Al evaluar si un componente de feature debe promoverse a shared

Un componente de feature es candidato a `shared/` si cumple **todas** estas condiciones:

- [ ] No importa ningún hook de API
- [ ] No conoce conceptos de negocio del dominio
- [ ] Se está usando o se usaría en más de una feature
- [ ] Puede describirse sin mencionar "Plan", "Subscription" u otro concepto del negocio

Si no cumple todas, permanece en la feature. No forzar la promoción.

---

## Lo que este skill NO hace

- No redefine cuándo usar átomo vs molécula en profundidad → ver `FRONTEND_ARCHITECTURE.md` sección 6.1
- No define cómo conectar componentes shared con features → ver `SKILL-feature.md`
- No contiene ejemplos con conceptos del dominio del proyecto
- No define el sistema de design tokens de Tailwind → ese vive en `tailwind.config.ts`
