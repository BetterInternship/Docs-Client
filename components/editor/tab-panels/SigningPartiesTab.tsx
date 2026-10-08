"use client";

import { useFormEditorMetadata } from "@/app/contexts/form-editor-metadata.context";
import { PartiesPanel } from "@/components/docs/form-editor/form-layout/PartiesPanel";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SigningPartiesTab() {
  const { formMetadata, updateSigningParties, updateFormMetadata } = useFormEditorMetadata();

  if (!formMetadata) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        No form loaded
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-auto p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <h3 className="text-lg font-semibold">Recipients</h3>
        <div className="rounded-[0.33em] border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="prevent-repeat-signing" className="text-sm font-medium">
              Prevent repeat fill-out by the same email
            </Label>
            <Switch
              id="prevent-repeat-signing"
              checked={formMetadata.prevent_repeat_signing === true}
              onCheckedChange={(checked) => updateFormMetadata({ prevent_repeat_signing: checked })}
            />
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            Emails that have already completed a step, including the initiator, can only forward
            later steps to another signer. Forwarding without filling out a step does not count.
          </p>
        </div>
        <PartiesPanel
          parties={formMetadata.signing_parties || []}
          onPartiesChange={updateSigningParties}
        />
      </div>
    </div>
  );
}
