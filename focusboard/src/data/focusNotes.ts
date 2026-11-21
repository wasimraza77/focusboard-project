import type { FocusNote } from "../types/task";

export const focusNotes: FocusNote[] = [
  {
    id: 1,
    step: "01 / 03",
    title: "Make today count.",
    description: "A little focus goes a long way.",
    cardTitle: "Design landing page",
    cardProgress: 45,
    cardCompleted: false,
  },
  {
    id: 2,
    step: "02 / 03",
    title: "Small steps, big progress.",
    description: "Keep your momentum going.",
    cardTitle: "Fix mobile navigation",
    cardProgress: 60,
    cardCompleted: false,
  },
  {
    id: 3,
    step: "03 / 03",
    title: "Celebrate the wins.",
    description: "Every finished task moves you forward.",
    cardTitle: "Onboarding Copy",
    cardProgress: 100,
    cardCompleted: true,
  },
];
