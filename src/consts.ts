import { TChapter, TLessonTable } from "./interface";

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

export const LESSONS_TABLE_DATA: TLessonTable[] = [
  {
    chapter_id: "chapter_01",
    difficulty: "",
    lesson_id: "lesson-01",
    link: "",
    title: "Introduction to Course",
  },
  {
    lesson_id: "lesson-01",
    title: "Top 4 Teams in the Leauge",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-02",
    title: "Popular Books in the Last Decade",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-03",
    title: "Laptop vs. Mobile Viewership",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-04",
    title: "Either/Or But Not Both",
    chapter_id: "",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-05",
    title: "Order Alphabetically When Condition is Met",
    chapter_id: "chapter_02",
    difficulty: "",
    link: "",
  },

  {
    lesson_id: "lesson-1",
    title: "Retrieve Orders Delivered In Certain Days",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-2",
    title: "Sort the Monthly Sales",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-3",
    title: "Sort the Candidates in Ascending Order",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-4",
    title: "Books With Multiple Words But No 'Z'",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-5",
    title: "Movies With Duration Greater Than Average",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-6",
    title: "Anime With Above Average Ratings",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-7",
    title: "Largest Non-Repeating Number",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },

  {
    lesson_id: "lesson-8",
    title: "Interesting Movies With Odd Numbered IDs",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-9",
    title: "Daily Active Users",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
  {
    lesson_id: "lesson-10",
    title: "JOIN Two Tables",
    chapter_id: "chapter_03",
    difficulty: "",
    link: "",
  },
];

const TABLES = {
  LESSONS: "lessons",
} as const;

export const CREATE_LESSON_TABLE_QUERY = `CREATE TABLE ${TABLES.LESSONS} (id INT PRIMARY KEY, lesson_id VARCHAR(50), title VARCHAR(50), chapter_id VARCHAR(50), link VARCHAR(50), difficulty VARCHAR(50));`;

export const DATA_TO_INSERT_TO_LESSON_TABLE = `INSERT INTO ${
  TABLES.LESSONS
} (lesson_id, title, chapter_id, link, difficulty)
  VALUES
  ${LESSONS_TABLE_DATA.map(
    ({ chapter_id, difficulty, lesson_id, link, title }) => {
      return `("${lesson_id}", "${title}", "${chapter_id}", "${link}", "${difficulty}")`;
    }
  ).join(",")};`;
