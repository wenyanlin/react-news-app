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
      className="w-full"
    />
  );
}
