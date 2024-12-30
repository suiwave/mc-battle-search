'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { JSX } from 'react';

import { selectDataTestIdPrefix, type SelectCategory } from '@/constants/constants';

interface SelectBoxProps {
  onValueChange: (selectValue: string) => void;
  selectCategory: SelectCategory;
  placeholder: string;
  selectValues: { name: string; value: string }[]; // selectValues の型を変更
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
  selectCategory,
  placeholder,
  selectValues,
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
            data-testid={`${selectDataTestIdPrefix[selectCategory]}${value}`}
          >
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
