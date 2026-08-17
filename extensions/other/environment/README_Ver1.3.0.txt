Environment Ver.1.3.0 for KidsBlock

Added block:
- Absolute humidity from temperature (C) and relative humidity (%)
- Unit: g/m^3

Existing blocks and APIs remain compatible with Ver.1.2.1.

Generated Arduino expression:
  calcAbsoluteHumidity(temp, humidity)

Example: 25 C, 50 %RH -> approximately 11.5 g/m^3
