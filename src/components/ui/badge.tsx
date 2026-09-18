import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap [&>svg]:size-3 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/10 text-primary',
        outline: 'text-muted-foreground bg-card',
        muted: 'border-transparent bg-muted text-muted-foreground',
        // Naranja solo donde hay decisión humana. Ver button.tsx.
        human: 'border-transparent bg-human/10 text-human',
        success: 'border-transparent bg-success/10 text-success',
        // Sólido, no translúcido: --warning-foreground es oscuro en ambos
        // modos (DESIGN.md: "texto oscuro encima"), así que solo contrasta
        // sobre el amarillo lleno.
        warning: 'border-transparent bg-warning text-warning-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Component = asChild ? Slot : 'span'

  return (
    <Component
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
