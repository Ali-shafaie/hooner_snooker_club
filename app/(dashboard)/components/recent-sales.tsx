interface RecentSalesProps {
  booking: any;
}

export function RecentSales(props: RecentSalesProps) {
  const last10Objects =
    props.booking.length > 0 && props?.booking.slice(0, 40)?.reverse();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <div>
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider">
                  اسم مشتری
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider">
                  مقدار پول
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider">
                  شماره میز
                </th>
              </tr>
            </thead>
          </div>

          <div className="max-h-60 w-full">
            <tbody className="w-full">
              {last10Objects.length > 0 &&
                last10Objects.map((booking: any) => (
                  <tr key={booking.id}>
                    <td className="text-center px-6 py-4 border-b border-gray-300">
                      {booking.customer.name}
                    </td>
                    <td className="text-center px-6 py-4 border-b border-gray-300">
                      {booking.amountEarned}
                    </td>
                    <td className="text-center px-6 py-4 border-b border-gray-300">
                      {booking.table.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </div>
        </table>
      </div>
    </div>
  );
}
