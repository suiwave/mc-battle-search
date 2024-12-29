import { hc } from 'hono/client';
import type { App } from '@/app/api/[...route]/route';

// 環境変数からホストを取得する。存在しない場合、localhostをホストとする
export const baseUrl = process.env.BASEURL || 'http://localhost:3000/';
export const client = hc<App>(baseUrl);