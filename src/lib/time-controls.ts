export type TimeControlType = "none" | "bullet" | "blitz" | "rapid" | "classical";

export interface TimeControl {
  id: string;
  name: string;
  description: string;
  type: TimeControlType;
  initialTime: number; // in seconds
  increment: number; // in seconds
}

export const TIME_CONTROLS: TimeControl[] = [
  {
    id: "unlimited",
    name: "Unlimited",
    description: "No time limit.",
    type: "none",
    initialTime: Infinity,
    increment: 0,
  },
  {
    id: "1m",
    name: "1 | 0",
    description: "1 minute per side.",
    type: "bullet",
    initialTime: 60,
    increment: 0,
  },
  {
    id: "1m_1s",
    name: "1 | 1",
    description: "1 minute per side, 1 second increment.",
    type: "bullet",
    initialTime: 60,
    increment: 1,
  },
    {
    id: "2m_1s",
    name: "2 | 1",
    description: "2 minutes per side, 1 second increment.",
    type: "bullet",
    initialTime: 120,
    increment: 1,
  },
  {
    id: "3m",
    name: "3 | 0",
    description: "3 minutes per side.",
    type: "blitz",
    initialTime: 180,
    increment: 0,
  },
  {
    id: "3m_2s",
    name: "3 | 2",
    description: "3 minutes per side, 2 second increment.",
    type: "blitz",
    initialTime: 180,
    increment: 2,
  },
  {
    id: "5m",
    name: "5 | 0",
    description: "5 minutes per side.",
    type: "blitz",
    initialTime: 300,
    increment: 0,
  },
    {
    id: "5m_3s",
    name: "5 | 3",
    description: "5 minutes per side, 3 second increment.",
    type: "blitz",
    initialTime: 300,
    increment: 3,
  },
  {
    id: "10m",
    name: "10 | 0",
    description: "10 minutes per side.",
    type: "rapid",
    initialTime: 600,
    increment: 0,
  },
    {
    id: "10m_5s",
    name: "10 | 5",
    description: "10 minutes per side, 5 second increment.",
    type: "rapid",
    initialTime: 600,
    increment: 5,
  },
  {
    id: "15m_10s",
    name: "15 | 10",
    description: "15 minutes per side, 10 second increment.",
    type: "rapid",
    initialTime: 900,
    increment: 10,
  },
  {
    id: "30m",
    name: "30 | 0",
    description: "30 minutes per side.",
    type: "classical",
    initialTime: 1800,
    increment: 0,
  },
  {
    id: "30m_20s",
    name: "30 | 20",
    description: "30 minutes per side, 20 second increment.",
    type: "classical",
    initialTime: 1800,
    increment: 20,
  },
];
