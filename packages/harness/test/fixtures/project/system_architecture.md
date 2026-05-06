# System Architecture — BMS-Lite ECU (v0.9, draft)

Produced by SYS.3 System Architectural Design. Derived from the SYS.2
system requirements. System Architecture WP 04-06.

## Static aspects (element decomposition)

- ARCH-SYS-001: CAN gateway element — realises REQ-SYS-001 by publishing
  state-of-charge on CAN ID 0x123.
- ARCH-SYS-002: Thermal management element — realises REQ-SYS-002.
- ARCH-SYS-003: Diagnostic stack element — realises REQ-SYS-004 (UDS).

## Dynamic aspects

Scheduler: 100 ms periodic task dispatches CAN gateway; 50 ms task polls
the thermal management element.

## Analysis

Consistency and bidirectional traceability are established between
ARCH-SYS-001..003 and REQ-SYS-001, REQ-SYS-002, REQ-SYS-004.

**Note**: REQ-SYS-003 (cell over-temperature DTC) is pending architectural
placement — see CR-042.
