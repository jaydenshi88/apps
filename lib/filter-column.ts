import {
  eq,
  ilike,
  inArray,
  isNotNull,
  isNull,
  not,
  notLike,
  type Column,
  type ColumnBaseConfig,
  type ColumnDataType,
  like,
} from "drizzle-orm"

import { type DataTableConfig } from "@/config/data-table"

export function filterColumn({
  column,
  value,
  isSelectable,
}: {
  column: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>
  value: string
  isSelectable?: boolean
}) {
  const [filterValue, filterOperator] = (value?.split("~").filter(Boolean) ??
    []) as [
      string,
      DataTableConfig["comparisonOperators"][number]["value"] | undefined,
    ]

  console.log(filterValue)
  console.log(filterOperator)
  if (!filterValue) {
    console.log("wrong")
    return
  }

  if (isSelectable) {
    switch (filterOperator) {
      case "eq":
        return inArray(column, filterValue?.split(".").filter(Boolean) ?? [])
      case "notEq":
        return not(
          inArray(column, filterValue?.split(".").filter(Boolean) ?? [])
        )
      case "isNull":
        return isNull(column)
      case "isNotNull":
        return isNotNull(column)
      default:
        console.log("inArray")
        return inArray(column, filterValue?.split(".") ?? [])
    }
  }

  switch (filterOperator) {
    case "ilike":
      return like(column, `%${filterValue}%`)
    case "notIlike":
      return notLike(column, `%${filterValue}%`)
    case "startsWith":
      return ilike(column, `${filterValue}%`)
    case "endsWith":
      return ilike(column, `%${filterValue}`)
    case "eq":
      return eq(column, filterValue)
    case "notEq":
      return not(eq(column, filterValue))
    case "isNull":
      return isNull(column)
    case "isNotNull":
      return isNotNull(column)
    default:
      console.log("like")
      console.log(filterValue)
      return like(column, `%${filterValue}%`)
  }
}
