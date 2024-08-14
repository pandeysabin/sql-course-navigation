import * as React from "react";

import "./App.css";
import { CHAPTERS } from "./consts";
import { TChapter } from "./interface";

function App() {
  const [userQuery, setUserQuery] = React.useState("");

  const [selectedChapter, setSelectedChapter] = React.useState<TChapter>();

  const handleQueryRun = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const splittedBySemiColon = userQuery.split(";");
    const stringAfterJoin = splittedBySemiColon.join("");

    const splittedBySpace = stringAfterJoin.split(" ");

    const chapter_name = splittedBySpace[splittedBySpace.length - 1];

    const chapterSelectedByUserQuery = CHAPTERS.find(
      (chapter) => chapter.id === chapter_name
    );

    setSelectedChapter(chapterSelectedByUserQuery);
  };

  return (
    <main className="main-container">
      <nav className="nav-container">
        {CHAPTERS.map((chapter, chapterIdx) => {
          return (
            <React.Fragment key={chapter.id}>
              <div>
                <div>
                  <h4>{chapter.id}</h4>
                  <span className="course-name"> ({chapter.name})</span>
                </div>

                <ol className="lessons">
                  {chapter.lessons.map((lesson) => {
                    return (
                      <li className="lesson" key={lesson.id}>
                        <h5 className="lesson-name">{lesson.name}</h5>
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

      <div className="body-container">
        <form onSubmit={handleQueryRun} className="query-form">
          <input
            id="query-input"
            placeholder="SELECT * FROM chapter_01;"
            onChange={({ target: { value } }) => {
              setUserQuery(value);
            }}
          />

          <button type="submit" className="query-run-button">
            Run
          </button>
        </form>

        <div id="table-container">
          {selectedChapter !== undefined ? (
            <table className="chapter-table">
              <caption>Chapter: {selectedChapter?.name}</caption>
              <thead>
                <tr>
                  <th>lesson_id</th>
                  <th>title</th>
                  <th>link</th>
                  <th>difficulty</th>
                </tr>
              </thead>

              <tbody>
                {selectedChapter?.lessons.map((lesson) => {
                  return (
                    <tr key={lesson.id}>
                      <td>{lesson.id}</td>
                      <td>{lesson.name}</td>
                      <td>
                        <a href="#">Link here</a>
                      </td>
                      <td>1</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <h1 style={{ margin: 24 }}>Table will be displayed here</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
