import { ObjectValues, TChapter, TLesson } from "./interface";

export const TABLES = {
  CHAPTERS: "chapters",
  LESSONS: "lessons",
} as const;

export type TTable = ObjectValues<typeof TABLES>;

const CHAPTER_TABLE_FIELDS = ["chapter_id", "title", "no_of_lessons"] as const;
export type TChapterTableField = (typeof CHAPTER_TABLE_FIELDS)[number];

export const CHAPTER_FIELDS_WITH_DATA_TYPE: Record<TChapterTableField, string> =
  {
    chapter_id: "int",
    no_of_lessons: "int",
    title: "varchar(50)",
  };

const LESSON_TABLE_FIELDS = [
  "lesson_id",
  "title",
  "chapter_id",
  // "link",
  // "difficulty",
] as const;
export type TLessonTableField = (typeof LESSON_TABLE_FIELDS)[number];

export const LESSONS_FIELDS_DATA_TYPE: Record<TLessonTableField, string> = {
  lesson_id: "int",
  title: "varchar(50)",
  chapter_id: "varchar(50)",
  // difficulty: "varchar(50)",
  // link: "varchar(50)",
} as const;

export const FIELDS_BY_TABLE = Object.values(TABLES).reduce(
  (
    acc: Record<
      TTable,
      readonly TChapterTableField[] | readonly TLessonTableField[]
    >,
    curr
  ) => {
    switch (curr) {
      case "chapters":
        acc = {
          ...acc,
          [curr]: CHAPTER_TABLE_FIELDS,
        };
        break;

      case "lessons":
        acc = { ...acc, [curr]: LESSON_TABLE_FIELDS };
        break;

      default:
        return acc;
    }

    return acc;
  },

  { lessons: [], chapters: [] }
);

export const CHAPTERS: TChapter[] = [
  {
    id: 1,
    title: "Introduction",
  },
  {
    id: 2,
    title: "Select Records",
  },
  {
    id: 3,
    title: "Aggregrate Functions",
  },
  {
    id: 4,
    title: "Filter Records",
  },

  {
    id: 5,
    title: "JOINs",
  },
  { id: 6, title: "Subquery" },
  { id: 7, title: "Insert, Update & Delete" },
  { id: 8, title: "Working With Tables" },
  { id: 9, title: "Constraints" },
  {
    id: 10,
    title: "Additional Topics",
  },
  { id: 11, title: "SQL Queries" },
];

const LESSONS: TLesson[] = [
  {
    title: "Getting Started",
    chapter_id: 1,
  },
  {
    chapter_id: 1,
    title: "Introduction to Database",
  },
  {
    title: "SQL SELECT",
    chapter_id: 2,
  },
  { title: "SELECT WHERE", chapter_id: 2 },
  { title: "AND, OR and NOT", chapter_id: 2 },
  { chapter_id: 2, title: "DISTINCT" },
  { chapter_id: 2, title: "IN and BETWEEN" },
  { chapter_id: 2, title: "ORDER BY" },
  { chapter_id: 2, title: "LIMIT" },
  { chapter_id: 2, title: "Summary" },
  { chapter_id: 3, title: "MIN() and MAX()" },
  { chapter_id: 3, title: "COUNT()" },
  { chapter_id: 3, title: "SUM() and AVG()" },
  { chapter_id: 3, title: "Summary" },
  { chapter_id: 4, title: "GROUP BY" },
  { chapter_id: 4, title: "HAVING" },
  { chapter_id: 4, title: "LIKE" },
  { chapter_id: 4, title: "Wildcards" },
  { chapter_id: 4, title: "SQL CASE" },
  { chapter_id: 4, title: "Summary" },
  { chapter_id: 5, title: "SQL JOINs" },
  { chapter_id: 5, title: "INNER JOIN" },
  { chapter_id: 5, title: "LEFT JOIN" },
  { chapter_id: 5, title: "RIGHT JOIN" },
  { chapter_id: 5, title: "FULL JOIN" },
  { chapter_id: 5, title: "Summary" },
  { chapter_id: 6, title: "Subquery" },
  { chapter_id: 6, title: "EXISTS" },
  { chapter_id: 6, title: "Summary" },
  { chapter_id: 7, title: "INSERT INTO" },
  { chapter_id: 7, title: "UPDATE" },
  { chapter_id: 7, title: "DELETE and TRUNCATE" },
  { chapter_id: 7, title: "Summary" },
  { chapter_id: 8, title: "Data Types" },
  { chapter_id: 8, title: "CREATE TABLE" },
  { chapter_id: 8, title: "CREATE TABLE" },
  { chapter_id: 8, title: "DROP TABLE" },
  { chapter_id: 8, title: "Summary" },
  { chapter_id: 9, title: "Constraints" },
  { chapter_id: 9, title: "UNIQUE Constraint" },
  { chapter_id: 9, title: "PRIMARY KEY" },
  { chapter_id: 9, title: "FOREIGN KEY" },
  { chapter_id: 9, title: "Summary" },
  { chapter_id: 10, title: "SQL Views" },
  { chapter_id: 10, title: "SQL Commands" },
  { chapter_id: 10, title: "Summary" },
  { chapter_id: 11, title: "SQL Queries" },
  { chapter_id: 11, title: "What's Next?" },
];

