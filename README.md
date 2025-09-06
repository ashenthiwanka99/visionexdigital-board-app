# Swimlane Dashboard (Next.js + dnd-kit + Zustand + Tailwind)

A pixel-perfect, responsive swimlane (kanban) dashboard built in Next.js.
It implements drag-and-drop between lanes, task persistence, JSON seeding, and live search.

---

## ✨ Features

* **Pixel-perfect UI** (TailwindCSS), responsive down to **768px**.
* **Swimlanes** grouped by task `status` (`todo`, `in-progress`, `approved`, `rejected`).
* **Drag & drop** with smooth reordering and cross-lane moves (dnd-kit).
* **State management** via **Zustand** with **persistence** (localStorage/sessionStorage).
* **Mock API** via local **`/data/tasks.json`** (auto-seed on first load).
* **Live search**: as you type, lanes filter tasks by title instantly.
* **Priority sorting**: within each lane, **High → Medium → Low** (with title tiebreaker).
* **Category colors** derived from **category name**, backed by CSS variables (no color in JSON).

---

## 🧰 Tech Stack

* **Next.js** (App Router, “use client” components)
* **TailwindCSS** (utility-first styling)
* **dnd-kit** (`@dnd-kit/core`, `@dnd-kit/sortable`) for drag and drop
* **Zustand** (`persist` middleware) for state + persistence
* **TypeScript**

---

## 📁 Project Structure (key files)

