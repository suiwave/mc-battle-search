import { useState } from 'react';

import type { Battle } from '@/types/tables';

export interface filterCondition {
  MCName1?: string;
  MCName2?: string;
  tournamentName?: string;
}

const defaultFilterCondition: filterCondition = {
  MCName1: 'all',
  MCName2: 'all',
  tournamentName: 'all',
};

/**
 * Battleデータを管理するカスタムフック
 * @returns {Battle[]} battleデータの配列
 */
const useBattleData = (baseData: Battle[]) => {
  const [battles, setBattles] = useState<Battle[]>(baseData);
  const [filterCondition, setFilterCondition] = useState<filterCondition>(
    defaultFilterCondition,
  );

  // MC名の配列を作成
  const allMCsValues = [{ name: 'All MCs', value: 'all' }];
  const uniqueMCsNames = Array.from(
    new Set([
      ...baseData.map((battle) => battle.mc1),
      // https://qiita.com/Yuma-Satake/items/d56ecd79f2cbf26c0222#is%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E5%A0%B4%E5%90%88
      ...baseData
        .map((battle) => battle.mc2)
        .filter((mc2): mc2 is string => mc2 !== null),
    ]),
  );

  for (const MCName of uniqueMCsNames) {
    allMCsValues.push({ name: MCName, value: MCName });
  }

  // 大会名の配列を作成
  const allTournamentValues = [{ name: 'All Tournaments', value: 'all' }];
  const uniqueTournamentNames = Array.from(
    new Set(baseData.map((battle) => battle.tournament_name)),
  );
  for (const TournamentName of uniqueTournamentNames) {
    allTournamentValues.push({ name: TournamentName, value: TournamentName });
  }

  // MC名/大会名でバトルをフィルタリング
  const handleSelectConditionChange = (selectedCondition: filterCondition) => {
    const condition = { ...filterCondition, ...selectedCondition };
    setFilterCondition(condition);

    let filteredBattles = baseData;
    if (condition.MCName1 !== 'all') {
      filteredBattles = filteredBattles.filter(
        (battle) =>
          battle.mc1 === condition.MCName1 || battle.mc2 === condition.MCName1,
      );
    }
    if (condition.MCName2 !== 'all') {
      filteredBattles = filteredBattles.filter(
        (battle) =>
          battle.mc1 === condition.MCName2 || battle.mc2 === condition.MCName2,
      );
    }
    if (condition.tournamentName !== 'all') {
      filteredBattles = filteredBattles.filter(
        (battle) => battle.tournament_name === condition.tournamentName,
      );
    }
    setBattles(filteredBattles);
  };

  return {
    battles,
    allMCsValues,
    allTournamentValues,
    handleSelectConditionChange,
  };
};

export default useBattleData;
