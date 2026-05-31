import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';

type CommentSectionProps = {};

export function CommentSection({}: CommentSectionProps) {
  return (
    <div>
      <h1>Comment Section</h1>
      <CommentInput />
      <CommentList />
    </div>
  );
}
