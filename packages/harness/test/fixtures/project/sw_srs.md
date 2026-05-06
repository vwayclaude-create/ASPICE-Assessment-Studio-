# Software Requirements Specification — BMS-Lite SW (v0.4, review)

Produced by SWE.1 Software Requirements Analysis. Derived from the SYS.2
system requirements (17-00) and SYS.3 system architecture (04-06).
Work product 17-11 Software Requirement.

## Software requirements

- REQ-SW-001: The application shall compose CAN frame 0x123 payload from
  the state-of-charge computation within 5 ms. Traces from REQ-SYS-001
  (via ARCH-SYS-001).
- REQ-SW-002: The application shall read all 12 cell temperature channels
  every 50 ms. Traces from REQ-SYS-002 (via ARCH-SYS-002).
- REQ-SW-003: The application shall expose UDS service IDs 0x10, 0x22,
  0x27, 0x31, 0x3E. Traces from REQ-SYS-004 (via ARCH-SYS-003).

Consistency and bidirectional traceability with system requirements and
system architecture are maintained in the SWE.1 trace matrix.
