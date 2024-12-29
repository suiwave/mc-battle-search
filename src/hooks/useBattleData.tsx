import { useState } from 'react';

import type { Battle } from '@/types/tables';

/**
 * Battleデータを管理するカスタムフック
 * @returns {Battle[]} battleデータの配列
 */
const useBattleData = (baseData: Battle[]) => {
    const [battles, setBattles] = useState<Battle[]>(baseData);

    // 大会名の配列を作成
    const allTournamentValues = [{ name: 'All Tournaments', value: 'all' }];
    const uniqueTournamentNames = Array.from(
        new Set(baseData.map((battle) => battle.tournament_name)),
    );
    for (const TournamentName of uniqueTournamentNames) {
        allTournamentValues.push({ name: TournamentName, value: TournamentName });
    }

    // 大会名でバトルをフィルタリング
    const handleTournamentChange = (tournamentName: string) => {
        if (tournamentName === 'all') {
            setBattles(baseData);
        } else {
            setBattles(
                baseData.filter((battle) => battle.tournament_name === tournamentName),
            );
        }
    };
    return { battles, allTournamentValues, handleTournamentChange };
};

export default useBattleData;