export const LESSONS_TABLE_DATA: Record<TLessonTableField, string | number>[] =
  LESSONS.map(({ chapter_id, title }, lessonIdx) => ({
    chapter_id,
    lesson_id: lessonIdx + 1,
    title,
  }));

export const CHAPTERS_TABLE_DATA: Record<
  TChapterTableField,
  string | number
>[] = CHAPTERS.map(({ id, title: name }) => ({
  chapter_id: id,
  title: name,
  no_of_lessons: LESSONS_TABLE_DATA.filter(
    ({ chapter_id }) => chapter_id === id
  ).length,
}));

export const CREATE_LESSON_TABLE_QUERY = `CREATE TABLE ${TABLES.LESSONS} (
  ${Object.keys(LESSONS_FIELDS_DATA_TYPE)
    .map(
      (fieldWithDataType) =>
        // @ts-expect-error Object.keys() doesn't give constant value
        `${fieldWithDataType} ${LESSONS_FIELDS_DATA_TYPE[fieldWithDataType]}`
    )
    .join(", ")}
  );` as const;

export const DATA_TO_INSERT_TO_LESSON_TABLE_QUERY = `INSERT INTO ${
  TABLES.LESSONS
} (${LESSON_TABLE_FIELDS.map((field) => field).join(", ")})
  VALUES
  ${LESSONS_TABLE_DATA.map(({ chapter_id, lesson_id, title }) => {
    return `("${lesson_id}", "${title}", "${chapter_id}")`;
  }).join(",")};` as const;

export const CREATE_CHAPTERS_TABLE_QUERY = `CREATE TABLE ${TABLES.CHAPTERS} (
${Object.keys(CHAPTER_FIELDS_WITH_DATA_TYPE)
  .map(
    // @ts-expect-error Object.keys() is unable to find the type of the parameter
    (fieldName) => `${fieldName} ${CHAPTER_FIELDS_WITH_DATA_TYPE[fieldName]}`
  )
  .join(", ")}
);` as const;

export const DATA_TO_INSERT_TO_CHAPTER_TABLE_QUERY = `INSERT INTO ${
  TABLES.CHAPTERS
} (
${CHAPTER_TABLE_FIELDS.map((field) => field).join(", ")}
) VALUES ${CHAPTERS_TABLE_DATA.map(
  ({ chapter_id, title, no_of_lessons }) =>
    `("${chapter_id}", "${title}", "${no_of_lessons}")`
)};` as const;
