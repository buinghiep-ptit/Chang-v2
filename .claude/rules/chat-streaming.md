---
alwaysApply: false
globs: "src/features/chat/**,src/hooks/use-chat-stream*,src/services/chat*,src/store/chat-store*"
---

# Chat Streaming

> Quy tắc xử lý SSE/NDJSON stream từ AI agent API.

## Endpoint

```
POST {VITE_AGENT_BASE_URL}/ai-agent/api/hrai-portal/agent/{VITE_AGENT_ID}/chat?isStream=true
Body: { text, conversationId: string | null, attachments: null }
```

Dùng `streamPost` từ `@/lib/http` — KHÔNG dùng `fetch` raw hay `axios` trực tiếp.

## Event types (NDJSON, mỗi dòng là 1 JSON)

| type          | Ý nghĩa                                                   |
| ------------- | --------------------------------------------------------- |
| `thinking`    | Bot đang suy nghĩ; mỗi event có `name`, `avatar`, `text` |
| `in-progress` | Bot đang trả lời; `text` là token cần append             |
| `final`       | Kết thúc; `text` là nội dung đầy đủ                      |

## UX state machine

```
[user sends]
    ↓
  thinking  → show "{name} đang suy nghĩ"   (cập nhật theo event mới nhất)
    ↓ (first in-progress event)
 streaming  → show "{name} đang trả lời" + accumulated text
    ↓ (final event)
    idle    → render completed MessageBubble với full text
```

## Conversation status

`Conversation.status: 'idle' | 'thinking' | 'streaming'`

- `thinking` — disable composer, show ThinkingBubble với botName/botAvatar
- `streaming` — disable composer, show StreamingBubble với accumulated streamText
- `idle` — composer enabled

## Store actions cho stream

| Action               | Khi dùng                                    |
| -------------------- | ------------------------------------------- |
| `setThinking`        | Nhận event `thinking`                       |
| `handleInProgress`   | Nhận event `in-progress` (append token)     |
| `finishStream`       | Nhận event `final` (commit message + reset) |

## Hook

`useChatStream(convId)` — dùng `useMutation` từ TanStack Query:

- `mutationFn` gọi `chatService.streamChat`, cập nhật store qua callbacks
- `onError` toast + set status idle
- Trả về `{ sendMessage, abort, isPending }`

## Quy tắc

- Abort stream khi component unmount (AbortController).
- Không retry stream tự động — để user tự thử lại.
- `conversationId` lần đầu là `null`, server trả về ID trong event — lưu lại vào `backendConvId`.
- Avatar bot: dùng `<img>` từ URL event, fallback `<Mascot>` nếu load lỗi.
