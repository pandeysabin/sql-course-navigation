import { TChapter } from "./interface";

export const CHAPTERS: TChapter[] = [
  {
    id: "chapter-01",
    name: "Introduction",
    lessons: [
      {
        id: "lesson-1",
        name: "Introduction to Course",
      },
    ],
  },
  {
    id: "chapter-02",
    name: "SQL Basic Queries",
    lessons: [
      {
        id: "lesson-1",
        name: "Top 4 Teams in the Leauge",
      },
      { id: "lesson-2", name: "Popular Books in the Last Decade" },
      { id: "lesson-3", name: "Laptop vs. Mobile Viewership" },
      { id: "lesson-4", name: "Either/Or But Not Both" },
      { id: "lesson-5", name: "Order Alphabetically When Condition is Met" },
    ],
  },
  {
    id: "chapter-03",
    name: "Intermediate Questions",
    lessons: [
      {
        id: "lesson-1",
        name: "Retrieve Orders Delivered In Certain Days",
      },
      { id: "lesson-2", name: "Sort the Monthly Sales" },
      { id: "lesson-3", name: "Sort the Candidates in Ascending Order" },
      { id: "lesson-4", name: "Books With Multiple Words But No 'Z'" },
      { id: "lesson-5", name: "Movies With Duration Greater Than Average" },
      { id: "lesson-6", name: "Anime With Above Average Ratings" },
      { id: "lesson-7", name: "Largest Non-Repeating Number" },
      { id: "lesson-8", name: "Interesting Movies With Odd Numbered IDs" },
      { id: "lesson-9", name: "Daily Active Users" },
      { id: "lesson-10", name: "JOIN Two Tables" },
    ],
  },
  {
    id: "chapter-04",
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
    id: "chapter-05",
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
