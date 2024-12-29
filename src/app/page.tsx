import IndexPage from '@/components/presentation/index';
import { client } from '@/lib/hono';

// 動的なページとして扱う。
// 単純なfetchしかしない関数はNextがデフォルトで静的ページにしようとするため、明示的に宣言。
export const dynamic = 'force-dynamic';

export default async function Page() {
  const response = await client.api.battles.$get();
  const battles = await response.json();

  return <IndexPage baseData={battles} />;
}
