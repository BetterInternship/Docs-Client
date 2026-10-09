"use client";

import { useFormProcess } from "@/components/docs/forms/form-process.ctx";
import { useFormRendererContext } from "@/components/docs/forms/form-renderer.ctx";
import { Button } from "@/components/ui/button";
import { useSignatoryProfile } from "@/app/docs/auth/provider/signatory.ctx";
import { getPreviousCompletedRoles } from "@/lib/repeat-signing";
import { DuplicateSignatoryNotice } from "@/components/docs/forms/DuplicateSignatoryNotice";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const FORWARD_ONLY_TOOLTIP = "You've already signed this previously. Forward to another signer.";

type SignIntentGateProps = {
  onSignSelf: () => void;
  onDelegate: () => void;
  forwardOnly: boolean;
};

export function SignIntentGate({ onSignSelf, onDelegate, forwardOnly }: SignIntentGateProps) {
  const form = useFormRendererContext();
  const formProcess = useFormProcess();
  const profile = useSignatoryProfile();
  const displayInformation = formProcess.display_information as Record<string, string>;
  const documentName = formProcess.form_label;
  const studentName = displayInformation?.["student.full-name:default"];
  const signingParties = form.formMetadata.getSigningParties();
  const signingPartyId = formProcess.my_signing_party_id;
  const signingParty = signingParties.find((signingParty) => signingParty._id === signingPartyId);
  const previousRoles = getPreviousCompletedRoles(
    formProcess.signing_parties,
    signingPartyId,
    profile.email
  );
  const currentRole = signingParty?.signatory_title?.trim() || "this role";

  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl items-start justify-center px-4 pt-4 pb-6 sm:h-full sm:items-center sm:px-6 sm:py-10">
      <div className="w-full">
        {forwardOnly && (
          <div className="mx-auto mb-5 max-w-5xl text-left">
            <DuplicateSignatoryNotice previousRoles={previousRoles} currentRole={currentRole} />
          </div>
        )}

        <p className="mx-auto max-w-5xl text-left text-base leading-relaxed font-medium text-gray-700 sm:text-lg">
          <span className="text-primary font-bold">{studentName}</span>{" "}
          <span className="font-thin">has requested you to fill out their</span>{" "}
          <span className="text-primary font-bold">{documentName}</span>{" "}
          <span className="font-thin">as</span>{" "}
          <span className="text-primary font-bold">{signingParty?.signatory_title}</span>.
        </p>

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={forwardOnly ? "block h-full cursor-not-allowed" : "block h-full"}
                tabIndex={forwardOnly ? 0 : undefined}
                aria-label={forwardOnly ? FORWARD_ONLY_TOOLTIP : undefined}
              >
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="group h-full min-h-28 w-full flex-row items-stretch gap-0 overflow-hidden p-0 text-base whitespace-normal sm:min-h-56 sm:flex-col"
                  onClick={onSignSelf}
                  disabled={forwardOnly}
                  aria-label={
                    forwardOnly
                      ? `Signing as ${currentRole} is unavailable because you already completed a step`
                      : undefined
                  }
                >
                  <div className="flex w-28 shrink-0 items-center justify-center bg-gray-100 px-4 py-4 transition-colors group-hover:bg-gray-200 sm:min-h-36 sm:w-full sm:flex-1 sm:px-6 sm:py-8">
                    <div className="bg-primary rounded-full p-4 opacity-85 sm:p-6">
                      <img
                        src="/assets/sign-document.png"
                        alt=""
                        width={96}
                        height={96}
                        className="h-10 w-10 translate-y-[-1px] object-contain opacity-80 invert sm:h-20 sm:w-20"
                      />
                    </div>
                  </div>
                  <div className="flex min-h-0 w-full flex-col justify-center px-4 py-3 text-left sm:border-t sm:px-6 sm:py-5">
                    <span className="text-sm font-semibold sm:text-base">I am the</span>
                    <span className="text-sm font-thin sm:text-base">
                      {signingParty?.signatory_title}
                    </span>
                  </div>
                </Button>
              </span>
            </TooltipTrigger>
            {forwardOnly && (
              <TooltipContent
                className="max-w-[calc(100vw-2rem)] border border-slate-200 bg-white text-slate-700 shadow-md sm:max-w-lg"
                arrowClassName="fill-white"
                side="bottom"
                sideOffset={8}
              >
                {FORWARD_ONLY_TOOLTIP}
              </TooltipContent>
            )}
          </Tooltip>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="group h-auto min-h-28 w-full flex-row items-stretch gap-0 overflow-hidden p-0 text-base whitespace-normal sm:min-h-56 sm:flex-col"
            onClick={onDelegate}
          >
            <div className="flex w-28 shrink-0 items-center justify-center bg-gray-100 px-4 py-4 transition-colors group-hover:bg-gray-200 sm:min-h-36 sm:w-full sm:flex-1 sm:px-6 sm:py-8">
              <div className="bg-primary rounded-full p-4 opacity-85 sm:p-6">
                <img
                  src="/assets/forward-document.png"
                  alt=""
                  width={96}
                  height={96}
                  className="h-10 w-10 translate-x-1 translate-y-0.5 object-contain opacity-80 invert sm:h-20 sm:w-20"
                />
              </div>
            </div>
            <div className="flex min-h-0 w-full flex-col justify-center px-4 py-3 text-left sm:border-t sm:px-6 sm:py-5">
              <span className="text-sm font-semibold sm:text-base">Forward this to the actual</span>
              <span className="text-sm font-thin sm:text-base">
                {signingParty?.signatory_title}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
