/** VN背景定義 — CSSグラデーション + 画像 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export interface VNBackground {
  id: string;
  label: string;
  /** CSS gradient for the main background */
  gradient: string;
  /** Optional accent overlay */
  overlay?: string;
  /** Image path — takes precedence over gradient when set */
  imagePath?: string;
  /** Mobile-specific image (9:16) */
  mobileImagePath?: string;
  /** Desktop-specific image (16:9) */
  desktopImagePath?: string;
}

export const VN_BACKGROUNDS: Record<string, VNBackground> = {
  studio: {
    id: 'studio',
    label: '練習スタジオ',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 30%, #3d2415 60%, #1a0e08 100%)',
    overlay: 'radial-gradient(ellipse at 30% 40%, rgba(255,180,80,0.12) 0%, transparent 60%)',
    imagePath: `${basePath}/backgrounds/desktop/studio.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/studio.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/studio.png`,
  },
  stage: {
    id: 'stage',
    label: 'ライブステージ',
    gradient: 'linear-gradient(180deg, #0a0a0f 0%, #111122 40%, #0d0d1a 100%)',
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(120,100,255,0.2) 0%, transparent 50%), radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 30%)',
    imagePath: `${basePath}/backgrounds/desktop/stage.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/stage.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/stage.png`,
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
    imagePath: `${basePath}/backgrounds/desktop/library.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/library.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/library.png`,
  },
  'practice-room': {
    id: 'practice-room',
    label: '練習室',
    gradient: 'linear-gradient(180deg, #1a1a2e 0%, #22223a 40%, #1a1a2e 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(100,140,255,0.08) 0%, transparent 60%)',
    imagePath: `${basePath}/backgrounds/desktop/practice-room.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/practice-room.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/practice-room.png`,
  },
  rooftop: {
    id: 'rooftop',
    label: '屋上',
    gradient: 'linear-gradient(180deg, #ff7e5f 0%, #feb47b 30%, #ffcf8a 60%, #e8d5b0 100%)',
    overlay: 'radial-gradient(circle at 70% 20%, rgba(255,255,200,0.2) 0%, transparent 40%)',
    imagePath: `${basePath}/backgrounds/desktop/rooftop.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/rooftop.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/rooftop.png`,
  },
  cafe: {
    id: 'cafe',
    label: 'カフェ',
    gradient: 'linear-gradient(135deg, #2c1f14 0%, #3e2c1e 30%, #4a3525 60%, #2c1f14 100%)',
    overlay: 'radial-gradient(ellipse at 40% 40%, rgba(255,200,120,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(255,180,80,0.08) 0%, transparent 30%)',
    imagePath: `${basePath}/backgrounds/desktop/cafe.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/cafe.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/cafe.png`,
  },
  school: {
    id: 'school',
    label: '教室',
    gradient: 'linear-gradient(180deg, #f5f0e8 0%, #e8e0d0 40%, #d4c8b0 100%)',
    overlay: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
  },
  'night-street': {
    id: 'night-street',
    label: '夜の街',
    gradient: 'linear-gradient(180deg, #0a0a1a 0%, #0f1028 20%, #151535 50%, #1a1a30 70%, #222240 100%)',
    overlay: 'radial-gradient(ellipse at 50% 80%, rgba(255,200,100,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(100,150,255,0.05) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(255,100,100,0.03) 0%, transparent 25%)',
    imagePath: `${basePath}/backgrounds/night-street.jpg`,
    mobileImagePath: `${basePath}/backgrounds/mobile/night-street.jpg`,
    desktopImagePath: `${basePath}/backgrounds/desktop/night-street.jpg`,
  },
  'night-street-limousine': {
    id: 'night-street-limousine',
    label: '夜の街・リムジン',
    gradient: 'linear-gradient(180deg, #0a0a1a 0%, #0f1028 20%, #151535 50%, #1a1a30 100%)',
    overlay: 'radial-gradient(ellipse at 50% 70%, rgba(255,220,150,0.15) 0%, transparent 40%), radial-gradient(circle at 50% 60%, rgba(255,255,200,0.1) 0%, transparent 20%)',
    imagePath: `${basePath}/backgrounds/night-street-limousine.jpg`,
    mobileImagePath: `${basePath}/backgrounds/mobile/night-street-limousine.jpg`,
    desktopImagePath: `${basePath}/backgrounds/desktop/night-street-limousine.jpg`,
  },
  'practice-studio': {
    id: 'practice-studio',
    label: '練習スタジオ',
    gradient: 'linear-gradient(180deg, #2a2015 0%, #3d2e20 30%, #4a3828 60%, #2a2015 100%)',
    overlay: 'radial-gradient(ellipse at 40% 40%, rgba(255,200,120,0.1) 0%, transparent 50%)',
    imagePath: `${basePath}/backgrounds/practice-studio.jpg`,
    mobileImagePath: `${basePath}/backgrounds/mobile/practice-studio.jpg`,
    desktopImagePath: `${basePath}/backgrounds/desktop/practice-studio.jpg`,
  },
  'limousine-interior': {
    id: 'limousine-interior',
    label: 'リムジン車内',
    gradient: 'linear-gradient(180deg, #0d0d14 0%, #151520 20%, #1a1825 50%, #12101a 100%)',
    overlay: 'radial-gradient(ellipse at 50% 60%, rgba(180,160,120,0.08) 0%, transparent 50%), radial-gradient(circle at 30% 30%, rgba(200,180,140,0.06) 0%, transparent 30%), radial-gradient(circle at 70% 40%, rgba(255,220,150,0.04) 0%, transparent 25%)',
    imagePath: `${basePath}/backgrounds/desktop/limousine-interior.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/limousine-interior.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/limousine-interior.png`,
  },
  'live-venue-backstage': {
    id: 'live-venue-backstage',
    label: '配信会場・袖裏',
    gradient: 'linear-gradient(180deg, #0a0a12 0%, #121225 30%, #0d0d20 60%, #08081a 100%)',
    overlay: 'radial-gradient(ellipse at 60% 40%, rgba(100,120,255,0.12) 0%, transparent 40%), radial-gradient(circle at 30% 70%, rgba(255,100,150,0.06) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 20%)',
    imagePath: `${basePath}/backgrounds/desktop/live-venue-backstage.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/live-venue-backstage.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/live-venue-backstage.png`,
  },
  'reception-room': {
    id: 'reception-room',
    label: '応接室',
    gradient: 'linear-gradient(180deg, #1a1510 0%, #2a2015 20%, #352a1e 50%, #2a2015 80%, #1a1510 100%)',
    overlay: 'radial-gradient(ellipse at 40% 30%, rgba(255,210,140,0.12) 0%, transparent 40%), radial-gradient(circle at 70% 50%, rgba(220,180,120,0.08) 0%, transparent 30%), radial-gradient(ellipse at 50% 80%, rgba(180,140,80,0.06) 0%, transparent 40%)',
  },
  'stylish-office': {
    id: 'stylish-office',
    label: '芸能オフィス',
    gradient: 'linear-gradient(180deg, #f0ebe5 0%, #e8e0d5 30%, #d4ccc0 60%, #c8bfb0 100%)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(255,240,220,0.15) 0%, transparent 50%)',
    imagePath: `${basePath}/backgrounds/office.jpg`,
    mobileImagePath: `${basePath}/backgrounds/mobile/office.jpg`,
    desktopImagePath: `${basePath}/backgrounds/desktop/office.jpg`,
  },
  'president-office': {
    id: 'president-office',
    label: '社長室',
    gradient: 'linear-gradient(180deg, #1a1510 0%, #2a2015 30%, #352a1e 60%, #1a1510 100%)',
    overlay: 'radial-gradient(ellipse at 50% 40%, rgba(200,170,120,0.1) 0%, transparent 50%)',
    imagePath: `${basePath}/backgrounds/desktop/president-office.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/president-office.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/president-office.png`,
  },
  'tv-studio-jp': {
    id: 'tv-studio-jp',
    label: 'テレビスタジオ（国内）',
    gradient: 'linear-gradient(180deg, #0a0a14 0%, #151530 30%, #1a1a40 60%, #0a0a14 100%)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(255,200,100,0.15) 0%, transparent 40%), radial-gradient(circle at 30% 60%, rgba(100,150,255,0.08) 0%, transparent 30%)',
    imagePath: `${basePath}/backgrounds/desktop/tv-studio-jp.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/tv-studio-jp.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/tv-studio-jp.png`,
  },
  'press-room': {
    id: 'press-room',
    label: '記者会見場',
    gradient: 'linear-gradient(180deg, #f0ebe5 0%, #e8e0d5 30%, #d4ccc0 60%, #c8bfb0 100%)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    imagePath: `${basePath}/backgrounds/desktop/press-room.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/press-room.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/press-room.png`,
  },
  'airport-hotel': {
    id: 'airport-hotel',
    label: '空港ホテル',
    gradient: 'linear-gradient(180deg, #1a1a2e 0%, #22223a 30%, #2a2a48 60%, #1a1a2e 100%)',
    overlay: 'radial-gradient(ellipse at 60% 40%, rgba(200,180,140,0.1) 0%, transparent 50%)',
    imagePath: `${basePath}/backgrounds/desktop/airport-hotel.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/airport-hotel.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/airport-hotel.png`,
  },
  'festival-stage': {
    id: 'festival-stage',
    label: 'フェスティバルステージ',
    gradient: 'linear-gradient(180deg, #0a0a1a 0%, #111128 20%, #151540 50%, #0a0a1a 100%)',
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(255,100,200,0.15) 0%, transparent 40%), radial-gradient(circle at 30% 50%, rgba(100,200,255,0.1) 0%, transparent 30%)',
    imagePath: `${basePath}/backgrounds/desktop/festival-stage.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/festival-stage.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/festival-stage.png`,
  },
  'tv-studio': {
    id: 'tv-studio',
    label: 'テレビスタジオ（海外）',
    gradient: 'linear-gradient(180deg, #0a0a14 0%, #151530 30%, #1a1a40 60%, #0a0a14 100%)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(255,220,150,0.12) 0%, transparent 40%)',
    imagePath: `${basePath}/backgrounds/desktop/tv-studio.png`,
    mobileImagePath: `${basePath}/backgrounds/mobile/tv-studio.png`,
    desktopImagePath: `${basePath}/backgrounds/desktop/tv-studio.png`,
  },
};

export function getBackground(id: string): VNBackground {
  return VN_BACKGROUNDS[id] ?? VN_BACKGROUNDS['practice-room'];
}
