import { Link } from 'react-router-dom';

export function PlanEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-16 text-center">
      <p className="text-sm font-medium text-gray-900">No hay planes disponibles</p>
      <p className="mt-1 text-sm text-gray-500">Crea el primer plan de suscripción.</p>
      <Link
        to="/plans/new"
        className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Crear plan
      </Link>
    </div>
  );
}
