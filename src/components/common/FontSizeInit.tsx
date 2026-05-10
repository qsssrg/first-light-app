'use client';

import { useEffect } from 'react';
import { applyFontSize } from '@/lib/font-size';

/** Apply saved font-size preference on first render */
export function FontSizeInit() {
  useEffect(() => {
    applyFontSize();
  }, []);
  return null;
}
