## 0.1.3
- add changelog
- took out the Object.assign, defined property twice as needed
- perf improvement (a couple percent, for fluent)
- improve exporting by storing `.module`
- added some of the updates to docs, explained a bit more

# 0.1.2
- 🕴 likeaboss
  🎁 features
    - even better exporting (using module, simpler)

# 0.1.0
- 🕴 likeaboss exports 🆕
  - 🆕 creating
  - 🎁 features
    - adding window and node support
    - dynamic requires
    - object syntax
    - added named dynamic object exports
    - added easy-npm-files for exporting
  - 📖📚 docs
    - 📘 add example docs
    - ℹ️️ added more jsdocs
    - 📘 add example output
    - 🖼️ add screenshots
    - 📘 example with typescript, ensure it works
  - 🔬 tests
    - expected exported values
    - exports are the same using fluent and object syntax
    - dynamics are not required until used
  - 🏋️ benchmarks
    - benchmark
    - bench-chain
