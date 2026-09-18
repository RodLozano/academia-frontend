import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input bg-muted/60 placeholder:text-muted-foreground field-sizing-content flex min-h-20 w-full rounded-lg border px-3 py-2 text-base transition-colors outline-none',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:bg-card focus-visible:ring-[3px]',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
