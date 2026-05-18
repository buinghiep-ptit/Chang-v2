---
name: Chang DW — Design System (Figma 1:1)
source: Figma file 88clbXS7r4F3uNNHCNaXO9 — "Chang DW | UX UI | 2026"
theme: Zinc / Shadcn default (light)
font:
  primary: Noto Sans Variable
  mono:    JetBrains Mono (chỉ dùng cho placeholder @agent · /skill trong Composer)
radius:
  lg:   "10px"     # ⚠️ TOÀN HỆ THỐNG dùng radius này
  full: "9999px"   # avatar mascot, badge số đếm
colors-light:
  background:           "#ffffff"
  foreground:           "#0a0a0a"
  card:                 "#ffffff"
  card-foreground:      "#0a0a0a"
  primary:              "#171717"
  primary-foreground:   "#fafafa"
  secondary:            "#f5f5f5"
  secondary-foreground: "#171717"
  muted:                "#f5f5f5"
  muted-foreground:     "#737373"
  accent:               "#f5f5f5"
  border:               "#e5e5e5"
  input:                "#e5e5e5"
  ring:                 "#a1a1a1"
  destructive:          "#e7000b"
  destructive-foreground: "rgba(255,255,255,0.95)"
  sidebar:              "#fafafa"
  sidebar-foreground:   "#0a0a0a"
  sidebar-primary:      "#171717"
  sidebar-border:       "#e5e5e5"
shadows:
  xs:          "0 1px 2px 0 rgba(0,0,0,0.10)"
  focus-ring:  "0 0 0 3px rgba(161,161,161,0.5)"
---

> **Document này phản ánh Figma 1:1.** Code repo hiện đang ở theme khác (Inter + Violet). Việc refactor code để khớp Figma có **plan riêng** — không thuộc phạm vi file này.

---

## 1. Tokens

### 1.1 Color (light)

Figma chỉ export light theme. Dark theme **chưa có** trong file thiết kế — sẽ bổ sung khi Figma có biến `dark`.

| Token | Hex | Dùng cho |
| --- | --- | --- |
| `--background` | `#ffffff` | Nền page, card, input, outline button |
| `--foreground` | `#0a0a0a` | Text mặc định, ghost/outline button label |
| `--card` | `#ffffff` | Card surface |
| `--card-foreground` | `#0a0a0a` | Heading trong card |
| `--primary` | `#171717` | Primary button bg, badge default, switch ON, link text |
| `--primary-foreground` | `#fafafa` | Text trên `--primary` |
| `--secondary` | `#f5f5f5` | Secondary button bg, badge secondary |
| `--secondary-foreground` | `#171717` | Text trên `--secondary` |
| `--muted` | `#f5f5f5` | Item muted bg, conversation page bg |
| `--muted-foreground` | `#737373` | Placeholder, breadcrumb mid, subtitle |
| `--accent` | `#f5f5f5` | TopBar action button bg |
| `--border` | `#e5e5e5` | Border outline + divider (1px) |
| `--input` | `#e5e5e5` | Switch track OFF |
| `--ring` | `#a1a1a1` | Focus ring border |
| `--destructive` | `#e7000b` | Destructive button/badge bg |
| `--destructive-foreground` | `rgba(255,255,255,.95)` | Text trên destructive |
| `--sidebar` | `#fafafa` | Sidebar bg |
| `--sidebar-foreground` | `#0a0a0a` | Sidebar text |
| `--sidebar-primary` | `#171717` | Sidebar logo icon bg |
| `--sidebar-border` | `#e5e5e5` | Sidebar border + sub-menu connector |

### 1.2 Radius

| Token | Value | Dùng cho |
| --- | --- | --- |
| `--radius-lg` | `10px` | **Tất cả** button, badge, input, card, avatar vuông, item, switch track |
| `--radius-full` | `9999px` | Agent avatar 128px, badge số đếm |

> ⚠️ Figma **không có** `--radius-sm/md/xl`. Toàn UI dùng một radius `10px`. Đây là khác biệt lớn so với phiên bản code hiện tại.

### 1.3 Spacing

Thang spacing theo tailwind scale, đơn vị `4px`. Token Figma đặt theo trục (`p-N`, `px-N`, `py-N`, `gap-N`, `space-x-N`, `mx-N`, ...). Khi build CSS có thể alias về một thang chung.

