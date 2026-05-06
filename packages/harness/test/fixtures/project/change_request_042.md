# Change Request CR-042

Work product 13-16 Change Request.

**Title**: Clarify over-temperature DTC handling
**Raised**: 2026-03-15 by Validation Team
**Status**: Open

## Description

REQ-SYS-003 specifies that a DTC shall be issued within 2 s of a cell
over-temperature event. The current system architecture (v0.9) does not
allocate REQ-SYS-003 to an architectural element. ARCH-SYS-002 (thermal
management) is the likely owner but the behaviour is unspecified.

## Impact analysis

- REQ-SYS-003: may require refinement (pass/fail criterion, definition of
  "cell over-temperature").
- ARCH-SYS-002: will be updated to include DTC emission logic.
- Downstream software requirement expected (not yet written).
- System verification case TC-SYS-003 (not TC-SYS-002) depends on
  resolution.

## Proposed action

Draft an update to the system architecture v1.0 that documents the DTC
path. Open a new software requirement REQ-SW-004 under SWE.1.
