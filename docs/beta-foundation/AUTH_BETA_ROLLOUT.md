# Authentication reliability and beta-access rollout

This change makes Google the primary account path, replaces the normal email
magic-link UI with typed email OTP, and adds a temporary local-only beta access
mode. Beta access is a convenience gate in a public static application. It is
not authentication, has no Supabase identity, cannot read authenticated rows,
and never weakens RLS.

## Beta codes

Run `npm run beta-code`. Give the plaintext code to the beta owner through an
appropriate private channel and store it outside the repository. Add only the
printed derived identifier to `ALLOWED_BETA_CODE_IDS` in
`src/lib/beta-access.ts`. Removing an identifier in a later deployment revokes
that persisted beta session on its next load without deleting its beta progress.

The format currently contains 40 random bits. Because the validator and its
derived identifiers ship in a public static bundle, this mechanism must never
be described as secure authentication or used to authorize protected data.

## Supabase owner actions required before email is enabled

1. Confirm the signup template uses `{{ .Token }}`.
2. Confirm the Magic Link / OTP template uses `{{ .Token }}`.
3. Confirm neither normal email flow depends on `{{ .ConfirmationURL }}`.
4. Confirm the production OTP length and expiry in the live Supabase project.
   The checked-in configuration expects an 8-character, one-hour OTP, but that
   is not evidence that the hosted project currently matches it.
   The UI deliberately imposes no fixed length or numeric-only validation, so
   it remains compatible with the verified production setting.
5. Configure and confirm custom SMTP is live, and set/verify an appropriate
   email rate limit. Supabase's default mailer is not
   external-beta readiness evidence.
6. Using a genuinely external, non-team mailbox, retain delivery/provider logs
   for new-user OTP, returning-user OTP, resend, wrong code, and expiration.

Until every item above is evidenced, email is **not ready** even if mocked and
automated tests pass.

## Required real-world acceptance before deployment recommendation

Google:

- Use a genuinely unrelated external Google account.
- Complete new-account creation, onboarding, progress save, reload,
  second-browser/device restore, and sign-out/sign-in.

Beta access:

- Stall or block Supabase requests, enter beta, study, reload, and retain local
  progress.
- Exit and re-enter; confirm beta progress remains.
- Confirm no cloud-user row or authenticated API access is available.

Browsers:

- iPhone Safari, desktop Safari, desktop Chrome, and private browsing where
  practical.

Email, only after the owner actions above:

- External mailbox new-user and returning-user OTP.
- Resend, expiration, wrong code, and provider delivery evidence.

The historical iPhone transport failure remains unproven. Do not describe an
exact cause without new evidence; acceptance should verify the bounded recovery
behavior on the target devices instead.
