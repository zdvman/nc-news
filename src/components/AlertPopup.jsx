import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from '@/components/catalyst-ui-kit/alert';
import { Button } from '@/components/catalyst-ui-kit/button';

export default function AlertPopup({
  isOpen,
  setIsOpen,
  onConfirm,
  setCommentIdToDelete,
  title,
  description,
  confirmText,
  cancelText,
}) {
  return (
    <>
      <Alert open={isOpen} onClose={() => setIsOpen(false)}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <AlertActions>
          {cancelText && (
            <Button
              plain
              onClick={() => {
                setIsOpen(false);
                setCommentIdToDelete(null);
              }}
            >
              {cancelText}
            </Button>
          )}
          <Button onClick={onConfirm}>{confirmText}</Button>
        </AlertActions>
      </Alert>
    </>
  );
}
