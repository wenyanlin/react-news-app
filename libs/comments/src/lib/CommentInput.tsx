/**
 * @file CommentInput.tsx
 * @description 留言多行輸入框（Textarea）的純 UI 封裝元件，統一輸入欄位的視覺風格。
 */

import React from 'react';

type CommentInputProps = {
  /** 用於存取底層 textarea DOM 的 Ref 參考 */
  inputRef: React.Ref<HTMLTextAreaElement>;
  /** 是否禁用輸入欄位 */
  disabled?: boolean;
  /** 輸入欄位佔位說明字串 */
  placeholder?: string;
  /** 輸入最大字數限制 */
  maxLength?: number;
  /** 欄位預設文字內容 */
  defaultValue?: string;
};

/**
 * CommentInput 原子級 UI 元件
 * @description 提供具備一致性 padding、圓角邊框、背景色、文字字級、Focus 光暈效果以及 Disabled 灰階狀態的 Textarea 欄位。
 */
export function CommentInput({
  inputRef,
  disabled,
  placeholder,
  maxLength,
  defaultValue,
}: CommentInputProps) {
  return (
    <textarea
      ref={inputRef}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      defaultValue={defaultValue}
      className="w-full min-h-22.5 px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60 disabled:bg-slate-100 disabled:cursor-not-allowed resize-none text-sm leading-relaxed"
    />
  );
}

/**
 * 樣式固定導致複用度受限 (複用性高原則):
 *  - 問題：輸入框的尺寸高度（`min-h-22.5`）與大小拖拉規則（`resize-none`）在 class 內部被完全寫死，若其他業務場景需要較高的輸入框或允許調整大小，該組件將無法直接被複用。
 *  - 改善：支援 `className` prop 傳入，並在內部結合 `clsx` 或 `tailwind-merge` 對預設樣式進行動態合併，讓外部呼叫端在複用時能覆寫尺寸高度等特定的樣式。
 */
