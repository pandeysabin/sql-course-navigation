export type ObjectValues<T> = T[keyof T];

export type TTableInfo = {
  tableName: string;
  fieldsWithType: {
    fieldName: string;
    dataType: string;
  }[];
};

export type TChapterWithoutNoOfLessons = {
  title: string;
  chapter_id: number;
};

export type TLessonFieldsWitoutId = {
  title: string;
  chapter_id: TChapterFields["chapter_id"];
};

// 'chapters' table column fields & it's type.
export type TChapterFields = TChapterWithoutNoOfLessons & {
  no_of_lessons: number;
};

// 'lessons' table column fields & it's type
export type TLessonFields = TLessonFieldsWitoutId & {
  lesson_id: number;
};
