import type { Product } from '@/lib/store';

interface CompareTableProps {
  products: Product[];
}

const rows = [
  { label: 'Price', render: (product: Product) => `₹${product.price.toLocaleString('en-IN')}` },
  { label: 'Battery Capacity', render: (product: Product) => product.specs.battery },
  { label: 'Range', render: (product: Product) => product.specs.range },
  { label: 'Top Speed', render: (product: Product) => product.specs.topSpeed },
  { label: 'Charging Time', render: (product: Product) => product.specs.chargingTime },
  { label: 'Motor Power', render: (product: Product) => product.specs.motor },
];

export default function CompareTable({ products }: CompareTableProps) {
  return (
    <div style={{ overflowX: 'auto', marginTop: 32, borderRadius: 20, border: '1px solid var(--border)', background: 'rgba(var(--surface-rgb),0.96)' }}>
      <table style={{ width: '100%', minWidth: 650, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '18px 20px', color: 'var(--text-secondary)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>Compare</th>
            {products.map(product => (
              <th key={product.id} style={{ textAlign: 'left', padding: '18px 20px', color: 'var(--text-primary)', fontSize: 12, fontWeight: 700, borderLeft: '1px solid var(--border)' }}>
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label}>
              <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: 12, letterSpacing: 0.8, borderTop: '1px solid var(--border)' }}>
                {row.label}
              </td>
              {products.map(product => (
                <td key={`${product.id}-${row.label}`} style={{ padding: '16px 20px', color: 'var(--text-primary)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
                  {row.render(product)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
