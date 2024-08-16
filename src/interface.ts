export type ObjectValues<T> = T[keyof T];

type TLesson = {
  id: string;
  name: string;
};

export type TChapter = { name: string; id: string; lessons: TLesson[] };
