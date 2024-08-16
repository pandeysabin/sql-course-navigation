import { ObjectValues, TChapter } from "./interface";

export const TABLES = {
  LESSONS: "lessons",
  CHAPTERS: "chapters",
} as const;

export type TTable = ObjectValues<typeof TABLES>;

const CHAPTER_TABLE_FIELDS = ["chapter_id", "title", "no_of_lessons"] as const;
export type TChapterTableField = (typeof CHAPTER_TABLE_FIELDS)[number];

export const CHAPTER_FIELDS_WITH_DATA_TYPE: Record<TChapterTableField, string> =
  {
    chapter_id: "varchar(50)",
    no_of_lessons: "int",
    title: "varchar(50)",
  };

const LESSON_TABLE_FIELDS = [
  "lesson_id",
  "title",
  "chapter_id",
  "link",
  "difficulty",
] as const;
export type TLessonTableField = (typeof LESSON_TABLE_FIELDS)[number];

export const LESSONS_FIELDS_DATA_TYPE: Record<TLessonTableField, string> = {
  lesson_id: "varchar(50)",
  title: "varchar(50)",
  chapter_id: "varchar(50)",
  difficulty: "varchar(50)",
  link: "varchar(50)",
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
    id: "chapter_01",
    name: "Introduction",
    lessons: [],
  },
  {
    id: "chapter_02",
    name: "SQL Basic Queries",
    lessons: [],
  },
  {
    id: "chapter_03",
    name: "Intermediate Questions",
    lessons: [],
  },
  {
    id: "chapter_04",
    name: "Advanced Questions",
    lessons: [
      {
        id: "lesson-01",
        name: "Delete Duplicate Rows From a Table",
      },
      { id: "lesson-02", name: "Top 3 Highest-Paid Employees" },
      { id: "lesson-03", name: "Pivot Tables" },
      { id: "lesson-04", name: "Fix the Names" },
      { id: "lesson-04", name: "Customer Payment in 7 Days" },
      { id: "lesson-06", name: "JOIN Three Tables" },
      { id: "lesson-07", name: "Employees and Salaries" },
      { id: "lesson-08", name: "Query Optimization" },
      { id: "lesson-09", name: "Gameplay Analysis" },
      { id: "lesson-10", name: "Highest Rated Episode" },
    ],
  },

  {
    id: "chapter_05",
    name: "What's Wrong With This Code?",
    lessons: [
      { id: "lesson-01", name: "Introduction" },
      { id: "lesson-02", name: "Unique Key Logical Error" },
      { id: "lesson-03", name: "Naming Conflict" },
      { id: "lesson-04", name: "String vs. Numeric Comparison" },
      { id: "lesson-05", name: "JOIN Type" },
      { id: "lesson-06", name: "Wrong Use of GROUP BY" },
      { id: "lesson-07", name: "Using BETWEEN" },
      { id: "lesson-08", name: "ON DELETE CASCADE" },
      { id: "lesson-09", name: "Missing WHERE Clause" },
      { id: "lesson-10", name: "Multiple Primary Keys" },
      { id: "lesson-11", name: "Reference Error" },
      { id: "lesson-12", name: "Incorrect Table Alias" },
      { id: "lesson-13", name: "Incorrect Alias Reference" },
      { id: "lesson-14", name: "Logical Error" },
      { id: "lesson-15", name: "Incorrect JOIN Reference" },
      { id: "lesson-16", name: "Incorrect Use of CASE" },
    ],
  },
];

export const LESSONS_TABLE_DATA: Record<TLessonTableField, string>[] = [
  {
    chapter_id: "chapter_01",
    difficulty: "",
    lesson_id: "lesson-01-01",
    link: "",
    title: "Introduction to Course",
  },
  {
    lesson_id: "lesson-02-01",
    title: "Top 4 Teams in the Leauge",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-02-02",
    title: "Popular Books in the Last Decade",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-02-03",
    title: "Laptop vs. Mobile Viewership",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-02-04",
    title: "Either/Or But Not Both",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-02-05",
    title: "Order Alphabetically When Condition is Met",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },

  {
    lesson_id: "lesson-03-01",
    title: "Retrieve Orders Delivered In Certain Days",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-02",
    title: "Sort the Monthly Sales",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-03",
    title: "Sort the Candidates in Ascending Order",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-04",
    title: "Books With Multiple Words But No 'Z'",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-05",
    title: "Movies With Duration Greater Than Average",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-06",
    title: "Anime With Above Average Ratings",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-07",
    title: "Largest Non-Repeating Number",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },

  {
    lesson_id: "lesson-03-08",
    title: "Interesting Movies With Odd Numbered IDs",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-09",
    title: "Daily Active Users",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03-10",
    title: "JOIN Two Tables",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
];

export const CHAPTERS_TABLE_DATA: Record<
  TChapterTableField,
  string | number
>[] = [
  {
    chapter_id: "chapter_01",
    title: "Introduction",
    no_of_lessons: 1,
  },

  {
    chapter_id: "chapter_02",
    title: "SQL Basic Queries",
    no_of_lessons: 5,
  },

  {
    chapter_id: "chapter_03",
    title: "Intermediate Questions",
    no_of_lessons: 10,
  },
];

// ObjectValues<typeof LESSON_TABLE_FIEDS>;

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
  ${LESSONS_TABLE_DATA.map(
    ({ chapter_id, difficulty, lesson_id, link, title }) => {
      return `("${lesson_id}", "${title}", "${chapter_id}", "${link}", "${difficulty}")`;
    }
  ).join(",")};` as const;

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
