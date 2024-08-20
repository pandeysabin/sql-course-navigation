import {
  ObjectValues,
  TChapterFields,
  TChapterWithoutNoOfLessons,
  TLessonFields,
  TLessonFieldsWitoutId,
} from "./interface";

export const TABLES = {
  CHAPTERS: "chapters",
  LESSONS: "lessons",
} as const;

export type TTable = ObjectValues<typeof TABLES>;

export const CHAPTERS_TABLE_FIELDS_WITH_DATA_TYPE: Record<
  keyof TChapterFields,
  string
> = {
  chapter_id: "INT",
  title: "varchar(50)",
  no_of_lessons: "INT",
};

const CHAPTERS_TABLE_FIELDS = Object.keys(
  CHAPTERS_TABLE_FIELDS_WITH_DATA_TYPE
) as unknown as (keyof TChapterFields)[];

export const LESSONS_TABLE_FIELDS_DATA_TYPE: Record<
  keyof TLessonFields,
  string
> = {
  lesson_id: "INT",
  title: "varchar(50)",
  chapter_id: "varchar(50)",
} as const;

const LESSONS_TABLE_FIELDS = Object.keys(
  LESSONS_TABLE_FIELDS_DATA_TYPE
) as unknown as (keyof TLessonFields)[];

export const CHAPTERS: TChapterWithoutNoOfLessons[] = [
  {
    chapter_id: 1,
    title: "Introduction",
  },
  {
    chapter_id: 2,
    title: "Select Records",
  },
  {
    chapter_id: 3,
    title: "Aggregrate Functions",
  },
  {
    chapter_id: 4,
    title: "Filter Records",
  },
  {
    chapter_id: 5,
    title: "JOINs",
  },
  { chapter_id: 6, title: "Subquery" },
  { chapter_id: 7, title: "Insert, Update & Delete" },
  { chapter_id: 8, title: "Working With Tables" },
  { chapter_id: 9, title: "Constraints" },
  {
    chapter_id: 10,
    title: "Additional Topics",
  },
  { chapter_id: 11, title: "SQL Queries" },
];

const LESSONS: TLessonFieldsWitoutId[] = [
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

export const LESSONS_TABLE_DATA: Record<
  keyof TLessonFields,
  string | number
>[] = LESSONS.map(({ chapter_id, title }, lessonIdx) => ({
  chapter_id,
  lesson_id: lessonIdx + 1,
  title,
}));

export const CHAPTERS_TABLE_DATA: Record<
  keyof TChapterFields,
  string | number
>[] = CHAPTERS.map(({ chapter_id: id, title: name }) => ({
  chapter_id: id,
  title: name,
  no_of_lessons: LESSONS_TABLE_DATA.filter(
    ({ chapter_id }) => chapter_id === id
  ).length,
}));

export const CREATE_LESSONS_TABLE_QUERY = `CREATE TABLE ${TABLES.LESSONS} (
  ${LESSONS_TABLE_FIELDS.map(
    (fieldWithDataType) =>
      `${fieldWithDataType} ${LESSONS_TABLE_FIELDS_DATA_TYPE[fieldWithDataType]}`
  ).join(", ")}
  );` as const;

export const DATA_TO_INSERT_TO_LESSONS_TABLE_QUERY = `INSERT INTO ${
  TABLES.LESSONS
} (
lesson_id, title, chapter_id
)
VALUES
${LESSONS_TABLE_DATA.map(({ chapter_id, lesson_id, title }) => {
  return `("${lesson_id}", "${title}", "${chapter_id}")`;
}).join(",")};` as const;

export const CREATE_CHAPTERS_TABLE_QUERY = `CREATE TABLE ${TABLES.CHAPTERS} (
${CHAPTERS_TABLE_FIELDS.map(
  (fieldName) =>
    `${fieldName} ${CHAPTERS_TABLE_FIELDS_WITH_DATA_TYPE[fieldName]}`
).join(", ")}
);` as const;

export const DATA_TO_INSERT_TO_CHAPTERS_TABLE_QUERY = `INSERT INTO ${
  TABLES.CHAPTERS
} (
chapter_id, title, no_of_lessons
) VALUES ${CHAPTERS_TABLE_DATA.map(
  ({ chapter_id, title, no_of_lessons }) =>
    `("${chapter_id}", "${title}", "${no_of_lessons}")`
)};` as const;
