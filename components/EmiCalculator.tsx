'use client';

import { useMemo, useState } from 'react';

interface EmiCalculatorProps {
  initialPrice: number;
}

const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
const formatNumber = (value: number) => value.toLocaleString('en-IN', { maximumFractionDigits: 2 });

export default function EmiCalculator({ initialPrice }: EmiCalculatorProps) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice.toString());
  const [downPayment, setDownPayment] = useState('0');
  const [interestRate, setInterestRate] = useState('9');
  const [loanTenure, setLoanTenure] = useState('36');

  const parsedVehiclePrice = Number(vehiclePrice.replace(/[^0-9.]/g, '')) || 0;
  const parsedDownPayment = Number(downPayment.replace(/[^0-9.]/g, '')) || 0;
  const parsedInterest = Number(interestRate.replace(/[^0-9.]/g, '')) || 0;
  const parsedTenure = Number(loanTenure.replace(/[^0-9.]/g, '')) || 0;

  const loanAmount = Math.max(parsedVehiclePrice - parsedDownPayment, 0);
  const tenureMonths = Math.max(Math.round(parsedTenure), 1);
  const monthlyRate = parsedInterest / 1200;

  const emi = useMemo(() => {
    if (loanAmount <= 0 || tenureMonths <= 0) return 0;
    if (monthlyRate === 0) return loanAmount / tenureMonths;
    const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
    const denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
    return denominator === 0 ? loanAmount / tenureMonths : numerator / denominator;
  }, [loanAmount, monthlyRate, tenureMonths]);

  const totalPayable = emi * tenureMonths;
  const totalInterest = Math.max(totalPayable - loanAmount, 0);

  return (
    <section style={{ marginTop: 40, padding: 24, borderRadius: 24, background: 'rgba(var(--surface-rgb),0.96)', border: '1px solid rgba(var(--primary-rgb),0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 260, flex: '1 1 320px' }}>
          <div style={{ fontFamily: 'Orbitron', fontSize: 13, color: 'var(--primary)', letterSpacing: 1.5, marginBottom: 10 }}>EMI CALCULATOR</div>
          <h3 style={{ fontFamily: 'Orbitron', fontSize: 24, color: 'var(--text-primary)', marginBottom: 10 }}>Estimate your monthly payment</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>Enter a down payment, tenure, and interest rate to see the loan amount, total interest, total payable, and monthly EMI.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(170px, 1fr))', gap: 16, width: '100%', maxWidth: 680 }}>
          {[
            { label: 'Vehicle Price', value: vehiclePrice, setter: setVehiclePrice },
            { label: 'Down Payment', value: downPayment, setter: setDownPayment },
            { label: 'Interest Rate (%)', value: interestRate, setter: setInterestRate },
            { label: 'Loan Tenure (months)', value: loanTenure, setter: setLoanTenure },
          ].map(({ label, value, setter }) => (
            <label key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text-secondary)', fontSize: 12 }}>
              <span style={{ fontFamily: 'Orbitron', letterSpacing: 1 }}>{label}</span>
              <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={e => setter(e.target.value)}
                style={{
                  background: 'rgba(var(--surface-rgb),0.08)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  padding: '14px 16px',
                  outline: 'none',
                  fontFamily: 'Exo 2, sans-serif',
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(160px, 1fr))', gap: 16 }}>
        {[
          { label: 'Loan Amount', value: loanAmount > 0 ? formatCurrency(loanAmount) : '—' },
          { label: 'Total Interest', value: totalInterest > 0 ? formatCurrency(totalInterest) : '—' },
          { label: 'Total Payable', value: totalPayable > 0 ? formatCurrency(totalPayable) : '—' },
          { label: 'Monthly EMI', value: emi > 0 ? formatCurrency(emi) : '—' },
        ].map(item => (
          <div key={item.label} style={{ padding: 20, borderRadius: 18, background: 'rgba(var(--primary-rgb),0.05)', border: '1px solid rgba(var(--primary-rgb),0.1)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: 1.2, fontFamily: 'Orbitron', marginBottom: 10 }}>{item.label.toUpperCase()}</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          section { padding: 18px !important; }
        }

        @media (max-width: 760px) {
          section { display: block !important; }
        }

        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(4, minmax(160px, 1fr))"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(2, minmax(170px, 1fr))"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
