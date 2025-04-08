'use client';

import React from 'react';

// Custom Table component with horizontal scroll wrapper
export const Table: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="overflow-x-auto font-mono border dark:border-[#252525]">
    <table className="min-w-full border-collapse border-spacing-0">
      {children}
    </table>
  </div>
);

// Custom Table Header Cell with dark mode styling
export const TableHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <th className="border border-gray-300 dark:border-[#252525] px-4 py-2 text-xs text-left font-semibold bg-gray-100 dark:bg-[#222222] dark:text-gray-100">
    {children}
  </th>
);

// Custom Table Cell with dark mode styling
export const TableCell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <td className="border border-gray-200 dark:border-[#252525] px-4 py-2 text-xs dark:text-[#999999]">
    {children}
  </td>
);

// Custom Table Row with dark mode styling
export const TableRow: React.FC<{
  children: React.ReactNode;
  isHeader?: boolean;
}> = ({ children, isHeader }) => (
  <tr
    className={
      isHeader
        ? 'bg-gray-50 dark:bg-gray-900'
        : 'hover:bg-gray-100 dark:hover:bg-[#222222]'
    }
  >
    {children}
  </tr>
);
