import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter } from '@/shared';
import { formatPlanPrice } from '../utils/plans.utils';
import type { Plan } from '@/api/generated/model';

type PlanCardProps = Pick<Plan, 'id' | 'name' | 'price' | 'currency' | 'interval' | 'features'>;

export function PlanCard({ id, name, price, currency, interval, features }: PlanCardProps) {
  return (
    <Card>
      <CardBody className="space-y-3">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-2xl font-bold text-blue-600">
          {formatPlanPrice(price, currency, interval)}
        </p>
        <ul className="space-y-1 text-sm text-gray-600">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {f}
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Link
          to={`/plans/${id}`}
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Ver detalle
        </Link>
      </CardFooter>
    </Card>
  );
}
