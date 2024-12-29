import { Trophy, User, Calendar, LinkIcon } from 'lucide-react';
import type { Battle } from '@/types/tables';
import { convertFriendlyMatchLabel, convertFriendlyTime } from '@/util/String';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BattleCardProps {
  battle: Battle;
}

export function BattleCard({ battle }: BattleCardProps) {
  return (
    <Card className="bg-black bg-opacity-70 shadow-lg card-hover border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-accent">
          {battle.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-gray-300">
        <p className="flex items-center">
          <Trophy className="mr-2 h-4 w-4 text-primary" />
          {battle.tournament_name}
        </p>
        <p className="flex items-center">
          <User className="mr-2 h-4 w-4 text-primary" />
          {convertFriendlyMatchLabel(battle)}
        </p>
        <p className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-primary" />
          {convertFriendlyTime(battle.length)}
        </p>
        <Button
          variant="link"
          className="p-0 h-auto text-accent hover:underline"
          asChild
        >
          <a href={battle.url} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="mr-2 h-4 w-4" />
            Watch Battle
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
