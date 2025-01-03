import type { Battle } from '@/types/tables';

export const dummyBattles: Battle[] = [
  // MC Alphaが複数の対戦相手と対戦
  {
    id: 1,
    length: 180,
    mc1: 'MC Alpha',
    mc2: 'MC Beta',
    title: 'Alpha vs Beta - Semi Finals',
    tournament_name: 'Ultimate Rap Battles 2024',
    url: 'https://youtu.be/feSVtC1BSeQ?feature=shared',
  },
  {
    id: 2,
    length: 210,
    mc1: 'MC Alpha',
    mc2: 'MC Gamma',
    title: 'Alpha vs Gamma - Quarter Finals',
    tournament_name: 'Ultimate Rap Battles 2024',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },
  {
    id: 3,
    length: 195,
    mc1: 'MC Beta',
    mc2: 'MC Alpha',
    title: 'Beta vs Alpha - Finals Rematch',
    tournament_name: 'Freestyle Masters',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },

  // MC Betaが別の対戦相手と対戦
  {
    id: 4,
    length: 200,
    mc1: 'MC Beta',
    mc2: 'MC Delta',
    title: 'Beta vs Delta - Group Stage',
    tournament_name: 'Freestyle Masters',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },
  {
    id: 5,
    length: 220,
    mc1: 'MC Gamma',
    mc2: 'MC Beta',
    title: 'Gamma vs Beta - Elimination Round',
    tournament_name: 'Underground League',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },

  // MC GammaとDeltaの対戦
  {
    id: 6,
    length: 185,
    mc1: 'MC Gamma',
    mc2: 'MC Delta',
    title: 'Gamma vs Delta - Championship',
    tournament_name: 'Underground League',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },
  {
    id: 7,
    length: 230,
    mc1: 'MC Delta',
    mc2: 'MC Gamma',
    title: 'Delta vs Gamma - Revenge Match',
    tournament_name: 'Street Battles 2024',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },

  // 異なる大会での対戦
  {
    id: 8,
    length: 175,
    mc1: 'MC Alpha',
    mc2: 'MC Delta',
    title: 'Alpha vs Delta - Cross League Battle',
    tournament_name: 'Street Battles 2024',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },
  {
    id: 9,
    length: 190,
    mc1: 'MC Beta',
    mc2: 'MC Gamma',
    title: 'Beta vs Gamma - All Stars Match',
    tournament_name: 'All Star Championship',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },
  {
    id: 10,
    length: 205,
    mc1: 'MC Delta',
    mc2: 'MC Alpha',
    title: 'Delta vs Alpha - Season Opener',
    tournament_name: 'All Star Championship',
    url: 'https://www.youtube.com/watch?v=feSVtC1BSeQ',
  },
];
