import { describe, it, expect, vi, afterEach } from 'vitest';
import * as battleService from '@/services/battle';
import { getAllBattles } from '@/services/battle';
import type { Battle } from '@/types/tables';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('services/battle', () => {
  describe('getAllBattles()', () => {
    it('全てのバトルレコードが取得できること', async () => {
      // テストケース: battleレコードの全件取得
      const battles = await getAllBattles();
      expect(battles.length).toBeGreaterThan(0);
    });
  });
  describe('getAllBattles()をspyして任意のbattle配列を返却できること', () => {
    it('任意のbattle配列を返却する', async () => {
      // モックデータ
      const mockBattles: Battle[] = [
        {
          id: 1,
          length: 180,
          mc1: 'MC Alpha',
          mc2: 'MC Beta',
          mc3: null,
          mc4: null,
          mc5: null,
          mc6: null,
          title: 'Alpha vs Beta - Semi Finals',
          tournament_name: 'Ultimate Rap Battles 2024',
          url: 'https://example.com/battles/1',
        },
        {
          id: 2,
          length: 210,
          mc1: 'MC Gamma',
          mc2: 'MC Delta',
          mc3: 'MC Epsilon',
          mc4: null,
          mc5: null,
          mc6: null,
          title: 'Triple Threat - Gamma, Delta, Epsilon',
          tournament_name: 'Freestyle Masters',
          url: 'https://example.com/battles/2',
        },
        {
          id: 3,
          length: 150,
          mc1: 'MC Zeta',
          mc2: 'MC Eta',
          mc3: 'MC Theta',
          mc4: 'MC Iota',
          mc5: null,
          mc6: null,
          title: 'Team Battle - Zeta & Eta vs Theta & Iota',
          tournament_name: 'Team Championship',
          url: 'https://example.com/battles/3',
        },
        {
          id: 4,
          length: 200,
          mc1: 'MC Kappa',
          mc2: null,
          mc3: null,
          mc4: null,
          mc5: null,
          mc6: null,
          title: "Kappa's Solo Freestyle",
          tournament_name: 'Freestyle Open 2024',
          url: 'https://example.com/battles/4',
        },
        {
          id: 5,
          length: 240,
          mc1: 'MC Lambda',
          mc2: 'MC Mu',
          mc3: 'MC Nu',
          mc4: 'MC Xi',
          mc5: 'MC Omicron',
          mc6: 'MC Pi',
          title: 'Six-Way Battle Royale',
          tournament_name: 'Ultimate Rap Battles 2024',
          url: 'https://example.com/battles/5',
        },
      ];

      // getAllBattlesをspyしてモックデータを返却する
      const spy = vi.spyOn(battleService, 'getAllBattles');
      spy.mockResolvedValue(mockBattles);

      // テスト実行
      const battles = await getAllBattles();
      expect(battles).toEqual(mockBattles);
    });
  });
});
