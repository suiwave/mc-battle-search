/**
 * サーバーコンポーネントをレンダリングするための関数。
 * サーバーコンポーネントのレンダリングは特殊なのでこの関数を使用する。
 * 
 * @param serverComponent - レンダリングするサーバーコンポーネントを返す非同期関数。
 * @returns レンダリングされたコンポーネント。
 * 
 * @see {@link https://azukiazusa.dev/blog/server-components-testing/}
 */
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import type { JSX } from 'react';

import * as battleService from "@/services/battle";
import type { Battle } from '@/types/tables';

import IndexPage from '@/app/page';

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
})


const renderServerComponent = async (serverComponent: () => Promise<JSX.Element>) => {
    const renderedComponent = await serverComponent()

    // 実行
    render(renderedComponent);
}

const getComboboxByText = (text: string) => {
    return screen.getAllByRole('combobox').filter((element) => element.textContent === text)[0];
};

describe('IndexPage', () => {
    describe('初期状態', () => {
        it('ヘッダーが表示されていること', async () => {
            // 準備
            // 実行
            await renderServerComponent(IndexPage);

            // 検証
            const heading = screen.getByRole('heading', { name: /Lyrical Showdowns/i });
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
                // モックデータ
                const mockBattles: Battle[] = [
                    {
                        "id": 1,
                        "length": 180,
                        "mc1": "MC Alpha",
                        "mc2": "MC Beta",
                        "mc3": null,
                        "mc4": null,
                        "mc5": null,
                        "mc6": null,
                        "title": "Alpha vs Beta - Semi Finals",
                        "tournament_name": "Ultimate Rap Battles 2024",
                        "url": "https://example.com/battles/1"
                    },
                    {
                        "id": 2,
                        "length": 210,
                        "mc1": "MC Gamma",
                        "mc2": "MC Delta",
                        "mc3": "MC Epsilon",
                        "mc4": null,
                        "mc5": null,
                        "mc6": null,
                        "title": "Triple Threat - Gamma, Delta, Epsilon",
                        "tournament_name": "Freestyle Masters",
                        "url": "https://example.com/battles/2"
                    },
                    {
                        "id": 3,
                        "length": 150,
                        "mc1": "MC Zeta",
                        "mc2": "MC Eta",
                        "mc3": "MC Theta",
                        "mc4": "MC Iota",
                        "mc5": null,
                        "mc6": null,
                        "title": "Team Battle - Zeta & Eta vs Theta & Iota",
                        "tournament_name": "Team Championship",
                        "url": "https://example.com/battles/3"
                    },
                    {
                        "id": 4,
                        "length": 200,
                        "mc1": "MC Kappa",
                        "mc2": null,
                        "mc3": null,
                        "mc4": null,
                        "mc5": null,
                        "mc6": null,
                        "title": "Kappa's Solo Freestyle",
                        "tournament_name": "Freestyle Open 2024",
                        "url": "https://example.com/battles/4"
                    },
                    {
                        "id": 5,
                        "length": 240,
                        "mc1": "MC Lambda",
                        "mc2": "MC Mu",
                        "mc3": "MC Nu",
                        "mc4": "MC Xi",
                        "mc5": "MC Omicron",
                        "mc6": "MC Pi",
                        "title": "Six-Way Battle Royale",
                        "tournament_name": "Ultimate Rap Battles 2024",
                        "url": "https://example.com/battles/5"
                    }
                ]

                // getAllBattlesをspyしてモックデータを返却する
                const spy = vi.spyOn(battleService, 'getAllBattles')
                spy.mockResolvedValue(mockBattles);

                // 実行
                await renderServerComponent(IndexPage);

                // 検証
                const battleResults = screen.getAllByRole('heading', { level: 2 });
                expect(battleResults.length).toBe(5);
            });
        });
    });
});