| Token | px |
| --- | --- |
| `*-0.5` | 2 |
| `*-1` | 4 |
| `*-1.5` | 6 |
| `*-2` | 8 |
| `*-2.5` | 10 |
| `*-3` | 12 |
| `*-3.5` | 14 |
| `*-4` | 16 |
| `*-6` | 24 |
| `*-8` | 32 |

Opacity tokens hay gặp: `opacity-50` (disabled/loading), `opacity-70` (sidebar section label), `opacity-80` (button hover).

### 1.4 Typography

**Font chính:** `Noto Sans` variable (axes `CTGR`, `wdth`). Letter-spacing `--tracking/normal` = `0`.

**Font phụ:** `JetBrains Mono` — chỉ dùng cho placeholder `@agent · /skill` trong Composer.

| Token size | px | Token line-height | px |
| --- | --- | --- | --- |
| `--size/xs` | 12 | `--leading/4` | 16 |
| `--size/sm` | 14 | `--leading/5` | 20 |
| `--size/base` | 16 | `--leading/6` | 24 |
| `--size/2xl` | 24 | `--leading/8` | 32 |

| Weight token | Value |
| --- | --- |
| `--weight/light` | 300 |
| `--weight/normal` | 400 |
| `--weight/medium` | 500 |

**Text style được đặt tên trong Figma:**

| Style | Spec | Dùng cho |
| --- | --- | --- |
| `Text-xs/Regular` | 12 / 16 / 400 | Section label uppercase, divider label, sidebar email |
| `Text-xs/Medium` | 12 / 16 / 500 | Badge text, badge số đếm |
| `Text-sm/Regular` | 14 / 20 / 400 | Body, breadcrumb, sidebar menu, item sub-text |
| `Text-sm/Medium` | 14 / 20 / 500 | Button label, item heading, chip label |
| `Text-sm/Light` | 14 / 20 / 300 | Hero card subtitle ("Digital Workforce Platform") |
| `Text-base/Regular` | 16 / 24 / 400 | Input value, composer placeholder |
| `Text-2xl/Semi Bold` | 24 / 32 / 400 | Greeting title "Chang nèe" |

### 1.5 Shadows

| Token | Value | Áp cho |
| --- | --- | --- |
| `shadow-xs` | `0 1px 2px 0 rgba(0,0,0,0.10)` | Button (primary/secondary/destructive/outline/icon), Input, Chip, Card hero buttons, Composer |
| `focus-ring` | `0 0 0 3px rgba(161,161,161,0.5)` | Input active, button focus |

`shadow-xs` **không** áp lên: ghost button, link button, loading button.

---

## 2. Components

### 2.1 Avatar

| Variant | Size | Radius | Border |
| --- | --- | --- | --- |
| Circle (single) | 32 × 32 | `--radius-lg` | – |
| Square | 32 × 32 | `--radius-lg` | – |
| Group | 32 mỗi item, overlap −8px | `--radius-lg` | items 2+ có `1px var(--border)` |
| Hero / mascot (Home) | 128 × 128 | `--radius-full` | `1px var(--background)` |

### 2.2 Badge

Chung: `h-22` (cao 22), padding `px-2.5 py-0.5` (10 / 2), `--radius-lg`, `Text-xs/Medium` (12 / 16 / 500), align center.

| Variant | bg | text | border |
| --- | --- | --- | --- |
| `default` | `--primary` | `--primary-foreground` | – |
| `secondary` | `--secondary` | `--secondary-foreground` | – |
| `destructive` | `--destructive` | `rgba(255,255,255,.95)` | – |
| `outline` | transparent | `--foreground` | `1px var(--border)` |

Variants phụ: `with icon` (16px lucide trước text), `number` (text-only ngắn).

### 2.3 Breadcrumb

- Container: `flex items-center gap-1.5` (6).
- Item: `Text-sm/Regular`. Mid: `text-muted-foreground`. Current: `text-foreground`.
- Separator: lucide `slash` 14 × 14.
- Variants: dropdown, collapsed (`…`), link, responsive (ẩn item ở mobile).

### 2.4 Button

Chung: `Text-sm/Medium` (14 / 20 / 500), `--radius-lg`, padding theo size.

| Size | Height | Padding | Icon-only |
| --- | --- | --- | --- |
| `small` | 32 | `px-3` | 32 × 32 |
| `default` | 36 | `px-4 py-2` (16 / 8) | 36 × 36 |
| `large` | 40 | `px-6` | 40 × 40 |

Variant matrix:

