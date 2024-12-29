'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { JSX } from 'react';

interface SelectBoxProps {
  onValueChange: (selectValue: string) => void;
  placeholder: string;
  selectValues: { name: string; value: string }[]; // selectValues の型を変更
  testIdPrefix: string;
}

/**
 * ドロップダウン選択要素をレンダリングする SelectBox コンポーネント。
 *
 * @param {Object} props - プロパティオブジェクト。
 * @param {function} props.onValueChange - 値が変更されたときに呼ばれるコールバック関数。
 * @param {string} props.placeholder - セレクト入力のプレースホルダーテキスト。
 * @param {Array<{name: string, value: string}>} props.selectValues - セレクトオプションの名前と値を含むオブジェクトの配列。
 * @param {string} props.testIdPrefix - セレクトオプションのテストIDのプレフィックス。
 *
 * @returns {JSX.Element} レンダリングされた SelectBox コンポーネント。
 */
export default function SelectBox({
  onValueChange,
  placeholder,
  selectValues,
  testIdPrefix,
}: SelectBoxProps): JSX.Element {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="mature-input">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* selectValues に基づいてオプションを動的に生成 */}
        {selectValues.map(({ name, value }) => (
          <SelectItem
            key={value}
            value={value}
            data-testid={`${testIdPrefix}-select-option-${value}`}
          >
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
