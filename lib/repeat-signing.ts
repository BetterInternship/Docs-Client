import type { SigningPartyMapParty } from "@/components/docs/forms/SignignPartyTimeline";

/** The existing docs warning predicate, shared by the gate and submit controls. */
export function getPreviousCompletedRoles(
  parties: SigningPartyMapParty[] | undefined,
  currentPartyId: string | undefined,
  email: string | undefined
) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return [];
  return (parties ?? [])
    .filter(
      (party) =>
        party._id !== currentPartyId &&
        party.signed &&
        party.signatory_email?.trim().toLowerCase() === normalizedEmail
    )
    .map((party) => party.signatory_title?.trim() || `Signing party ${party.order}`);
}
