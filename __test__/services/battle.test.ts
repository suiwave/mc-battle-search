import { describe, it, expect } from 'vitest';
import { getAllBattles } from '../../src/services/battle';

describe('services/battle', () => {
    describe('getAllBattles()', () => {
        it('全てのバトルレコードが取得できること', async () => {
            // テストケース: battleレコードの全件取得
            const battles = await getAllBattles();
            expect(battles.length).toBeGreaterThan(0);
        });
    });
});