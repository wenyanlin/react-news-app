import React from 'react';

type CommentInputProps = {
  inputRef: React.Ref<HTMLTextAreaElement>;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string;
};

/**
 * 純 UI 元件
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
      className="w-full min-h-[90px] px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60 disabled:bg-slate-100 disabled:cursor-not-allowed resize-none text-sm leading-relaxed"
    />
  );
}
