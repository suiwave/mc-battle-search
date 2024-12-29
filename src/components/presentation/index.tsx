'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Trophy, User, Flame, Zap, Mic, LinkIcon } from 'lucide-react';
import type { Battle } from '@/types/tables';



const getMCs = (battle: Battle): string[] => {
  return [battle.mc1, battle.mc2, battle.mc3, battle.mc4, battle.mc5, battle.mc6].filter((mc): mc is string => mc !== null);
};
import type { JSX } from 'react';

interface IndexPageProps {
  battles: Battle[];
}

/**
 * IndexPageコンポーネント
 * @param {IndexPageProps} props - Battleの配列を含むprops
 * @returns {JSX.Element} JSX要素
 */
export default function Index({ battles }: IndexPageProps): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-16 gradient-bg min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-center neon-text">
        Lyrical Showdowns
      </h1>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="Tournament" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tournaments</SelectItem>
            <SelectItem value="Midnight Cipher">Midnight Cipher</SelectItem>
            <SelectItem value="Verbal Vendetta">Verbal Vendetta</SelectItem>
            <SelectItem value="Lyrical Labyrinth">Lyrical Labyrinth</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="MC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All MCs</SelectItem>
            <SelectItem value="Cipher Slinger">Cipher Slinger</SelectItem>
            <SelectItem value="Verbal Assassin">Verbal Assassin</SelectItem>
            <SelectItem value="Rhyme Reaper">Rhyme Reaper</SelectItem>
            <SelectItem value="Lyrical Genius">Lyrical Genius</SelectItem>
            <SelectItem value="Flow Master">Flow Master</SelectItem>
            <SelectItem value="Word Wizard">Word Wizard</SelectItem>
            <SelectItem value="Rhythm Rebel">Rhythm Rebel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {battles.map((battle) => (
          <div
            key={battle.id}
            className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg card-hover border border-primary/20"
          >
            <h2 className="text-2xl font-semibold mb-4 text-accent">
              {battle.title}
            </h2>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Trophy className="mr-2 h-4 w-4 text-primary" /> {battle.tournament_name}
              </p>
              <p className="flex items-center">
                <User className="mr-2 h-4 w-4 text-primary" /> {getMCs(battle).join(' vs ')}
              </p>
              <p className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-primary" /> {Math.floor(battle.length / 60)}:{(battle.length % 60).toString().padStart(2, '0')}
              </p>
              <p className="flex items-center">
                <LinkIcon className="mr-2 h-4 w-4 text-primary" />
                <a href={battle.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Watch Battle
                </a>
              </p>
            </div>
          </div>
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