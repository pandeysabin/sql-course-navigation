import "./App.css";

type Lesson = {
  id: string;
  name: string;
};

type Chapter = { name: string; id: string; lessons: Lesson[] };

function App() {
  const chapters: Chapter[] = [
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

  return (
    <main className="main-container">
      <nav className="nav-container">
        {chapters.map((chapter, chapterIdx) => {
          return (
            <>
              <div key={chapter.id}>
                <div className="course-name">
                  <h4>{chapter.name}</h4>
                </div>

                <ol className="lessons">
                  {chapter.lessons.map((lesson) => {
                    return (
                      <li className="lesson">
                        <h5 className="lesson-name" key={lesson.id}>
                          {lesson.name}
                        </h5>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {chapterIdx !== chapters.length - 1 && <hr />}
            </>
          );
        })}
      </nav>
    </main>
  );
}

export default App;
