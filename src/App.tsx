import { useState } from 'react';
import { Car, Calculator, Moon, Sun } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [province, setProvince] = useState('AB');
  const [price, setPrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [termYears, setTermYears] = useState(5);
  const [interestRate, setInterestRate] = useState(6.99);

  // Canadian tax rates (Alberta at 5% for savings!)
  const taxRates: Record<string, number> = {
    AB: 0.05, BC: 0.12, ON: 0.13, QC: 0.14975,
    MB: 0.12, SK: 0.11, NS: 0.15, NB: 0.15,
    NL: 0.15, PE: 0.15, NT: 0.05, YT: 0.05, NU: 0.05
  };

  const taxRate = taxRates[province] || 0.13;
  const taxableAmount = price - downPayment;
  const tax = taxableAmount * taxRate;
  const totalWithTax = price + tax;

  // Loan calculation
  const monthlyRate = interestRate / 100 / 12;
  const months = termYears * 12;
  const monthlyPayment = monthlyRate === 0
    ? (price - downPayment) / months
    : (price - downPayment) * monthlyRate * Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <>
      <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <Car className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold">newsuv.net</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              Canadian Car Loan + Tax Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Province</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  >
                    <option value="AB">Alberta (5% GST)</option>
                    <option value="BC">British Columbia (12%)</option>
                    <option value="ON">Ontario (13% HST)</option>
                    <option value="QC">Quebec (14.975%)</option>
                    <option value="MB">Manitoba</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="YT">Yukon</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vehicle Price ($)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Down Payment ($)</label>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(+e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
                  <select value={termYears} onChange={(e) => setTermYears(+e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                    {[3,4,5,6,7,8].map(y => <option key={y} value={y}>{y} years</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                  <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(+e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600" />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
                  <p className="text-sm text-blue-700 dark:text-blue-300">Tax Rate ({province})</p>
                  <p className="text-3xl font-bold">{(taxRate * 100).toFixed(2)}%</p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                  <p className="text-sm opacity-70">Sales Tax Amount</p>
                  <p className="text-3xl font-bold">${tax.toFixed(0)}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6">
                  <p className="text-sm text-green-700 dark:text-green-300">Total Cost with Tax</p>
                  <p className="text-3xl font-bold">${totalWithTax.toFixed(0)}</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6">
                  <p className="text-sm text-purple-700 dark:text-purple-300">Monthly Payment</p>
                  <p className="text-4xl font-bold">${monthlyPayment.toFixed(0)}/mo</p>
                  <p className="text-sm opacity-70 mt-2">over {termYears} years</p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-sm opacity-70">
              Built with React + Vite • Deployed on Vercel • Premium AI-Powered Tool for Canadians
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
