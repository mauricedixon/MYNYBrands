export type Track = {
  id: number;
  title: string;
  artist: string;
  src: string;
};

export const playlist: Track[] = [
  {
    id: 1,
    title: "1997 BEAT TAPE",
    artist: "Kanye",
    src: "/track1.mp3", // User needs to add this file to /public
  },
  {
    id: 2,
    title: "Empire State of Mind",
    artist: "Jay-Z",
    src: "/track2.mp3", // User needs to add this file to /public
  },
  {
    id: 3,
    title: "C.R.E.A.M.",
    artist: "Wu-Tang Clan",
    src: "/track3.mp3", // User needs to add this file to /public
  },
];
