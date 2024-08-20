export type ObjectValues<T> = T[keyof T];

export type TChapter = { title: string; id: number };

export type TLesson = { title: string; chapter_id: TChapter["id"] };

export type TTableInfo = {
  tableName: string;
  fieldsWithType: {
    fieldName: string;
    dataType: string;
  }[];
};
