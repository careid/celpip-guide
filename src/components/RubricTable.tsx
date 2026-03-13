interface RubricRow {
  criterion: string;
  weight: string;
  description: string;
}

interface RubricTableProps {
  rows: RubricRow[];
}

export function RubricTable({ rows }: RubricTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700 w-1/3">
              Criterion
            </th>
            <th className="text-center p-3 border border-gray-200 font-semibold text-gray-700 w-16">
              Weight
            </th>
            <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">
              What Raters Look For
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 border border-gray-200 font-medium text-gray-800">{row.criterion}</td>
              <td className="p-3 border border-gray-200 text-center text-brand-700 font-bold">{row.weight}</td>
              <td className="p-3 border border-gray-200 text-gray-700">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
