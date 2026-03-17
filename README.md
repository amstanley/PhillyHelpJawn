# PhillyHelpJawn

PhillyHelpJawn is an iPhone-first assistant that helps people in Philadelphia find basic-needs services such as food and shelter through a voice-forward and low-literacy-friendly interface. It is the winner of the Big Philly Meetup Mashup Hackathon award for 'Most Helpful Use of AI' — Signature Category award sponsored by [OmbuLabs.ai](https://ombulabs.ai).

## Origin Story

PhillyHelpJawn was built during a fast hackathon sprint to prove that a simple, voice-first mobile experience can help people quickly find food and shelter resources in Philadelphia.

Watch the build story on YouTube: [PhillyHelpJawn origin video](https://youtu.be/hMfoJtXvgyM)

### Hackathon Context

![Hackathon poster](video/PhillyHelpJawn%20Video%20assets/Image%203-16-26%20at%205.26%E2%80%AFPM.png)

### Team

![Team slide](video/PhillyHelpJawn%20Video%20assets/PhillyHelpJawn%20presentation%20deck%20slide%201%20team.png)

### Early App Snapshot

<img src="video/PhillyHelpJawn%20Video%20assets/IMG_4840.PNG" alt="PhillyHelpJawn app screenshot" width="20%" />

## Purpose

Many people in Philadelphia need help accessing essential services. PhillyHelpJawn aims to provide a simple, factual, and accessible way to discover relevant local resources.

## Current Scope

PhillyHelpJawn is now a working end-to-end hackathon prototype with a live backend and an integrated iPhone client.

- Platform: native iPhone app + backend API
- Input: push-to-talk voice query (speech-to-text on device)
- Processing: backend AI agent interprets intent and retrieves matching services
- Output: structured response with message, resources, and crisis/action fields
- Presentation: large-icon UI, map + route support, call actions, and text-to-speech output
- Guardrails: crisis detection and emergency action phone handling (for example 988/911/211)
- Language: English-first, designed to expand later

## Default User Persona

The default user persona is someone who:

- may be functionally low literacy
- may use a low-powered/basic mobile device
- may have inconsistent connectivity (future phase support)

## Team

- Malcolm: native iPhone frontend development
- Em: backend platform development
- Georgette: initial resource list curation
- Karl: low-literacy UI design language

## End-to-End Architecture

User speaks -> iPhone STT -> backend API -> agent + retrieval + guardrails -> structured response -> iPhone TTS + visual actions

![Back-end architecture slide](video/PhillyHelpJawn%20Video%20assets/PhillyHelpJawn%20presentation%20deck%20slide%206%20back%20end.png)

Backend stack (hackathon implementation): TypeScript, Hono, Supabase, Railway, and agent-driven response orchestration.

## Success Criteria (Current)

The current prototype is successful when users can complete end-to-end requests (food, shelter, jobs, and crisis-sensitive prompts) and receive actionable, consumable output through voice and visual controls.

## Default MVP User Flow

1. User presses a push-to-talk button and makes a spoken query.
2. Spoken query asks for food or shelter help based on backend data.
3. Query is sent to the backend through an API.
4. Backend agent applies retrieval, time-awareness, and guardrails to generate response data.
5. Response is sent back to the iPhone device as structured JSON.
6. Response may include speech text, resource cards, map coordinates, crisis flags, and action phone numbers.
7. Device automatically speaks response text and supports routing and calling from the returned data.

## MVP Guardrails

- Keep interaction factual and informational; do not nudge users into follow-up actions.
- Support food, shelter, and related basic-needs discovery in a single voice-first flow.
- Ensure response includes speech-ready text so voice output always works.
- Support optional map and metadata rendering when location and service details are available.
- Respect backend crisis/action outputs and elevate emergency call actions when present.
- Keep architecture ready for multilingual and intermittent-connectivity expansion later.
- API request/response contracts are defined in `API Specs/` and implemented across client + backend.

## Current Project Status

This repository contains a functioning end-to-end prototype. The iPhone app, backend API, and response contracts are implemented and integrated for live request/response behavior.

## Planned Next Steps

1. Validate usefulness with frontline practitioners who work daily with vulnerable residents matching the target persona.
2. Run structured feedback sessions with libraries, shelters, workforce teams, and outreach organizations to test whether the experience is actually helpful in real workflows.
3. Build sponsor and partner relationships for a thoughtful next phase, including implementation support and community deployment pathways.
4. Prioritize future technical changes only after evidence-based validation from partners and target-user advocates.

## How You Can Help

We cannot do the next phase alone. If this project resonates with you, we need partners who can help us validate and responsibly evolve it.

- **Frontline access:** Connect us with staff who work directly with low-literacy and vulnerable residents for structured feedback sessions.
- **Pilot partners:** Help us run small, supervised pilots in real service settings (libraries, shelters, workforce programs, community hubs).
- **Sponsorship:** Provide funding, in-kind support, or organizational backing to sustain research, iteration, and deployment planning.
- **Implementation collaborators:** Join us on product, accessibility, service design, and community operations for the next phase.

## Contributing (Hackathon)

- Keep changes focused on MVP scope.
- Prioritize accessibility and low-literacy usability.
- Avoid adding features outside the defined single-journey demo goal.
