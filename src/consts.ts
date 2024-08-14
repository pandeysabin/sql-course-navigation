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
];
