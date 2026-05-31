import { Comment } from '@org/types';

type CommentInputProps = {
  onAdd: (comment: Comment) => void;
};

export function CommentInput({ onAdd }: CommentInputProps) {
  return <div>CommentInput</div>;
}
