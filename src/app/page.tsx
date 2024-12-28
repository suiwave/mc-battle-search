'use client';

import { useState, } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  MapPin,
  Trophy,
  User,
  Target,
  Flame,
  Zap,
  Mic,
} from 'lucide-react';

type BattleResult = {
  id: number;
  title: string;
  date: string;
  venue: string;
  tournament: string;
  mc: string;
  round: string;
};

type Filters = {
  tournament: string;
  mc: string;
  round: string;
};

const mockResults: BattleResult[] = [
  {
    id: 1,
    title: 'Verbal Armageddon',
    date: '2023-06-15',
    venue: 'The Catacombs',
    tournament: 'Midnight Cipher',
    mc: 'Cipher Slinger',
    round: 'Grand Finale',
  },
  {
    id: 2,
    title: 'Lyrical Warzone',
    date: '2023-07-01',
    venue: 'Neon Alley',
    tournament: 'Verbal Vendetta',
    mc: 'Verbal Assassin',
    round: 'Penultimate Clash',
  },
  {
    id: 3,
    title: 'Rhyme or Die',
    date: '2023-07-10',
    venue: 'The Pit',
    tournament: 'Lyrical Labyrinth',
    mc: 'Rhyme Reaper',
    round: 'Elite Eight',
  },
];

export default function IndexPage() {
  const [filteredResults, setFilteredResults] =
    useState<BattleResult[]>(mockResults);
  const [filters, setFilters] = useState<Filters>({
    tournament: 'all',
    mc: 'all',
    round: 'all',
  });
  const [searchTerm] = useState<string>('');

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };

  const applyFilters = (currentFilters: Filters, term: string) => {
    const results = mockResults.filter(
      (result) =>
        (currentFilters.tournament === 'all' ||
          result.tournament === currentFilters.tournament) &&
        (currentFilters.mc === 'all' || result.mc === currentFilters.mc) &&
        (currentFilters.round === 'all' ||
          result.round === currentFilters.round) &&
        (result.title.toLowerCase().includes(term.toLowerCase()) ||
          result.venue.toLowerCase().includes(term.toLowerCase())),
    );
    setFilteredResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-16 gradient-bg min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-center neon-text">
        Lyrical Showdowns
      </h1>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          onValueChange={(value) => handleFilterChange('tournament', value)}
        >
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
        <Select onValueChange={(value) => handleFilterChange('mc', value)}>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="MC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All MCs</SelectItem>
            <SelectItem value="Cipher Slinger">Cipher Slinger</SelectItem>
            <SelectItem value="Verbal Assassin">Verbal Assassin</SelectItem>
            <SelectItem value="Rhyme Reaper">Rhyme Reaper</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('round', value)}>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="Round" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rounds</SelectItem>
            <SelectItem value="Grand Finale">Grand Finale</SelectItem>
            <SelectItem value="Penultimate Clash">Penultimate Clash</SelectItem>
            <SelectItem value="Elite Eight">Elite Eight</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg card-hover border border-primary/20"
          >
            <h2 className="text-2xl font-semibold mb-4 text-accent">
              {result.title}
            </h2>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-primary" /> {result.date}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-primary" /> {result.venue}
              </p>
              <p className="flex items-center">
                <Trophy className="mr-2 h-4 w-4 text-primary" />{' '}
                {result.tournament}
              </p>
              <p className="flex items-center">
                <User className="mr-2 h-4 w-4 text-primary" /> {result.mc}
              </p>
              <p className="flex items-center">
                <Target className="mr-2 h-4 w-4 text-primary" /> {result.round}
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
