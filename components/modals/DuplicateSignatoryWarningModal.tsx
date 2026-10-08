import { Button } from "../ui/button";
import { DuplicateSignatoryNotice } from "../docs/forms/DuplicateSignatoryNotice";

type DuplicateSignatoryWarningModalProps = {
  previousRoles: string[];
  currentRole: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DuplicateSignatoryWarningModal = ({
  previousRoles,
  currentRole,
  onCancel,
  onConfirm,
}: DuplicateSignatoryWarningModalProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <DuplicateSignatoryNotice previousRoles={previousRoles} currentRole={currentRole} />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Continue</Button>
      </div>
    </div>
  );
};
