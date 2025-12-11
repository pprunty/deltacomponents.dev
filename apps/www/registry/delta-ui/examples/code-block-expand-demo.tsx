"use client"

import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

const longCode = `import * as React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"

interface DataItem {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "pending"
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}

interface DataTableProps {
  data: DataItem[]
  onSelect?: (item: DataItem) => void
  onDelete?: (id: string) => void
  onEdit?: (item: DataItem) => void
  className?: string
  loading?: boolean
  error?: Error | null
}

export function DataTable({
  data,
  onSelect,
  onDelete,
  onEdit,
  className,
  loading = false,
  error = null,
}: DataTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof DataItem>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filterText, setFilterText] = useState("")

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        const modifier = sortDirection === "asc" ? 1 : -1
        if (aVal < bVal) return -1 * modifier
        if (aVal > bVal) return 1 * modifier
        return 0
      })
  }, [data, filterText, sortColumn, sortDirection])

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredData.map((item) => item.id)))
    }
  }, [filteredData, selectedIds.size])

  const handleSelectItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>
  }

  return (
    <div className={cn("rounded-lg border", className)}>
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Filter items..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-3 text-left">
              <input
                type="checkbox"
                checked={selectedIds.size === filteredData.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-3 text-left font-medium">Name</th>
            <th className="p-3 text-left font-medium">Status</th>
            <th className="p-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-muted/30">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">
                <span className={\`px-2 py-1 rounded-full text-xs \${
                  item.status === "active" ? "bg-green-100 text-green-800" :
                  item.status === "inactive" ? "bg-gray-100 text-gray-800" :
                  "bg-yellow-100 text-yellow-800"
                }\`}>
                  {item.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onEdit?.(item)}>Edit</button>
                <button onClick={() => onDelete?.(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`

export default function CodeBlockExpandDemo() {
  return (
    <div className="flex w-full max-w-full flex-col gap-4 self-start overflow-y-auto">
      <CodeBlock
        code={longCode}
        language="typescript"
        filename="data-table.tsx"
        expandable
        collapsedHeight="12rem"
      />
    </div>
  )
}
