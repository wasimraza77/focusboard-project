# FocusBoard — Acceptance and Manual Test Plan

## Functional tests
- [ ] First launch shows at least six sample tasks with all required fields.
- [ ] Refresh after first launch retains the current task data.
- [ ] Existing localStorage data is not overwritten by sample data.
- [ ] Create with blank title shows a helpful validation message and does not add a task.
- [ ] Create with valid title adds a task and updates all derived counts.
- [ ] Edit changes the selected task without creating a duplicate.
- [ ] Delete asks for confirmation.
- [ ] Canceling delete leaves the task intact.
- [ ] Confirming delete removes it and updates all counts.
- [ ] Status can be changed to each of the three supported states.
- [ ] Status updates are reflected immediately in the list, filters, and statistics.
- [ ] Search matches title without case sensitivity.
- [ ] Status tabs filter correctly.
- [ ] Priority filter filters correctly.
- [ ] Search + status + priority filters compose simultaneously.
- [ ] Clear/reset filters returns the expected task set.
- [ ] Total, in-progress, completed, and completion percentage are derived from current task data.
- [ ] Carousel has exactly three slides.
- [ ] Previous and next work, including wrap behavior if implemented.
- [ ] Active indicator tracks the current slide.
- [ ] Indicator buttons navigate to their corresponding slide.
- [ ] Carousel content matches the Figma slides once inspected.

## Responsive tests
- [ ] 390px: no horizontal overflow; navigation and task actions remain usable.
- [ ] 390px: form fields and action buttons fit without horizontal scrolling.
- [ ] 390px: carousel text and controls are fully visible.
- [ ] 768px: summary and toolbar sections reflow cleanly.
- [ ] 768px: no clipped menus, cards, or form controls.
- [ ] 1440px: desktop layout uses space efficiently and preserves clear hierarchy.
- [ ] Browser zoom at 200% remains usable.

## Accessibility tests
- [ ] All form inputs have associated labels.
- [ ] Buttons have meaningful accessible names.
- [ ] Keyboard can reach and activate all controls.
- [ ] Focus is visible.
- [ ] Modal/drawer focus behavior is correct.
- [ ] Status and priority are conveyed by text, not color alone.
- [ ] Contrast is sufficient for text and controls.
- [ ] Reduced-motion preference is respected.

## Handoff tests
- [ ] README contains install/run/build instructions.
- [ ] README explains state-management and persistence decisions.
- [ ] README contains live URL and repository URL placeholders or final values.
- [ ] AI_USAGE.md accurately discloses tools, prompts, assisted areas, and one reviewed suggestion.
- [ ] Desktop screenshot included.
- [ ] Mobile screenshot included.
- [ ] Public GitHub repository contains source, package files, `.gitignore`, and commits.
- [ ] Hosted application is publicly accessible over HTTPS without login.
