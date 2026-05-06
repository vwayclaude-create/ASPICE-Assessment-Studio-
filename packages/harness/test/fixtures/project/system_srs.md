# System Requirements Specification — BMS-Lite ECU (v1.3, approved)

Produced by SYS.2 System Requirements Analysis. Traces backward to the
stakeholder requirements and forward to the system architecture and
software / hardware requirements.

## 1 Functional system requirements

- REQ-SYS-001: The ECU shall publish state-of-charge on CAN ID 0x123 every
  100 ms (±5 ms jitter). Traces from STK-001. Approved.
- REQ-SYS-002: The ECU shall operate within functional limits over -40°C
  to +85°C ambient. Traces from STK-002. Approved.
- REQ-SYS-003: The ECU shall issue DTC P0A80 within 2 s of a cell
  over-temperature event. Traces from STK-003. Approved.

## 2 Non-functional system requirements

- REQ-SYS-004: The diagnostic interface shall conform to UDS ISO 14229.
  Traces from STK-004. Approved.

## 3 Requirement attributes

All requirements are tagged with priority, verification method, and release
scope per 17-54 Requirement Attribute conventions.

## 4 Consistency and bidirectional traceability

Bidirectional traceability between these system requirements and the
stakeholder requirements is maintained in the trace matrix. Consistency
evidence is recorded in the SYS.2 review record dated 2026-03-02.

## 5 Communicated to

System architecture team, software team, hardware team, validation team,
quality assurance, and the customer representative.
