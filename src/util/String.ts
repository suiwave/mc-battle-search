import type { Battle } from "@/types/tables";

/**
 * 秒単位の時間をフレンドリーな文字列形式（MM:SS）に変換します。
 *
 * @param time - 変換する秒単位の時間。
 * @returns MM:SS形式の時間を表す文字列。
 */
export const convertFriendlyTime = (time: number) => {
  return `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
};

/**
 * バトルオブジェクトをフレンドリーなマッチラベルに変換します。
 *
 * @param battle - マッチ情報を含むバトルオブジェクト。
 * @returns マッチラベルを表す文字列。`mc2`がnullの場合は`mc1`を返します。それ以外の場合は`mc1 vs mc2`を返します。
 */
export const convertFriendlyMatchLabel = (battle: Battle) => {
  // ソロラップの場合もある
  if (battle.mc2 === null) {
    return battle.mc1;
  }
  return `${battle.mc1} vs ${battle.mc2}`;
};
