/** VN背景定義 — CSSグラデーションベース（将来的に画像に差し替え可能） */

export interface VNBackground {
  id: string;
  label: string;
  /** CSS gradient for the main background */
  gradient: string;
  /** Optional accent overlay */
  overlay?: string;
  /** Image path (future use — takes precedence over gradient when set) */
  imagePath?: string;
}

export const VN_BACKGROUNDS: Record<string, VNBackground> = {
  studio: {
    id: 'studio',
    label: '練習スタジオ',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 30%, #3d2415 60%, #1a0e08 100%)',
    overlay: 'radial-gradient(ellipse at 30% 40%, rgba(255,180,80,0.12) 0%, transparent 60%)',
  },
  stage: {
    id: 'stage',
    label: 'ライブステージ',
    gradient: 'linear-gradient(180deg, #0a0a0f 0%, #111122 40%, #0d0d1a 100%)',
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(120,100,255,0.2) 0%, transparent 50%), radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 30%)',
  },
  street: {
    id: 'street',
    label: '路上',
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #b0d4e8 30%, #d4c5a0 70%, #8a8068 100%)',
    overlay: 'radial-gradient(ellipse at 50% 80%, rgba(255,220,150,0.15) 0%, transparent 60%)',
  },
  library: {
    id: 'library',
    label: '図書館',
    gradient: 'linear-gradient(135deg, #1a1510 0%, #2d2318 30%, #3a2e20 60%, #1a1510 100%)',
    overlay: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,100,0.1) 0%, transparent 50%)',
  },
  'practice-room': {
    id: 'practice-room',
    label: '練習室',
    gradient: 'linear-gradient(180deg, #1a1a2e 0%, #22223a 40%, #1a1a2e 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(100,140,255,0.08) 0%, transparent 60%)',
  },
  rooftop: {
    id: 'rooftop',
    label: '屋上',
    gradient: 'linear-gradient(180deg, #ff7e5f 0%, #feb47b 30%, #ffcf8a 60%, #e8d5b0 100%)',
    overlay: 'radial-gradient(circle at 70% 20%, rgba(255,255,200,0.2) 0%, transparent 40%)',
  },
  cafe: {
    id: 'cafe',
    label: 'カフェ',
    gradient: 'linear-gradient(135deg, #2c1f14 0%, #3e2c1e 30%, #4a3525 60%, #2c1f14 100%)',
    overlay: 'radial-gradient(ellipse at 40% 40%, rgba(255,200,120,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(255,180,80,0.08) 0%, transparent 30%)',
  },
  school: {
    id: 'school',
    label: '教室',
    gradient: 'linear-gradient(180deg, #f5f0e8 0%, #e8e0d0 40%, #d4c8b0 100%)',
    overlay: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
  },
};

export function getBackground(id: string): VNBackground {
  return VN_BACKGROUNDS[id] ?? VN_BACKGROUNDS['practice-room'];
}
