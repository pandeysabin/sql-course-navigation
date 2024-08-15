import * as React from "react";

import initSqlJs, { Database } from "sql.js";

import "./App.css";
import {
  CHAPTERS,
  CREATE_LESSON_TABLE_QUERY,
  DATA_TO_INSERT_TO_LESSON_TABLE_QUERY,
} from "./consts";

function App() {
  const [userQuery, setUserQuery] = React.useState(`SELECT * FROM lessons;`);

  const [queryResult, setQueryResult] = React.useState<{
    result: initSqlJs.QueryExecResult[] | null;
    error: string | null;
  }>({
    result: null,
    error: null,
  });

  const [db, setDb] = React.useState<Database>();

  const [error, setError] = React.useState<string>();

  const initDatabase = async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      setDb(new SQL.Database());
    } catch (err) {
      let message = "Error while instantiating the database.";

      if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    }
  };

  React.useEffect(() => {
    initDatabase();
  }, []);

  React.useEffect(() => {
    try {
      if (db !== undefined) {
        const query = `${CREATE_LESSON_TABLE_QUERY}${DATA_TO_INSERT_TO_LESSON_TABLE_QUERY}`;

        db.run(query);
      }
    } catch (error) {
      console.error(error);
    }
  }, [db]);

  console.log({ queryResult });

  const handleQueryRun = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (db === undefined) {
      return;
    }

    try {
      const result = db.exec(userQuery);

      setQueryResult({ error: null, result });
    } catch (error) {
      let message = "Unable to execute the query";

      if (error instanceof Error) {
        message = error.message;
      }

      setQueryResult({ error: message, result: null });

      console.error(message);
    }
  };

  if (db === undefined) {
    return <p>loading...</p>;
  }

  if (error !== undefined) {
    return <p>{error}</p>;
  }

  return (
    <main className="main-container">
      <nav className="nav-container">
        {CHAPTERS.map((chapter, chapterIdx) => {
          return (
            <React.Fragment key={chapter.id}>
              <div>
                <div>
                  <h4>{chapter.id}</h4>
                  <span className="course-name">({chapter.name})</span>
                </div>

                <ol className="lessons">
                  {chapter.lessons.map((lesson) => {
                    return (
                      <li className="lesson" key={lesson.id}>
                        <span style={{ fontSize: 14 }} className="lesson-name">
                          {lesson.name}
                        </span>
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
            value={userQuery}
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
          {queryResult !== undefined ? (
            <table className="chapter-table">
              <caption>
                <span style={{ fontFamily: "EuclidCircularA-Regular" }}>
                  Chapter:
                </span>
                <span style={{ marginLeft: 8 }}></span>
              </caption>
              <thead>
                <tr>
                  <th>lesson_id</th>
                  <th>title</th>
                  <th>link</th>
                  <th>difficulty</th>
                </tr>
              </thead>

              <tbody>
                {/* <tr key={lesson.id}>
                  <td>{lesson.id}</td>
                  <td>{lesson.name}</td>
                  <td>
                    <a href="#">Link here</a>
                  </td>
                  <td>1</td>
                </tr> */}
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
