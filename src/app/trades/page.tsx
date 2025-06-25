'use client'
import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

const mockTrades = [
  { symbol: 'RELIANCE', type: 'BUY', quantity: 10, entry: 2750.25, current: 2765.8, pnl: 155.5, status: 'OPEN' },
  { symbol: 'INFY', type: 'SELL', quantity: 15, entry: 1450, current: 1445.3, pnl: 70.5, status: 'OPEN' },
  { symbol: 'HDFCBANK', type: 'SELL', quantity: 25, entry: 450.25, current: 452.8, pnl: -63.75, status: 'OPEN' },
  { symbol: 'TATASTEEL', type: 'BUY', quantity: 10, entry: 2750.25, current: 2765.8, pnl: 155.5, status: 'OPEN' },
  { symbol: 'WIPRO', type: 'BUY', quantity: 10, entry: 2750.25, current: 2765.8, pnl: 155.5, status: 'OPEN' },
  { symbol: 'INFY', type: 'SELL', quantity: 15, entry: 1450, current: 1445.3, pnl: 70.5, status: 'OPEN' },
  { symbol: 'HDFCBANK', type: 'SELL', quantity: 25, entry: 450.25, current: 452.8, pnl: -63.75, status: 'OPEN' },
  { symbol: 'TATASTEEL', type: 'BUY', quantity: 10, entry: 2750.25, current: 2765.8, pnl: 155.5, status: 'OPEN' },
];

const page = () => {
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState('All Trades');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Listen for sidebar collapse event via custom event
  React.useEffect(() => {
    const handler = (e: any) => setSidebarCollapsed(e.detail);
    window.addEventListener('sidebar:collapse', handler);
    return () => window.removeEventListener('sidebar:collapse', handler);
  }, []);
  const pageSize = 8;
  const total = 80;

  const filtered = filter === 'All Trades' ? mockTrades : mockTrades.filter(t => t.type === filter);
  const sorted = [...filtered].sort((a, b) => sortAsc ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol));
  const paginated = sorted.slice((page-1)*pageSize, page*pageSize);

  // Pagination logic for ellipsis style
  const totalPages = 10;
  const getPages = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex min-h-screen font-inter">
      <SidebarWithCollapseSync onCollapse={setSidebarCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}> 
        <Navbar />
        <main className="flex-1 bg-[#FAFAFE] dark:bg-[#0D1B47] p-8 overflow-auto"> 
          <div className="bg-white rounded-lg shadow-sm py-4 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 px-4">
            <div className="relative w-full sm:w-auto" style={{ minWidth: 150 }}>
              <select value={filter} onChange={e => setFilter(e.target.value)}
                className="border border-gray-400 rounded-full px-7 py-2 bg-white text-base font-inter appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 w-full pr-10"
              >
                <option>All Trades</option>
                <option>BUY</option>
                <option>SELL</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            <button
              onClick={() => setSortAsc(s => !s)}
              className="border border-gray-400 rounded-full px-7 py-2 bg-white text-base font-inter flex items-center gap-2 w-full sm:w-auto"
              style={{ minWidth: 120 }}
            >
              Sort By
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                <path d="M7 7l3-3 3 3M7 13l3 3 3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="sm:ml-auto border border-gray-400 rounded-full px-2 py-1 flex items-center justify-center bg-white shadow-none w-full sm:w-auto" aria-label="Tune" style={{minWidth: 36, minHeight: 36, borderWidth: 1.5}}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="10" width="18" height="2" rx="1" fill="#222"/>
                <rect x="11" y="16" width="10" height="2" rx="1" fill="#222"/>
                <rect x="9" y="22" width="14" height="2" rx="1" fill="#222"/>
                <circle cx="21" cy="11" r="2.5" fill="#222"/>
                <circle cx="13" cy="17" r="2.5" fill="#222"/>
                <circle cx="23" cy="23" r="2.5" fill="#222"/>
              </svg>
            </button>
          </div>
            <div className="overflow-x-auto dark:bg-[#10194E] rounded-md">
              <table className="min-w-full text-sm">
                <thead className="bg-[#F2F7FF] dark:bg-[#192A56]">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">Symbol</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">Type</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">Quantity</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">Entry Price</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">Current Price</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">P&amp;L</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-[#0E3D66] text-xs sm:text-sm">Status</th>
                  </tr>
                </thead>
                <tbody className='text-[#0E3D66]'>
                  {paginated.map((trade, i) => (
                    <tr key={i} className="border-t last:border-b">
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{trade.symbol}</td>
                      <td className={`px-2 sm:px-4 py-2 whitespace-nowrap ${trade.type === 'BUY' ? 'text-green-600' : 'text-red-500'}`}>{trade.type}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{trade.quantity}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">₹{trade.entry.toFixed(2)}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">₹{trade.current.toFixed(2)}</td>
                      <td className={`px-2 sm:px-4 py-2 whitespace-nowrap ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}>{trade.pnl >= 0 ? '+' : ''}₹{Math.abs(trade.pnl).toFixed(2)}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{trade.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 text-xs sm:text-sm font-semibold px-2 sm:px-4 gap-2 sm:gap-0">
              <span className="block mb-1 sm:mb-0">Showing {((page-1)*pageSize)+1} to {Math.min(page*pageSize, total)} of {total} trades</span>
              <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden bg-white w-full sm:w-auto">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-3 py-1 disabled:opacity-50 bg-white border-r border-gray-200">
                  {'<'}
                </button>
                {getPages().map((n, idx) =>
                  n === '...'
                    ? <span key={`ellipsis-${idx}`} className="px-3 py-1 select-none">...</span>
                    : <button
                        key={`page-${n}`}
                        onClick={() => setPage(Number(n))}
                        className={`px-3 py-1 ${page === n ? 'bg-blue-600 text-white' : 'bg-white'} border-r font-normal border-gray-300 last:border-r-0`}
                      >{n}</button>
                )}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="px-3 py-1 disabled:opacity-50 bg-white">
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper to sync collapse state between Sidebar and main page
function SidebarWithCollapseSync({ onCollapse }: { onCollapse: (collapsed: boolean) => void }) {
  return <Sidebar onCollapse={onCollapse} />;
}

export default page