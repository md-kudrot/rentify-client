import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon";

export default function MyBookingsPage() {
  const bookings = [
    {
      id: "BKG-001",
      property: "Luxury Villa in Beverly Hills",
      date: "May 15, 2026",
      amount: "$4,500",
      bookingStatus: "Approved",
      paymentStatus: "Paid"
    },
    {
      id: "BKG-002",
      property: "Modern Downtown Apartment",
      date: "June 2, 2026",
      amount: "$2,100",
      bookingStatus: "Pending",
      paymentStatus: "Pending"
    },
    {
      id: "BKG-003",
      property: "Seaside Cottage",
      date: "April 10, 2026",
      amount: "$1,800",
      bookingStatus: "Rejected",
      paymentStatus: "Refunded"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
      case "Paid":
        return <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">{(status).toUpperCase()}</span>;
      case "Pending":
        return <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded-full">{(status).toUpperCase()}</span>;
      case "Rejected":
      case "Refunded":
        return <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">{(status).toUpperCase()}</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs font-bold rounded-full">{(status).toUpperCase()}</span>;
    }
  };

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-lg">
        <div>
          <h2 className="font-display-sm text-on-surface">My Bookings</h2>
          <p className="text-on-surface-variant text-sm mt-1">View and manage your property bookings.</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-xxl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                  <th className="p-md font-bold text-on-surface-variant text-sm">Property Name</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Booking Date</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Amount Paid</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Booking Status</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Payment Status</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-surface-container-highest/20 transition-colors">
                    <td className="p-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                          <Icon name="home" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{booking.property}</p>
                          <p className="text-xs text-on-surface-variant">{booking.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-md text-sm text-on-surface">{booking.date}</td>
                    <td className="p-md text-sm font-bold text-on-surface">{booking.amount}</td>
                    <td className="p-md">{getStatusBadge(booking.bookingStatus)}</td>
                    <td className="p-md">{getStatusBadge(booking.paymentStatus)}</td>
                    <td className="p-md text-right">
                      <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors" title="View Details">
                        <Icon name="visibility" size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bookings.length === 0 && (
            <div className="p-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-md">
                <Icon name="event_busy" size={32} className="text-on-surface-variant" />
              </div>
              <h3 className="text-on-surface font-bold text-lg">No Bookings Found</h3>
              <p className="text-on-surface-variant text-sm mt-1">You haven't made any property bookings yet.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