| Variant | bg | text | border | shadow |
| --- | --- | --- | --- | --- |
| `primary` | `--primary` | `--primary-foreground` | – | `shadow-xs` |
| `secondary` | `--secondary` | `--secondary-foreground` | – | `shadow-xs` |
| `destructive` | `--destructive` | `--destructive-foreground` | – | `shadow-xs` |
| `outline` | `--background` | `--foreground` | `1px var(--border)` | `shadow-xs` |
| `ghost` | transparent | `--foreground` | – | – |
| `link` | transparent | `--primary` | – | – |
| `icon` (icon-only) | `--background` | – | `1px var(--border)` | `shadow-xs` |
| `loading` | `--background` | `--foreground` | `1px var(--border)` | – |

**States:**

- `hover` — toàn variant: `opacity-80` (theo cách Figma kit hiển thị state, kit dùng opacity layer thay vì shift màu).
- `loading` — `h-32`, `gap-1.5` (6), `opacity-50`, spinner 14px lucide ở trước label.
- `link` hover — gạch chân (`text-decoration: underline`).

**Button group:** items chia bằng `border-r 1px var(--border)`, item inner `h-36`, wrapper có `shadow-xs`.

### 2.5 Input

| Property | Value |
| --- | --- |
| Height | 36 |
| Padding | `px-3 py-1` (12 / 4) |
| Radius | `--radius-lg` |
| Font | `Text-base/Regular` (16 / 24 / 400) |
| Placeholder | `--muted-foreground` |
| BG | `--background` |
| Width default | 320 |

| State | border | extra |
| --- | --- | --- |
| `default` | `1px var(--border)` | `shadow-xs` |
| `active` (focus) | `1px var(--ring)` | `focus-ring` shadow |
| `disabled` | `1px var(--border)` | `shadow-xs` + `opacity-50` |

Sub-variants: `File` (input file), `With Label`, `With Button` (composed input, w-426).

### 2.6 Input Group

Wrapper `h-36`, border `1px var(--border)`, `--radius-lg`, `shadow-xs`, bg `--background`, width default 344.

Sub-types từ Figma: `Icon` (1–4 prefix/suffix), `Text` (prefix/suffix label), `Button` (input + appended button), `Tooltip`, `Textarea`, `Spinner`, `Label`, `Dropdown`, `Button Group`.

Ví dụ — search input: icon prefix `lucide/search` 16 ở `pl-3 py-1.5`, body `flex-1 px-2 py-1`, trailing text `pr-3 py-1.5` `Text-sm/Medium` muted.

### 2.7 Item

Container: `gap-4` (16), `p-4` (16), `--radius-lg`, w-511 mặc định. Header + sub-text + trailing action.

| Variant | bg | border |
| --- | --- | --- |
| `default` | transparent | – |
| `outline` | transparent | `1px var(--border)` |
| `muted` | `--muted` | – |

| Size | Padding | Height |
| --- | --- | --- |
| `default` | `p-4` | 76 |
| `sm` | nhỏ hơn | 44 |

- Heading: `Text-sm/Medium` `--card-foreground`.
- Sub-text: `Text-sm/Regular` `--muted-foreground`.
- Trailing action: outline button `h-32 px-3 shadow-xs`.

Sub-frames: `Icon`, `Avatar`, `Image`, `Group`, `Header`, `Link`, `Dropdown`.

### 2.8 Sidebar

Wrapper: bg `--sidebar`, border `1px var(--sidebar-border)`, `--radius-lg`, `h-608`.

| State | Width | Bố cục |
| --- | --- | --- |
| `closed` | 48 | Icon-only menu, padding `p-2` |
| `open` | 255 | Header (logo 32 + workspace + chevrons) → section labels → menu items → sub-menu |

- Logo icon: 32 × 32, bg `--sidebar-primary`, `--radius-lg`, icon trắng 16.
- Section label: `Text-xs/Regular` `--sidebar-foreground opacity-70`, height 32, `px-2`.
- Menu button: `h-32 p-2 gap-2 --radius-lg`, text `Text-sm/Regular`.
- Sub menu: `px-3.5` (14), wrapper có `border-l 1px var(--sidebar-border)` (timeline visual), items `h-28 px-2`.
- Footer: avatar 32 + tên `Text-sm/Regular` + email `Text-xs/Regular`.

### 2.9 Switch

Track `w-44 h-24`, `--radius-lg`. Thumb 20 × 20, `--radius-lg`.