```
src/
  app/
    (main)/
      boards/
        layout.tsx
      page.tsx
    [...slug]/
      page.tsx
    favicon.ico
    globals.css
    layout.tsx

  components/
    kanban/
      KanbanBoard.tsx
      KanbanCard.tsx
      KanbanLane.tsx
      KanbanLaneHeader.tsx
      TaskCardDraggable.tsx
    layout/
      Header.tsx
      Sidebar.tsx
    project/
      ProjectHeader.tsx
    ui/
      AvatarStack.tsx
      CategoryLabel.tsx
      CustomHeaderButton.tsx
      CustomIconButton.tsx
      CustomIconText.tsx
      CustomImagePlaceholder.tsx
      CustomLabel.tsx
      CustomNotificationButton.tsx
      CustomPill.tsx
      CustomSearchInput.tsx
      CustomSidebarButton.tsx
      EditPill.tsx
      SidebarSection.tsx
      SidebarWorkspaceCard.tsx
      SvgIcon.tsx

  data/
    categoryColorRegistry.tsx
    kanbanLanesData.tsx
    sidebar.json
    sidebarIconRegistry.tsx
    tasks.json

  helpers/
    interface/
      IconInterface.tsx
      KanbanCardInterface.tsx
      LabelInterface.tsx
      SidebarInterface.tsx
      TaskInterface.tsx
    types/
      KanbanTypes.tsx
      LabelTypes.tsx
      TaskTypes.tsx

  hooks/
    usePersistedTasks.tsx
    useProjectHeader.tsx
    useSidebar.tsx
    useSportXiKanban.tsx

  images/

  store/
    useMetaStore.tsx
    useSearchStore.tsx
    useSidebarStore.tsx
    useTaskStore.tsx

  utils/
    Helpers.tsx
    TaskStoreInitializer.tsx
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js ≥ 18**
* **npm** (recommended) or **pnpm** / **yarn**

### Install

```bash
npm install
# or
pnpm install
```

### Run in dev

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build & start

```bash
npm build && npm start
# or
pnpm run build && pnpm run start
```

---

## 🔍 How It Works

### 1) Task State (Zustand + persistence)

* Store: `useTaskStore.ts`

  * Shape: `tasks: Record<LaneId, Task[]>`
  * Actions: `setAll(list)`, `moveTask(taskId, toLane, toIndex?)`, `reorderWithin(lane, from, to)`
  * **Persisted** via `persist(createJSONStorage(() => localStorage))` under key **`kanban-tasks-v1`**.

* **Seeding**: `usePersistedTasks.ts`

  * Waits for Zustand **hydration**; if no tasks persisted, loads from **`/data/tasks.json`** exactly once.
  * Requires `tsconfig.json` to enable `"resolveJsonModule": true` for JSON imports.

### 2) Drag & Drop (dnd-kit)

* `KanbanBoard.tsx` sets up:

  * `DndContext` with `PointerSensor` + `KeyboardSensor`
  * `DragOverlay` for smooth preview while dragging
  * Handlers:

    * `onDragOver`: move to end of target lane when hovering a lane
    * `onDragEnd`: reorder in-lane or insert into new lane at drop index

* `KanbanLane.tsx`:

  * `SortableContext` + `verticalListSortingStrategy`
  * Each `KanbanCard` is wrapped by `TaskCardDraggable`

### 3) Live Search

* Store: `useSearchStore.ts`

  * `query` string, persisted in **`sessionStorage`** as **`kanban-search-v1`** (switchable to localStorage).
* `CustomSearchInput.tsx`:

  * Controlled input wired to the store.
* `KanbanLane.tsx`:

  * Hook `useLaneTasksFilteredAndSorted()` filters by `(t.title).toLowerCase().includes(query)` then sorts by priority.

### 4) Priority Sorting

* In `KanbanLane.tsx`:

  * `High → 0`, `Medium → 1`, `Low/unknown → 2`
  * If equal, fall back to `title.localeCompare()`

### 5) Category Colors (no color in JSON)

* `data/categoryColorRegistry.ts` maps **category name → Tailwind class** that uses CSS variables:

  * `"Reserch"` → `bg-[var(--color-green-500)]`
  * `"Design"` → `bg-[var(--color-red-500)]`
  * `"Other"` → `bg-[var(--color-grey-500)]`
  * `"Feedback"` → `bg-[var(--color-primary-500)]`
  * `"Presentation"` → `bg-[var(--color-orange-500)]`
  * `"Interface"` → `bg-[var(--color-darkgrey-500)]`
  * `"UX Reserch"` → `bg-[var(--color-yellow-500)]`

* `normalizeCategory(name)` safely handles case/typos (`Reserch/Research`, `UX Reserch/UX Research`, etc.).

* `getCategoryBg(name)` returns the **Tailwind class** used by `CategoryLabel`.

### 6) CSS Variables

Ensure your tokens live under `:root` in `styles/globals.css`:

```css
:root {
  --color-primary-500: #3772ff;
  --color-primary-100: #cdddfd;
  --color-orange-500: #ff5c00;
  --color-yellow-500: #ffa800;
  --color-green-500: #aee753;
  --color-green-600: #4b6029;
  --color-grey-500: #777e90;
  --color-darkgrey-500: #353945;
  --color-red-500: #f90430;
  --color-white-500: #ffffff;
}
```

---

## 🧪 Quick Manual Test Plan

1. **Boot & seed**

   * First run: tasks appear from `/data/tasks.json`.
   * Reload: tasks persist (localStorage).

2. **Drag & drop**

   * Drag a card to another lane → it moves; `status` updates.
   * Reorder within a lane.

3. **Search**

   * Type in header search → only matching cards remain visible, across all lanes.
   * Clear query → all cards return.

4. **Priority sorting**

   * Within a lane, High cards sit above Medium, which sit above Low.

5. **Responsive**

   * Resize to 768px: content remains legible; lanes scroll horizontally.

6. **Category colors**

   * Ensure each category square uses the correct color (no color in JSON).

---

## 🔧 Configuration & Tips

* **Switch search persistence** to localStorage:

  * In `useSearchStore.ts`, change:

    ```ts
    storage: createJSONStorage(() => localStorage)
    ```

* **Reset stored data** in DevTools console:

  ```js
  localStorage.removeItem('kanban-tasks-v1');      // tasks
  sessionStorage.removeItem('kanban-search-v1');   // search query
  ```

  Reload to re-seed from `/data/tasks.json`.

* **Add a new category**:

  1. Add mapping in `categoryColorRegistry.ts`.
  2. Extend `normalizeCategory()` to route aliases to your new key.

---

## 📦 Scripts

```bash
npm dev        # start dev server
npm build      # production build
npm start      # run production
npm lint       # (if configured) lint the codebase
```

## 📄 License

MIT — do whatever makes you happy.
