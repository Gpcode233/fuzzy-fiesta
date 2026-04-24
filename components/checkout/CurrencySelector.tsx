'use client';

export function CurrencySelector({
  currencies,
  value,
  onChange
}: {
  currencies: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {currencies.map((currency) => (
        <button
          key={currency}
          className={`rounded-2xl border px-4 py-4 text-center text-base font-medium transition ${
            value === currency
              ? 'border-accent bg-accent text-black shadow-sm'
              : 'border-[#ddcdb9] bg-[#fbf6ef] text-[#7d6852] hover:border-[#cdb89f] hover:text-zinc-900'
          }`}
          onClick={() => onChange(currency)}
          type="button"
        >
          {currency}
        </button>
      ))}
    </div>
  );
}