| State | track bg | thumb bg | thumb position |
| --- | --- | --- | --- |
| `off` | `--input` `#e5e5e5` | `--background` | `left-2 top-2` |
| `on`  | `--primary` `#171717` | `--primary-foreground` | `left-22 top-2` |

Label kèm bên phải: `ml-2` (8), `Text-sm/Medium` `--foreground`.

---

## 3. App Patterns (Chang screens)

### 3.1 TopBar — Mobile

- `h-64`, bg `--background`, `border-bottom 1px var(--border)`, width full (375 mobile).
- Padding `px-4` trái, `px-3` phải.
- Left (gap-2): menu icon 16 trong `28 × 28 px-2`, app icon 16, breadcrumb "Chang › ..." (`Text-sm/Regular`).
- Right (gap-2): plus icon `28 × 28 px-2`; bell + badge tròn `14 × 14` absolute top-right (bg `--primary`, text 10 `Text-xs/Medium` `--primary-foreground`); ellipsis `28 × 28` `--radius-lg` bg `--accent`.

### 3.2 Composer / Prompt Box

Float ở vị trí gần đáy (mobile: `top-582 left-8 w-359`, desktop max-w-768). Container bg `--background`, border `1px var(--border)`, `--radius-lg`, `shadow-xs`.

Cấu trúc 2 hàng:

```
┌────────────────────────────────────────────────┐
│  textarea  (placeholder "Nhắn cho Chang...")   │  ← h-64, p-3, Text-base/Regular muted
├────────────────────────────────────────────────┤
│ [+] [💡] [🔖]  │ @agent · /skill │ ⏎          │  ← pt-1.5 pb-3 px-3, gap-2
└────────────────────────────────────────────────┘
```

- Icon buttons `24 × 24` (plus có border, lightbulb/bookmark borderless): `lucide/plus`, `lucide/lightbulb`, `lucide/bookmark`.
- Divider dọc 16px giữa các nhóm (rotated 1px line).
- Center placeholder `@agent · /skill` — **font `JetBrains Mono Regular` 12 / 16**, `--muted-foreground`.
- Submit `24 × 24`, bg `--primary`, `--radius-lg`, `shadow-xs`, icon `lucide/corner-down-left` 14 trắng.

### 3.3 Sidebar — Desktop

Xem mục 2.8. Web 1440 × 1024 frame dùng sidebar `open` width 255 + body width 1185.

### 3.4 Mascot / Agent Avatar (Home)

- Circle `128 × 128`, `--radius-full`, border `1px var(--background)`.
- Absolute "ngồi" trên đầu hero card (top `-64`), overlap nửa trong/nửa ngoài.
- Dưới mascot: title `Chang nèe` (`Text-2xl/Semi Bold` 24 / 32 / 400 `--card-foreground`), subtitle `Chang giúp gì được cho anh không?` (`Text-sm/Regular` `--muted-foreground`).

### 3.5 Hero card (Home)

- bg `--card`, border `1px var(--border)`, `--radius-lg`, overflow-clip.
- Header image băng ngang `h-145` với gradient; trên đó logo "Chang" + `|` + "Digital Workforce Platform" (`Text-sm/Light` 14 / 20 / 300 trắng).
- Body: `pt-146 pb-16 px-16`, gap-10, wrap flex của quick-action chips.

### 3.6 Quick-action chip (Suggestion pill)

- `h-32`, `px-2.5` (10), `gap-1.5` (6), border `1px var(--border)`, `--radius-lg`, `shadow-xs`, bg `--background`.
- Icon lucide 16 + label `Text-sm/Medium` `--foreground`.
- Trong file Figma có sẵn: "Tra cứu Hợp đồng", "Clear Checklist", "Tra cứu Gói cước", "Lấy QR HTKH", "Xin nghỉ phép", "Lịch chiếu Film", "Báo cáo vấn đề đường truyền", "Thông tin thanh toán", "Tạo cuộc họp".

### 3.7 Divider with label

`flex items-center` — 2 đoạn `border-t 1px var(--border)` flex-1, chính giữa block text width 138 `px-2`. Text `Text-xs/Regular` uppercase muted, ví dụ "HOẶC XEM THÊM TẠI".

### 3.8 Action row buttons (2-col grid)

Pair button: 2 button flex-1, `h-32`, `gap-1.5`, `px-2.5`, border `1px var(--border)`, `--radius-lg`, `shadow-xs`, bg `--background`. Label `Text-sm/Medium`. Ví dụ "Gợi ý nhanh" / "Mẫu Prompt".

### 3.9 MessageBubble — chưa có spec riêng

