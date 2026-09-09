# climat

AI-assisted origination for carbon projects: a developer supplies project data
and evidence, and the platform produces a verification-ready case with every
claim traceable to the evidence that supports it.

## What works

Origination, end to end. Intake rendered from the methodology's own field
definitions, applicability evaluation, AI drafting of every case section with
per-claim citations checked against the documents actually supplied,
contradiction detection between intake and evidence, human review and
finalisation, and export of a package with an honest note on what was
AI-drafted and what a person approved.

Nothing is methodology-specific: adding a methodology is seed data, not code.
VM0047 (land use, census-based) and VMR0017 (grid renewable) both run the
identical path, verified end to end for each.

## What does not exist yet

The flow ends at `EXPORTED_FOR_VERIFICATION`. **No carbon credits are issued
by this system.** Validation, registration, monitoring, verification and
issuance are unbuilt, and a large amount of interface elsewhere in the frontend
calls route families that no service here implements — verifier review,
registry review, comments, trading. Treat those screens as a design reference,
not a working feature.

There is also no self-registration: accounts are provisioned directly.

## Layout

    carbon-credit/           Origination backend — the substance
    carbon-credit-webapp/    Frontend
    auth-service/            Login, OTP, JWT issuance
    user-service/            Users, departments, organisations
    rbac-service/            Roles and permissions
    tools/                   Local stack bring-up + API-gateway stand-in

## Running it locally

    ./tools/local-stack.sh up
    npm --prefix carbon-credit-webapp start

Requires Node 20 (the services' dependencies break on newer), MongoDB, and an
LLM key at `~/.config/gmi/minimax.key` for generation. The script encodes
several non-obvious environment requirements and documents why each exists —
read its header before changing any of them.

## A note on inter-service URLs

Call sites disagree about whether to include a service prefix: within
`auth-service`, `Role.service.ts` builds `<url>/rbac/api/v1/...` while
`User.service.ts` builds `<url>/api/v1/users/...`. No single base URL satisfies
both, which is why `tools/local-gateway.js` exists and why the two variables are
configured differently. This is unresolved upstream.
