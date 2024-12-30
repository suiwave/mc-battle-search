import {
  cleanup,
  getByRole,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import type { JSX } from 'react';

import IndexPage from '@/app/page';
import { convertFriendlyMatchLabel, convertFriendlyTime } from '@/util/String';

import { dummyBattles } from '../TestData/TestData';
import {
  cardDataTestIdPrefix,
  RegexCardDataTestIdPrefix,
  type SelectCategory,
  selectDataTestIdPrefix,
} from '@/constants/constants';

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

/**
 * 指定したテキストのオプションをクリックする関数
 *
 * @param selectCategory - コンボボックスの種類
 * @param comboboxText - コンボボックスのテキスト
 * @param optionText - オプションのテキスト
 * @param comboboxIndex - コンボボックスのインデックス (デフォルトは0)
 */
const selectOption = async (
  selectCategory: SelectCategory,
  comboboxText: string,
  optionTestId: string,
  comboboxIndex = 0,
) => {
  const combobox = getComboboxByText(comboboxText, comboboxIndex);
  await user.click(combobox);

  const option = screen.getByTestId(
    `${selectDataTestIdPrefix[selectCategory]}${optionTestId}`,
  );
  await user.click(option);
};

const selectTournament = async (
  comboboxText: string,
  optionTestId: string,
  comboboxIndex = 0,
) => {
  await selectOption('Tournament', comboboxText, optionTestId, comboboxIndex);
};

const selectMC = async (
  comboboxText: string,
  optionTestId: string,
  comboboxIndex = 0,
) => {
  await selectOption('MC', comboboxText, optionTestId, comboboxIndex);
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
          const battleCard = screen.getByTestId(
            `${cardDataTestIdPrefix}${battle.title}`,
          );

          // カードがリンクになっていること
          expect(battleCard).toHaveAttribute('role', 'link');
          expect(battleCard.getAttribute('href')).toBe(battle.url);

          // タイトルが表示されていること
          expect(getByText(battleCard, battle.title)).toBeInTheDocument();

          // サムネイルが表示されていること
          expect(getByRole(battleCard, 'img')).toBeInTheDocument();

          // 大会名が表示されていること
          expect(
            getByText(battleCard, battle.tournament_name),
          ).toBeInTheDocument();

          // 時間が表示されていること
          expect(
            getByText(battleCard, convertFriendlyTime(battle.length)),
          ).toBeInTheDocument();

          // 登場MCが表示されていること
          expect(
            getByText(battleCard, convertFriendlyMatchLabel(battle)),
          ).toBeInTheDocument();
        }
      });
    });
  });
  describe('バトルフィルター機能', () => {
    describe('大会によるフィルター機能', () => {
      it('大会でフィルターできること', async () => {
        // 準備
        const filteredBattles = dummyBattles.filter(
          (battle) =>
            battle.tournament_name === dummyBattles[0].tournament_name,
        );

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターを操作
        await selectTournament('Tournament', dummyBattles[0].tournament_name);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
      it('大会で全てを選択した場合、大会によるフィルターは解除されること', async () => {
        // 準備
        const filteredBattles = dummyBattles.filter(
          (battle) =>
            battle.tournament_name === dummyBattles[0].tournament_name,
        );

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターを操作
        await selectTournament('Tournament', dummyBattles[0].tournament_name);

        // 検証
        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );

        // ここからALLを選択するパート
        // 大会フィルターを操作
        // 上で選択したやつからallへ変更する
        await selectTournament(dummyBattles[0].tournament_name, 'all');

        // 検証
        // 全てのバトル情報が表示されていること
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          dummyBattles.length,
        );
      });
    });

    describe('MCによるフィルター機能', () => {
      it('MCフィルター1が指定、2が全てで機能していること', async () => {
        // 準備
        const testMc1 = dummyBattles[0].mc1;

        const filteredBattles = dummyBattles.filter(
          (battle) => battle.mc1 === testMc1 || battle.mc2 === testMc1,
        );

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // MCフィルター1を操作
        await selectMC('MC', testMc1, 0);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
      it('MCフィルター1が全て、2が指定で機能していること', async () => {
        // 準備
        const testMc1 = dummyBattles[0].mc1;
        const filteredBattles = dummyBattles.filter(
          (battle) => battle.mc1 === testMc1 || battle.mc2 === testMc1,
        );

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // MCフィルター2を操作
        await selectMC('MC', testMc1);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
      it('MCフィルター1が指定、2が指定で機能していること', async () => {
        // 準備
        const testMc1 = dummyBattles[0].mc1;
        // biome-ignore lint/style/noNonNullAssertion: テストデータなのでnullチェックは不要
        const testMc2 = dummyBattles[0].mc2!;

        const filteredBattles = dummyBattles
          .filter((battle) => battle.mc1 === testMc1 || battle.mc2 === testMc1)
          .filter((battle) => battle.mc1 === testMc2 || battle.mc2 === testMc2);

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // MCフィルター1と2を同時に操作
        await selectMC('MC', testMc1);
        await selectMC('MC', testMc2);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
    });
  });

  describe('大会とMCによる同時フィルター機能', () => {
    describe('大会フィルターを指定した状態で動作すること', () => {
      it('MCフィルター1が指定、2が全てで機能していること', async () => {
        // 準備
        const testTournamentName = dummyBattles[0].tournament_name;
        const testMc1 = dummyBattles[0].mc1;

        const filteredBattles = dummyBattles
          .filter((battle) => battle.tournament_name === testTournamentName)
          .filter((battle) => battle.mc1 === testMc1 || battle.mc2 === testMc1);

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターを操作
        await selectTournament('Tournament', testTournamentName);

        // MCフィルター1を操作
        await selectMC('MC', testMc1);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
      it('MCフィルター1が全て、2が指定で機能していること', async () => {
        // 準備
        const testTournamentName = dummyBattles[0].tournament_name;
        const testMc2 = dummyBattles[0].mc1;

        const filteredBattles = dummyBattles
          .filter((battle) => battle.tournament_name === testTournamentName)
          .filter((battle) => battle.mc1 === testMc2 || battle.mc2 === testMc2);

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターを操作
        await selectTournament('Tournament', testTournamentName);

        // MCフィルター2を操作
        await selectMC('MC', testMc2, 1);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
      it('MCフィルター1が指定、2が指定で機能していること', async () => {
        // 準備
        const testTournamentName = dummyBattles[0].tournament_name;
        const testMc1 = dummyBattles[0].mc1;
        // biome-ignore lint/style/noNonNullAssertion: テストデータなのでnullチェックは不要
        const testMc2 = dummyBattles[0].mc2!;

        const filteredBattles = dummyBattles
          .filter((battle) => battle.tournament_name === testTournamentName)
          .filter((battle) => battle.mc1 === testMc1 || battle.mc2 === testMc1)
          .filter((battle) => battle.mc1 === testMc2 || battle.mc2 === testMc2);

        // 実行
        await renderServerComponent(IndexPage);

        // フィルターを選択
        // 大会フィルターを操作
        await selectTournament('Tournament', testTournamentName);

        // MCフィルター1と2を同時に操作
        await selectMC('MC', testMc1);
        await selectMC('MC', testMc2);

        // 検証
        // フィルタリングされたバトルが表示されていること
        for (const battle of filteredBattles) {
          expect(screen.getByText(battle.title)).toBeInTheDocument();
        }

        // フィルタリングされたバトル以外が表示されていないこと
        expect(screen.getAllByTestId(RegexCardDataTestIdPrefix).length).toBe(
          filteredBattles.length,
        );
      });
    });
  });
});
