import { supabase } from '../lib/supabase';
import type { Battle } from '@/types/tables';

/**
 * 全てのバトルを取得するメソッド
 * @returns {Promise<Battle[]>} バトルのリストを返すPromise
 */
export async function getAllBattles(): Promise<Battle[]> {
    // Supabaseからバトルデータを取得するクエリ
    const { data, error } = await supabase
        .from('battles')
        .select('*');

    if (error) {
        console.error('Error fetching battles:', error);
        return [];
    }

    return data || [];
}