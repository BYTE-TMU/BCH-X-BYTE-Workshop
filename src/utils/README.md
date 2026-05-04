# src/utils/

Shared utility functions that have no React dependencies.

---

## Files

### `cn.js`

Merges Tailwind class strings, filtering out falsy values.

```js
import { cn } from '../utils/cn'

cn('px-4 py-2', isActive && 'bg-brand-red', undefined)
// → 'px-4 py-2 bg-brand-red'
```

A lightweight alternative to `clsx` or `classnames` — no dependency needed at this scale.
