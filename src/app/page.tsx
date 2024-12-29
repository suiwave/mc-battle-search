import { hc } from "hono/client";
import type { App } from "./api/[...route]/route";

import IndexPage from "@/components/presentation/index";

// 動的なページとして扱う。
// 単純なfetchしかしない関数はNextがデフォルトで静的ページにしようとするため、明示的に宣言。
export const dynamic = "force-dynamic";

export default async function Page() {
  const client = hc<App>("http://localhost:3000/");
  const response = await client.api.battles.$get();
  const battles = await response.json();

  return (
    <IndexPage battles={battles} />
  );
}
