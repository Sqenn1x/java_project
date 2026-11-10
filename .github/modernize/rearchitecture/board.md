## User Input

> Perform a repository-wide structural refactor of the current Java Spring Boot Jira Lite project to make its organization clean and maintainable, preserving all existing behavior and API contracts. Scope includes frontend assets currently concentrated in static/index.html, Java package/file organization, tests, and repository-level configuration where beneficial. Treat the user's selected scope as repository-wide. Do NOT implement new product features. Avoid unrelated fixes and preserve all existing uncommitted user changes; inspect git status before editing and never discard/revert their work. Do not commit. Do not create planning/architecture markdown artifacts; the user wants a better organized working project, not analysis documents (README already exists). Use existing patterns and ensure Spring component scanning/JPA, static asset URLs, UI interactions, tests, and wrapper commands continue working. First acquire applicable repository instructions (AGENTS.md and relevant instruction files) before code edits. Make a coherent, incremental organization change, then run relevant automated tests/build and report exact files moved/changed, verification, limitations, and any sensible staged follow-ups if a single pass cannot safely finish the whole scope.

**Project started**: 2026-11-10T22:41:38Z

## Tasks

### Phase: Implementation
- 🔄 t1 [backend] Reorganize Java source and tests without changing behavior or API contracts (dispatched 2026-11-10T22:42:48Z)
- 🔄 t2 [frontend] Separate static UI assets into maintainable files while preserving URLs and interactions (dispatched 2026-11-10T22:42:48Z)
- ⏳ t3 [devops] Align root-level repository configuration with the reorganized project where beneficial [deps: t1, t2]

### Phase: Smoke Test
- ⏳ t4 [architect] Build and startup smoke test [deps: t3]

### Phase: Runtime Validation
- ⏳ t5 [tester] Run automated regression tests and verify preserved behavior [deps: t4]

### Phase: Conformance & Completeness
- ⏳ t6 [teamlead] Review conformance and completeness of implementation and validation evidence [deps: t5]
