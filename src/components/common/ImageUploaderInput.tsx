import { useEffect, useRef, useState } from "react"
import { Controller, type Control } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"

interface ImageUploaderInputProps {
  name: string
  control: Control<any>
  disabled?: boolean
}

export function ImageUploaderInput({
  name,
  control,
  disabled = false,
}: ImageUploaderInputProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const file = field.value as File | null

        useEffect(() => {
          if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
          } else {
            setPreview(null)
          }
        }, [file])

        const handleFile = (file: File) => {
          if (file && file.type.startsWith("image/")) {
            field.onChange(file)
          }
        }

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          setDragOver(false)
          const droppedFile = e.dataTransfer.files?.[0]
          if (droppedFile) handleFile(droppedFile)
        }

        return (
          <div className="relative w-full">
            {preview ? (
              <div className="relative w-full h-40 border rounded-md overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-white/70 hover:bg-white"
                  onClick={() => field.onChange(null)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ) : (
              <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-md bg-muted/40 text-muted-foreground transition-colors cursor-pointer hover:bg-muted",
                  dragOver && "border-primary/50 bg-muted"
                )}
              >
                <ImageIcon className="h-6 w-6 mb-1" />
                <span className="text-xs">Clique ou arraste uma imagem</span>
              </div>
            )}

            <input
              ref={inputRef}
              id={name}
              type="file"
              accept="image/*"
              className="hidden"
              disabled={disabled}
              onChange={(e) => {
                const selected = e.target.files?.[0]
                if (selected) handleFile(selected)
              }}
            />
          </div>
        )
      }}
    />
  )
}
