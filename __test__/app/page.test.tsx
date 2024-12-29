
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import type { JSX } from 'react';

import IndexPage from '@/app/page';
import * as battleService from '@/services/battle';

import { dummyBattles } from '../TestData/TestData';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

/**
 * サーバーコンポーネントをレンダリングするための関数。
 * サーバーコンポーネントのレンダリングは特殊なのでこの関数を使用する。
 *
 * @param serverComponent - レンダリングするサーバーコンポーネントを返す非同期関数。
 * @returns レンダリングされたコンポーネント。
 *
 * @see {@link https://azukiazusa.dev/blog/server-components-testing/}
 */
const renderServerComponent = async (
  serverComponent: () => Promise<JSX.Element>,
) => {
  const renderedComponent = await serverComponent();

  render(renderedComponent);
};

const getComboboxByText = (text: string) => {
  return screen
    .getAllByRole('combobox')
    .filter((element) => element.textContent === text)[0];
};

describe('IndexPage', () => {
  describe('初期状態', () => {
    it('ヘッダーが表示されていること', async () => {
      // 準備
      // 実行
      await renderServerComponent(IndexPage);

      // 検証
      const heading = screen.getByRole('heading', {
        name: /Lyrical Showdowns/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('トーナメントフィルターが表示されていること', async () => {
      // 準備
      // 実行
      await renderServerComponent(IndexPage);

      // 検証
      const tournamentFilter = getComboboxByText('Tournament');
      expect(tournamentFilter).toBeInTheDocument();
    });

    it('MCフィルターが表示されていること', async () => {
      // 準備
      // 実行
      await renderServerComponent(IndexPage);

      // 検証
      const mcFilter = getComboboxByText('MC');
      expect(mcFilter).toBeInTheDocument();
    });

    describe('バトル結果表示', () => {
      it('バトル結果が全量表示されていること', async () => {
        // 準備
        // getAllBattlesをspyしてモックデータを返却する
        const spy = vi.spyOn(battleService, 'getAllBattles');
        spy.mockResolvedValue(dummyBattles);

        // 実行
        await renderServerComponent(IndexPage);

        // 検証
        const battleResults = screen.getAllByRole('heading', { level: 2 });
        expect(battleResults.length).toBe(dummyBattles.length);
      });
    });
  });
});
