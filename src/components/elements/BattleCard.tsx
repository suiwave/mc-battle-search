import Link from 'next/link';
import Image from 'next/image';

import { Trophy, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import type { Battle } from '@/types/tables';
import { convertFriendlyMatchLabel, convertFriendlyTime } from '@/util/String';
import { generateThumbnailUrl } from '@/util/Url';
import { cardDataTestIdPrefix } from '@/constants/constants';

interface BattleCardProps {
  battle: Battle;
}

export function BattleCard({ battle }: BattleCardProps) {
  return (
    <Link
      href={battle.url}
      passHref
      data-testid={`${cardDataTestIdPrefix}${battle.title}`}
      // biome-ignore lint/a11y/useSemanticElements: Link は a タグのラッパーとして使われているため問題なし
      role="link"
    >
      <Card className="bg-black bg-opacity-70 shadow-lg card-hover border-primary/20 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-accent">
            {battle.title}
          </CardTitle>
        </CardHeader>
        <div className="w-full aspect-video relative">
          <Image
            src={generateThumbnailUrl(battle.url)}
            alt={`Thumbnail for ${battle.title}`}
            width={640}
            height={480}
          />
          <div className="absolute bottom-12 right-2 bg-black/75 px-2 py-1 rounded text-sm text-white font-medium">
            {convertFriendlyTime(battle.length)}
          </div>
        </div>
        <CardContent className="space-y-2 text-gray-300 mt-4">
          <p className="flex items-center">
            <Trophy className="mr-2 h-4 w-4 text-primary" />
            {battle.tournament_name}
          </p>
          <p className="flex items-center">
            <User className="mr-2 h-4 w-4 text-primary" />
            {convertFriendlyMatchLabel(battle)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
