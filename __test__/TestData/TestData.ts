import type { Battle } from '@/types/tables';

export const dummyBattles: Battle[] = [
  {
    id: 1,
    length: 180,
    mc1: 'MC Alpha',
    mc2: 'MC Beta',
    title: 'Alpha vs Beta - Semi Finals',
    tournament_name: 'Ultimate Rap Battles 2024',
    url: 'https://example.com/battles/1',
  },
  {
    id: 2,
    length: 210,
    mc1: 'MC Gamma',
    mc2: 'MC Delta',
    title: 'Triple Threat - Gamma, Delta, Epsilon',
    tournament_name: 'Freestyle Masters',
    url: 'https://example.com/battles/2',
  },
  {
    id: 3,
    length: 150,
    mc1: 'MC Zeta',
    mc2: 'MC Eta',
    title: 'Team Battle - Zeta & Eta vs Theta & Iota',
    tournament_name: 'Team Championship',
    url: 'https://example.com/battles/3',
  },
  {
    id: 4,
    length: 200,
    mc1: 'MC Kappa',
    mc2: 'MC Lambda',
    title: "Kappa's Solo Freestyle",
    tournament_name: 'Freestyle Open 2024',
    url: 'https://example.com/battles/4',
  },
  {
    id: 5,
    length: 240,
    mc1: 'MC Lambda',
    mc2: 'MC Mu',
    title: 'Six-Way Battle Royale',
    tournament_name: 'Ultimate Rap Battles 2023',
    url: 'https://example.com/battles/5',
  },
];
