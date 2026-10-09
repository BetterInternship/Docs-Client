import { FormMetadata, type IFormSigningParty } from "@betterinternship/core/forms";
import { FieldRenderer } from "@/components/docs/forms/FieldRenderer";
import { useFormFiller } from "@/components/docs/forms/form-filler.ctx";

export function RecipientDropdownPreview({
  parties,
  sourcePartyId,
}: {
  parties: IFormSigningParty[];
  sourcePartyId: string;
}) {
  const filler = useFormFiller();
  const recipients = parties.filter(
    (party) =>
      party.signatory_source?._id === sourcePartyId && party.signatory_email_options !== undefined
  );
  if (!recipients.length) return null;

  return (
    <div className="space-y-3 border-b p-4">
      <h3 className="text-sm font-medium">Recipient email choices</h3>
      {recipients.map((party) => {
        try {
          const metadata = new FormMetadata({
            name: "preview",
            label: "Preview",
            schema_version: 1,
            schema: { blocks: [] },
            signing_parties: [party],
          });
          const [field] = metadata.getSigningPartyFields(sourcePartyId);
          return (
            <FieldRenderer
              key={party._id}
              field={field}
              value={filler.getFinalValues()[field.field] ?? ""}
              onChange={(value: string) => filler.setValue(field.field, value)}
            />
          );
        } catch (error) {
          return (
            <p key={party._id} className="text-xs text-red-600">
              {party.signatory_title}:{" "}
              {error instanceof Error ? error.message : "Check the configured choices."}
            </p>
          );
        }
      })}
    </div>
  );
}
