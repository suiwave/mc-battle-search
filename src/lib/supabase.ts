import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
// Read Onlyかつ複数環境ないのでべた書き
const supabaseUrl = 'https://qdfakwlmefogwiqfwwne.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZmFrd2xtZWZvZ3dpcWZ3d25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzODExODAsImV4cCI6MjA1MDk1NzE4MH0.MqAPztCtFl2CUdRKCwVcAqPceQKkbqmhs3pAFWNVPuk';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