Trong các leaf node được sample (Conversation mobile + Home), **không** thấy component MessageBubble độc lập — màn Conversation hiện chỉ có TopBar + body trống bg `--muted` + Composer. Khi cần dựng:

- Dùng `Item` variant `muted` làm base (bg `--muted`, `--radius-lg`, `Text-sm/Regular`).
- Phân biệt user / assistant bằng align (right / left) thay vì màu — Figma kit chưa định nghĩa khác biệt màu.
- Cần extract thêm node-id sâu hơn trong section Conversation khi designer hoàn thiện.

---

## 4. Icons

**Lucide** là bộ icon mặc định trong toàn bộ Figma kit. File cũng có 2 page tham chiếu phụ:

- `Tabler Icons` (node `642:97`) — tham khảo, không dùng.
- `Phosphor Icons` (node `1528:9`) — tham khảo, không dùng.

| Context | Size |
| --- | --- |
| TopBar / nav icons | 16 |
| Button icon (small/default) | 14–16 |
| Button icon (large) | 18 |
| Composer toolbar icons | 16 (icon button 24 × 24) |
| Item leading icon | 20–24 |
| Breadcrumb separator | 14 |

Stroke giữ default (`1.5`). Không dùng filled variant — kit là outline-only.

---

## 5. Pages & frame map

Các section/frame chính trong page main `3004:5236`:

| Section | Frame | Node ID | Size |
| --- | --- | --- | --- |
| **Login** | (section) | `3020:6359` | 2055 × 1224 |
| | Login — Mobile | `3004:5239` | 375 × 812 |
| | Login — Web | `3004:8484` | 1440 × 1024 |
| **Sidebar & Topbar** | (section) | `3035:16582` | 1548 × 1224 |
| | Sidebar — Mobile | `3035:16890` | 375 × 768 |
| | Notification Dropdown | `3048:800` | 350 × 416 |
| **Prompt Box** | (section) | `3035:17183` | 2584 × 940 |
| | Prompt Template | `3037:18138` | 768 × 720 |
| | Properties | `3037:18139` | 768 × 614 |
| **Home** | (section) | `3020:6360` | 3950 × 1224 |
| | Home — Mobile | `3020:6361` | 375 × 812 |
| | Home — Mobile (Full Menu) | `3033:13157` | 375 × 812 |
| | Sidebar — Mobile (Home) | `3035:17091` | 375 × 768 |
| | Home — Web (Full Menu) | `3020:6400` | 1440 × 1024 |
| | Home — Web (Mini Menu) | `3030:12644` | 1440 × 1024 |
| **Task Management** | (section) | `3048:1057` | 8000 × 1224 |
| **Agent Profile & Dashboard** | (section) | `3048:7518` | 3950 × 1224 |
| **User Profile & Dashboard** | (section) | `3048:7520` | 3950 × 1224 |
| **Conversation** | (section) | `3048:1899` | 3950 × 1224 |
| | Conversation — Mobile | `3048:1901` | 375 × 812 |
| | Conversation — Web | `3048:2064` | 1440 × 1024 |

---

## 6. Gaps & ghi chú so với code hiện tại

Phục vụ plan refactor sau:

1. **Font**: Figma `Noto Sans` — repo dùng `Inter Variable`. Bổ sung `JetBrains Mono` cho Composer placeholder.
2. **Primary color**: Figma `#171717` (zinc/black) — repo dùng `hsl(262 83% 58%)` (Violet 600). Đây là khác biệt visual lớn nhất.
3. **Radius scale**: Figma **chỉ** có `10px` + `full` — repo có 5 nấc `8 / 12 / 16 / 20 / 24 / 40px`. Cần thống nhất một radius.
4. **Dark mode**: Figma chưa export → giữ token dark hiện tại của repo cho tới khi Figma cập nhật.
5. **Chart palette**: Figma không có `chart-1…6` → đề xuất giữ palette repo nhưng map lại hue cho hợp tone zinc nếu refactor.
6. **Composer placeholder**: cần block riêng `@agent · /skill` font mono — hiện code chưa có.
7. **Frost / blur**: Figma không dùng backdrop-blur ở TopBar/Composer — chỉ border + shadow. Cần quyết định giữ hay bỏ `.frost` utility.
8. **MessageBubble**: Figma chưa thiết kế — chờ designer hoặc giữ pattern hiện tại của code.

Refactor sẽ làm theo plan riêng — không thay đổi code trong scope của file này.
