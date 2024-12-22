import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Mic, Flame, Zap } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen gradient-bg">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 neon-text">
          Underground Lyrical Arena
        </h1>
        <p className="text-xl text-purple-300">
          Where words ignite and legends are forged
        </p>
      </div>
      <div className="w-full max-w-md space-y-6 bg-black bg-opacity-70 p-8 rounded-lg shadow-lg border border-primary/20">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search battles..."
            className="mature-input pl-10"
          />
          <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
        </div>
        <Select>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="Select tournament" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tournaments</SelectItem>
            <SelectItem value="midnight-cipher">Midnight Cipher</SelectItem>
            <SelectItem value="verbal-vendetta">Verbal Vendetta</SelectItem>
            <SelectItem value="lyrical-labyrinth">Lyrical Labyrinth</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="Select MC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All MCs</SelectItem>
            <SelectItem value="mc1">Cipher Slinger</SelectItem>
            <SelectItem value="mc2">Verbal Assassin</SelectItem>
            <SelectItem value="mc3">Rhyme Reaper</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="mature-input">
            <SelectValue placeholder="Select round" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rounds</SelectItem>
            <SelectItem value="final">Grand Finale</SelectItem>
            <SelectItem value="semifinal">Penultimate Clash</SelectItem>
            <SelectItem value="quarterfinal">Elite Eight</SelectItem>
            <SelectItem value="firstround">Opening Salvo</SelectItem>
          </SelectContent>
        </Select>
        <Link href="/results" className="w-full">
          <Button className="w-full mature-button">Ignite the Battle</Button>
        </Link>
      </div>
      <div className="mt-12 flex justify-center space-x-4">
        <Flame className="text-red-500 h-6 w-6" />
        <Zap className="text-purple-500 h-6 w-6" />
      </div>
    </div>
  );
}
