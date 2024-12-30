'use client';

import { Flame, Zap, Mic } from 'lucide-react';
import type { Battle } from '@/types/tables';

import type { JSX } from 'react';
import { BattleCard } from '@/components/elements/BattleCard';
import SelectBox from '@/components/elements/SelectBox';
import useBattleData from '@/hooks/useBattleData';

interface IndexPageProps {
  baseData: Battle[];
}

/**
 * IndexPageコンポーネント
 * @param {IndexPageProps} props - Battleの配列を含むprops
 * @returns {JSX.Element} JSX要素
 */
export default function Index({ baseData }: IndexPageProps): JSX.Element {
  // フィルタリングされたバトルの状態を管理
  const {
    battles,
    allMCsValues,
    allTournamentValues,
    handleMcChange,
    handleTournamentChange,
  } = useBattleData(baseData);

  return (
    <div className="container mx-auto px-4 py-16 gradient-bg min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-center neon-text">
        Lyrical Showdowns
      </h1>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <SelectBox
            onValueChange={handleMcChange}
            placeholder={'MC'}
            selectValues={allMCsValues}
            testIdPrefix={'MC'}
          />
          <div className="text-center font-bold text-2xl w-12 mx-2 vs-fire">
            VS
          </div>
          <SelectBox
            onValueChange={handleMcChange}
            placeholder={'MC'}
            selectValues={allMCsValues}
            testIdPrefix={'MC'}
          />
        </div>
        <SelectBox
          onValueChange={handleTournamentChange}
          placeholder={'Tournament'}
          selectValues={allTournamentValues}
          testIdPrefix={'Tournament'}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {battles.map((battle) => (
          <BattleCard key={battle.id} battle={battle} />
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <Flame className="text-red-500 h-6 w-6" />
        <Mic className="text-green-500 h-6 w-6" />
        <Zap className="text-purple-500 h-6 w-6" />
      </div>
    </div>
  );
}
