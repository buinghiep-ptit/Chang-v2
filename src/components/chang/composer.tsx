import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Bookmark,
  CornerDownLeft,
  File,
  FileText,
  Lightbulb,
  Music2,
  Plus,
  X,
  type LucideIcon,
} from 'lucide-react'
import { PromptRecommendationPanel } from './prompt-recommendation-panel'
import { PromptTemplatePanel } from './prompt-template-panel'
import { PlusMenu } from './plus-menu'
import { cn } from '@/lib/utils'

export type ComposerPanel = 'recommendation' | 'template' | null

interface ComposerProps {
  onSend?: (text: string, files?: File[]) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  panel?: ComposerPanel
  onPanelChange?: (panel: ComposerPanel) => void
}

export function ChangComposer({
  onSend,
  disabled,
  placeholder = 'Nhắn cho Chang...',
  className,
  panel: panelProp,
  onPanelChange,
}: ComposerProps) {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [panelInternal, setPanelInternal] = useState<ComposerPanel>(null)
  const [plusOpen, setPlusOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isControlled = panelProp !== undefined
  const panel = isControlled ? panelProp : panelInternal
  const setPanel = (next: ComposerPanel): void => {
    if (!isControlled) setPanelInternal(next)
    onPanelChange?.(next)
  }

  function togglePanel(next: Exclude<ComposerPanel, null>) {
    setPanel(panel === next ? null : next)
  }

  function applyPrompt(text: string) {
    setValue(text)
    setPanel(null)
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (!el) return
      el.focus()
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 140) + 'px'
    })
  }

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const addFiles = useCallback((accepted: File[]) => {
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name))
      return [...prev, ...accepted.filter((f) => !names.has(f.name))]
    })
  }, [])

  const { getInputProps, open } = useDropzone({
    onDrop: addFiles,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
  })

  function resizeTextarea() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }

  function onInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value)
    resizeTextarea()
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      send()
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const imageItems = Array.from(e.clipboardData.items).filter(
      (it) => it.kind === 'file' && it.type.startsWith('image/'),
    )
    if (imageItems.length > 0) {
      e.preventDefault()
      const pasted = imageItems.map((it) => it.getAsFile()).filter(Boolean) as File[]
      addFiles(pasted)
    }
  }

  function send() {
    const text = value.trim()
    if ((!text && files.length === 0) || disabled) return
    onSend?.(text || `[Đính kèm ${files.length} file]`, files.length > 0 ? files : undefined)
    setValue('')
    setFiles([])
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const canSend = !disabled && (value.trim().length > 0 || files.length > 0)

  return (
    <div
      className={cn(
        'w-full bg-background border border-border rounded-lg shadow-xs',
        className,
      )}
    >
      <input {...getInputProps()} />

      {panel === 'recommendation' && (
        <>
          <PromptRecommendationPanel
            onClose={() => setPanel(null)}
            onSelect={applyPrompt}
          />
          <div className="h-px bg-border" />
        </>
      )}
      {panel === 'template' && (
        <>
          <PromptTemplatePanel
            onClose={() => setPanel(null)}
            onSelect={applyPrompt}
          />
          <div className="h-px bg-border" />
        </>
      )}

      {files.length > 0 && <FileChips files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} />}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={onInput}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
        className={cn(
          'w-full block resize-none bg-transparent outline-none',
          'p-3 text-base leading-6 placeholder:text-muted-foreground',
          'min-h-[40px]',
          'disabled:opacity-50',
        )}
      />

      <div className="pt-1.5 pb-3 px-3 flex items-center gap-2">
        <div className="relative">
          <ToolButton
            onClick={() => setPlusOpen((v) => !v)}
            variant="outlined"
            active={plusOpen}
            disabled={disabled}
          >
            <Plus size={16} />
          </ToolButton>
          {plusOpen && (
            <div className="absolute bottom-full mb-2 left-0 z-20">
              <PlusMenu
                onClose={() => setPlusOpen(false)}
                onAttach={() => {
                  setPlusOpen(false)
                  open()
                }}
              />
            </div>
          )}
        </div>
        <ToolButton
          onClick={() => togglePanel('recommendation')}
          active={panel === 'recommendation'}
          disabled={disabled}
        >
          <Lightbulb size={16} />
        </ToolButton>
        <ToolButton
          onClick={() => togglePanel('template')}
          active={panel === 'template'}
          disabled={disabled}
        >
          <Bookmark size={16} />
        </ToolButton>

        <div className="h-4 w-px bg-border" />

        <span className="flex-1 font-mono text-xs leading-4 text-muted-foreground truncate">
          @agent · /skill
        </span>

        <div className="h-4 w-px bg-border" />

        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          aria-label="Gửi"
          className={cn(
            'size-6 rounded-lg shadow-xs inline-flex items-center justify-center',
            'bg-primary text-primary-foreground transition-opacity',
            !canSend && 'opacity-40 cursor-not-allowed',
          )}
        >
          <CornerDownLeft size={14} />
        </button>
      </div>
    </div>
  )
}

function ToolButton({
  children,
  onClick,
  disabled,
  variant = 'plain',
  active,
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'plain' | 'outlined'
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'size-6 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors',
        variant === 'outlined' && 'border border-border bg-background shadow-xs',
        active && 'bg-muted text-foreground',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {children}
    </button>
  )
}

function FileChips({ files, onRemove }: { files: File[]; onRemove: (i: number) => void }) {
  const indexed = files.map((file, idx) => ({ file, idx }))
  const images = indexed.filter(({ file }) => file.type.startsWith('image/'))
  const others = indexed.filter(({ file }) => !file.type.startsWith('image/'))

  return (
    <div className="px-3 pt-3 pb-1.5 flex flex-col gap-2.5">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {images.map(({ file, idx }) => (
            <ImageThumb key={`${file.name}-${idx}`} file={file} onRemove={() => onRemove(idx)} />
          ))}
        </div>
      )}
      {others.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {others.map(({ file, idx }) => (
            <FileChip key={`${file.name}-${idx}`} file={file} onRemove={() => onRemove(idx)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ImageThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
  const url = useObjectUrl(file)
  return (
    <div className="group relative size-24 rounded-lg overflow-hidden border border-border bg-muted">
      {url && (
        <img src={url} alt={file.name} className="absolute inset-0 size-full object-cover" />
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Xoá file"
        className="absolute top-1 right-1 size-5 rounded-full bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 inline-flex items-center justify-center transition-opacity"
      >
        <X size={12} />
      </button>
    </div>
  )
}

function FileChip({ file, onRemove }: { file: File; onRemove: () => void }) {
  const Icon = getFileIcon(file)
  return (
    <div className="group relative h-9 inline-flex items-center gap-1.5 pl-2.5 pr-2.5 rounded-lg border border-border bg-background">
      <Icon size={16} className="shrink-0 text-muted-foreground" />
      <span className="text-sm font-medium leading-5 text-muted-foreground whitespace-nowrap max-w-[180px] truncate">
        {file.name}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Xoá file"
        className="ml-0.5 size-4 rounded-full bg-muted hover:bg-foreground/15 inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={10} />
      </button>
    </div>
  )
}

function getFileIcon(file: File): LucideIcon {
  if (file.type.startsWith('audio/')) return Music2
  if (file.type === 'application/pdf' || file.type.startsWith('text/') || /\.(md|txt|doc|docx)$/i.test(file.name))
    return FileText
  return File
}

function useObjectUrl(file: File): string | null {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    const u = URL.createObjectURL(file)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [file])
  return url
}
