"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea } from "./ui/scroll-area"
import { ScrollBar } from "./ui/scroll-area"
import { Shield, ShieldOff } from "lucide-react"

const examples = [
  {
    name: "Admin",
    href: "/users/admin",
    icon: <Shield />
  },
  {
    name: "Users",
    href: "/users/normal",
    icon: <ShieldOff />
  }
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UsersNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example, index) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
