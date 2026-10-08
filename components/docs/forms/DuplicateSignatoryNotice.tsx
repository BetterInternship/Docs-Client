import { AlertTriangle } from "lucide-react";

export function DuplicateSignatoryNotice({
  previousRoles,
  currentRole,
  forwardOnly = false,
}: {
  previousRoles: string[];
  currentRole: string;
  forwardOnly?: boolean;
}) {
  const roles =
    previousRoles.length > 2
      ? `${previousRoles.slice(0, -1).join(", ")}, and ${previousRoles.at(-1)}`
      : previousRoles.join(" and ");
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-[0.33em] border border-amber-200 bg-amber-50 p-5 text-amber-950 sm:p-6"
    >
      <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
      <div className="space-y-3 text-base leading-relaxed sm:text-lg">
        <p className="font-medium">
          You&apos;ve already completed this form as {roles ? `the ${roles}` : "a previous role"}.
        </p>
        <p>
          {forwardOnly ? (
            <>
              You can only forward this step to another person to complete it as the {currentRole}.
            </>
          ) : (
            <>
              Are you sure you also want to sign it as the{" "}
              <span className="font-semibold">{currentRole}</span>?
            </>
          )}
        </p>
      </div>
    </div>
  );
}
