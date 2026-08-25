KidsBlock ESP32 Education Pack v0.6 Preview
Environment Extension v1.7.0
Author: davinichi

New in v1.7.0
-------------
A single dropdown value block can calculate 10 environmental indices from
temperature (deg C) and relative humidity (%):

1. Discomfort Index (DI)             unit: none
2. Heat Index                        unit: deg C
3. Humidex                           unit: index
4. Dew point (Td)                    unit: deg C
5. Absolute humidity (AH)            unit: g/m3
6. Wet-bulb temperature (Tw)         unit: deg C
7. VPD (vapor pressure deficit)      unit: kPa
8. Vapor pressure (VP)               unit: kPa
9. THI                               unit: index
10. Estimated WBGT (simple)          unit: deg C

Existing individual wet-bulb, simple WBGT, and absolute-humidity blocks are
kept for backward compatibility.

Important notes
---------------
- Wet-bulb temperature uses the Stull (2011) approximation. Its published
  validity is approximately -20 to 50 deg C and 5 to 99% RH at standard
  sea-level pressure, with limitations in cold/dry conditions.
- Estimated WBGT uses 0.7*Tw + 0.3*T as a simple indoor/no-solar estimate.
  It is NOT a formal WBGT measurement and does not replace a globe
  thermometer or official heat-risk instrumentation.
- Heat Index follows the US National Weather Service method and returns deg C.
- Humidex follows the Environment and Climate Change Canada formulation.
- THI definitions vary by application. This version uses T + 0.36*Td + 41.2,
  an example form used in dairy-cattle heat-stress education.
- VPD and THI interpretation depends on crop, animal species, and operating
  context. These calculations are intended for education and experimentation.
