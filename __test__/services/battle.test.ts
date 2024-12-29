import { describe, it, expect, vi, afterEach } from 'vitest';
import * as battleService from '@/services/battle';
import { getAllBattles } from '@/services/battle';
import { dummyBattles } from '../TestData/TestData';

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
      // getAllBattlesをspyしてモックデータを返却する
      const spy = vi.spyOn(battleService, 'getAllBattles');
      spy.mockResolvedValue(dummyBattles);

      // テスト実行
      const battles = await getAllBattles();
      expect(battles).toEqual(dummyBattles);
    });
  });
});
