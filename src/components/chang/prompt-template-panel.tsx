import { useState } from 'react'
import { Bookmark, BookmarkPlus, ClipboardType, Trash, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PromptTemplatePanelProps {
  onClose: () => void
  onSelect?: (prompt: string) => void
  className?: string
}

interface TemplateItem {
  id: string
  title: string
  body: string
  custom?: boolean
}

const STAGED_BODY =
  'Mình xin nghỉ phép từ [ngày] đến [ngày] vì lý do [lý do]. Soạn email tiếng Việt gửi line manager + HR, nêu plan handover trong khi vắng.'

const TEMPLATES: TemplateItem[] = [
  {
    id: '1',
    title: 'Báo cáo cuối ngày',
    body: 'Tóm tắt giúp tôi 5 việc đã xử lý hôm nay, 3 việc đang vướng và 3 việc cần ưu tiên ngày mai. Định dạng bullet list.',
  },
  {
    id: '2',
    title: 'Tóm tắt cuộc họp',
    body: 'Tôi vừa có cuộc họp 30 phút về [chủ đề]. Tóm tắt thành: 1) decision (3 ý), 2) action items (kèm owner + deadline), 3) open questions cần follow-up.',
  },
  {
    id: '3',
    title: 'Soạn Email khen team',
    body: 'Soạn 1 email tiếng Việt khen team [tên team] vì đã hoàn thành [thành tựu]. Tone tích cực + cụ thể, dài 5 - 7 câu',
  },
  {
    id: '4',
    title: 'Plan Tuần',
    body: 'Tóm tắt giúp tôi 5 việc đã xử lý hôm nay, 3 việc đang vướng và 3 việc cần ưu tiên ngày mai. Định dạng bullet list.',
  },
  {
    id: '5',
    title: 'Xin nghỉ phép',
    body: 'Mình xin nghỉ phép từ [ngày] đến [ngày] vì lý do [lý do]. Soạn email gửi line manager + HR, nêu plan handover trong khi vắng.',
  },
  {
    id: '6',
    title: 'Mẫu tự làm',
    body: 'Mẫu này người dùng tự thêm, các mẫu màu xanh là default hệ thống',
    custom: true,
  },
]

export function PromptTemplatePanel({
  onClose,
  onSelect,
  className,
}: PromptTemplatePanelProps) {
  const [url, setUrl] = useState('')

  return (
    <div className={cn('w-full max-h-[520px] flex flex-col', className)}>
      <div className="px-3 pt-3 pb-1 flex items-center gap-1.5 shrink-0">
        <div className="flex-1 text-sm font-medium leading-5">Mẫu Prompt</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="size-6 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="h-px bg-border mx-3 shrink-0" />

      <div className="bg-muted/50 px-3 py-2 flex flex-col gap-2 shrink-0">
        <div className="px-2 flex flex-col gap-2">
          <div className="flex items-start gap-1">
            <div className="flex-1 h-9 flex items-center rounded-lg border border-border bg-background shadow-xs">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://x.com/shadcn"
                className="flex-1 h-full pl-3 pr-2 py-1 bg-transparent outline-none text-sm leading-5 placeholder:text-muted-foreground"
              />
              <div className="pr-1.5 py-1.5">
                <button
                  type="button"
                  className="h-6 px-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  Lưu
                </button>
              </div>
            </div>
            <button
              type="button"
              aria-label="Huỷ"
              className="size-9 rounded-lg border border-border bg-background shadow-xs inline-flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-start gap-3">
            <span className="h-[22px] px-2.5 py-0.5 inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground text-xs font-medium shrink-0">
              <ClipboardType size={12} />
              Nội dung
            </span>
            <p className="flex-1 text-sm leading-5 text-muted-foreground">{STAGED_BODY}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-1.5">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className="group relative px-2 py-2 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => onSelect?.(t.body)}
              className="flex-1 min-w-0 flex flex-col gap-1 text-left"
            >
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'size-6 rounded-lg inline-flex items-center justify-center shrink-0',
                    t.custom ? 'text-muted-foreground' : 'text-foreground',
                  )}
                >
                  {t.custom ? <BookmarkPlus size={16} /> : <Bookmark size={16} />}
                </span>
                <span className="text-sm font-medium leading-5 truncate">{t.title}</span>
                {!t.custom && (
                  <span className="text-xs leading-4 text-muted-foreground uppercase">
                    Mẫu
                  </span>
                )}
              </div>
              <p className="text-sm leading-5 text-muted-foreground line-clamp-2">{t.body}</p>
            </button>
            {t.custom && (
              <button
                type="button"
                aria-label="Xoá mẫu"
                className="size-6 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors shrink-0"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
