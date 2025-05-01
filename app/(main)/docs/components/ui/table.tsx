import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableCaption as ShadcnTableCaption,
} from '@/components/ui/table';

// Enhanced table with border and rounded corners
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => <ShadcnTable ref={ref} className={cn('w-full border border-border rounded-md text-muted-foreground', className)} {...props} />);
Table.displayName = 'Table';

// Table header with distinct background and no hover effects
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <ShadcnTableHeader ref={ref} className={cn('border-b border-border [&_tr:hover]:bg-accent/30 [&_tr]:border-0', className)} {...props} />);
TableHeader.displayName = 'TableHeader';

// Table body with consistent styling
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <ShadcnTableBody ref={ref} className={cn('text-muted-foreground', className)} {...props} />);
TableBody.displayName = 'TableBody';

// Table row with increased padding
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => <ShadcnTableRow ref={ref} className={cn('py-4 text-[13px] text-muted-foreground', className)} {...props} />);
TableRow.displayName = 'TableRow';

// Table header cell with distinct background and compact padding
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => <ShadcnTableHead ref={ref} className={cn('h-auto py-1.5 px-4 text-[13px] text-left align-middle font-medium text-muted-foreground bg-accent/30 hover:bg-accent/30 [&:has([role=checkbox])]:pr-0', className)} {...props} />);
TableHead.displayName = 'TableHead';

// Table cell with adjusted text size and padding
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => <ShadcnTableCell ref={ref} className={cn('p-4 align-middle text-[13px] text-muted-foreground [&:has([role=checkbox])]:pr-0', className)} {...props} />);
TableCell.displayName = 'TableCell';

// Table caption
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => <ShadcnTableCaption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />);
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}; 