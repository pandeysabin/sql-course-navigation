type TLesson = {
  id: string;
  name: string;
};

export type TChapter = { name: string; id: string; lessons: TLesson[] };

export type TLessonTable = {
  lesson_id: string;
  title: string;
  chapter_id: string;
  link: string;
  difficulty: string;
};
