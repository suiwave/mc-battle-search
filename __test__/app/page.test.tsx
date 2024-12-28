import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import IndexPage from '@/app/page';

beforeEach(() => {
    cleanup();
});

const getComboboxByText = (text: string) => {
    return screen.getAllByRole('combobox').filter((element) => element.textContent === text)[0];
};

describe('IndexPage', () => {
    describe('初期状態', () => {
        it('ヘッダーが表示されていること', () => {
            render(<IndexPage />);
            const heading = screen.getByRole('heading', { name: /Lyrical Showdowns/i });
            expect(heading).toBeInTheDocument();
        });

        it('トーナメントフィルターが表示されていること', () => {
            render(<IndexPage />);
            const tournamentFilter = getComboboxByText('Tournament');
            expect(tournamentFilter).toBeInTheDocument();
        });

        it('MCフィルターが表示されていること', () => {
            render(<IndexPage />);
            const mcFilter = getComboboxByText('MC');
            expect(mcFilter).toBeInTheDocument();
        });

        it('ラウンドフィルターが表示されていること', () => {
            render(<IndexPage />);
            const roundFilter = getComboboxByText('Round');
            expect(roundFilter).toBeInTheDocument();
        });

        it('バトル結果が表示されていること', () => {
            render(<IndexPage />);
            const battleResults = screen.getAllByRole('heading', { level: 2 });
            expect(battleResults.length).toBe(3);
        });
    });
});
