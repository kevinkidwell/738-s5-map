export type SquareType = 'City' | 'Stronghold' | 'Trade Post';

export interface Square {
  id: number;
  region: number; // 0..8
  row: number;    // local row in region
  col: number;    // local col in region
  type: SquareType;
  level: number;  // 1..10
  current?: string;
  firstCapture?: string;
  firstCaptureDate?: string;
  dropDate?: string;
  finalCapture?: string;
}

export interface Alliance {
  name: string;
  baseColor: string; // hex
  shades?: string[]; // [shade1, shade2, shade3]
}

export type ShadeStage = 'First' | 'Final' | 'Current';

export interface ShadeRule {
  key: string; // e.g., 'City.First'
  shadeIndex: 0 | 1 | 2;
}
