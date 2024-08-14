import * as React from "react";

import "./App.css";
import { CHAPTERS } from "./consts";

function App() {
  return (
    <main className="main-container">
      <nav className="nav-container">
        {CHAPTERS.map((chapter, chapterIdx) => {
          return (
            <React.Fragment key={chapter.id}>
              <div>
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

              {chapterIdx !== CHAPTERS.length - 1 && <hr />}
            </React.Fragment>
          );
        })}
      </nav>
    </main>
  );
}

export default App;
