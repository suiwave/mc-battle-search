import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import type { JSX } from 'react';

import IndexPage from '@/app/page';
import { convertFriendlyMatchLabel, convertFriendlyTime } from '@/util/String';

import { dummyBattles } from '../TestData/TestData';

const user = userEvent.setup();

beforeEach(() => {
  // honoのclientをspyしてモックデータを返却する
  // リクエストは3000のlocalhostサーバーが処理するので、フロントエンドの部分でmockする必要がある
  const spy = vi.spyOn(global, 'fetch');
  const mockResponse: Partial<Response> = {
    json: () => Promise.resolve(dummyBattles), // データを JSON として返す
    status: 200, // HTTPステータスコード
    ok: true, // ステータスが成功かどうか
  };
  spy.mockResolvedValue(mockResponse as Response);
});

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

const getComboboxByText = (text: string, index = 0) => {
  return screen
    .getAllByRole('combobox')
    .filter((element) => element.textContent === text)[index];
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

    it('大会フィルターが表示されていること', async () => {
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
      // 2つ存在する
      const mcFilter1 = getComboboxByText('MC', 0);
      expect(mcFilter1).toBeInTheDocument();

      const mcFilter2 = getComboboxByText('MC', 1);
      expect(mcFilter2).toBeInTheDocument();
    });

    describe('バトル一覧表示', () => {
      it('バトル情報が全量表示されていること', async () => {
        // 準備
        // 実行
        await renderServerComponent(IndexPage);

        // 検証
        // バトル情報が全て表示されていること
        for (const battle of dummyBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
          expect(screen.getByText(battle.tournament_name)).toBeInTheDocument();
          expect(
            screen.getByText(convertFriendlyTime(battle.length)),
          ).toBeInTheDocument();
          expect(
            screen.getByText(convertFriendlyMatchLabel(battle)),
          ).toBeInTheDocument();
        }
      });
    });
  });
  describe('バトルフィルター機能', () => {
    describe('大会によるフィルター機能', () => {
      it('大会でフィルターできること', async () => {
        // 準備
        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターをクリック
        const tournamentFilter = getComboboxByText('Tournament');
        await user.click(tournamentFilter);

        // 指定した大会名を選択
        const tournamentOption = screen.getByTestId(
          `Tournament-select-option-${dummyBattles[0].tournament_name}`,
        );
        await user.click(tournamentOption);

        // 検証
        const filteredBattles = dummyBattles.filter(
          (battle) =>
            battle.tournament_name === dummyBattles[0].tournament_name,
        );

        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByText('Watch Battle').length).toBe(
          filteredBattles.length,
        );
      });
      it('大会で全てを選択した場合、大会によるフィルターは解除されること', async () => {
        // 準備
        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターをクリック
        const tournamentFilter = getComboboxByText('Tournament');
        await user.click(tournamentFilter);

        // 指定した大会名を選択
        const tournamentOption = screen.getByTestId(
          `Tournament-select-option-${dummyBattles[0].tournament_name}`,
        );
        await user.click(tournamentOption);

        // 検証
        const filteredBattles = dummyBattles.filter(
          (battle) =>
            battle.tournament_name === dummyBattles[0].tournament_name,
        );

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByText('Watch Battle').length).toBe(
          filteredBattles.length,
        );

        // ここからALLを選択するパート
        // フィルターを選択
        await user.click(tournamentFilter);

        // "All" オプションを選択
        const allOption = screen.getByTestId('Tournament-select-option-all');
        await user.click(allOption);

        // 検証
        // 全てのバトル情報が表示されていること
        expect(screen.getAllByText('Watch Battle').length).toBe(
          dummyBattles.length,
        );
      });
    });

    describe('MCによるフィルター機能', () => {
      it('MCフィルター1が指定、2が全てで機能していること', async () => {
        // 準備
        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // MCフィルター1をクリック
        const mcFilter1 = getComboboxByText('MC', 0);
        await user.click(mcFilter1);

        // 指定したMC名を選択
        const mcOption1 = screen.getByTestId(
          `MC-select-option-${dummyBattles[0].mc1}`,
        );
        await user.click(mcOption1);

        // 検証
        const filteredBattles = dummyBattles.filter(
          (battle) => battle.mc1 === dummyBattles[0].mc1,
        );

        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByText('Watch Battle').length).toBe(
          filteredBattles.length,
        );
      });
      it.todo('MCフィルター1が全て、2が指定で機能していること', async () => {});
      it.todo('MCフィルター1が指定、2が指定で機能していること', async () => {});
    });

    describe('大会とMCによる同時フィルター機能', () => {
      describe('大会フィルターを指定した状態で動作すること', () => {
        it.todo(
          'MCフィルター1が指定、2が全てで機能していること',
          async () => {},
        );
        it.todo(
          'MCフィルター1が全て、2が指定で機能していること',
          async () => {},
        );
        it.todo(
          'MCフィルター1が指定、2が指定で機能していること',
          async () => {},
        );
      });
    });
  });
});
