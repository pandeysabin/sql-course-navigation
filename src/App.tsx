import * as React from "react";

import initSqlJs, { Database } from "sql.js";

import "./App.css";
import {
  CHAPTER_FIELDS_WITH_DATA_TYPE,
  CHAPTERS,
  CREATE_CHAPTERS_TABLE_QUERY,
  CREATE_LESSON_TABLE_QUERY,
  DATA_TO_INSERT_TO_CHAPTER_TABLE_QUERY,
  DATA_TO_INSERT_TO_LESSON_TABLE_QUERY,
  FIELDS_BY_TABLE,
  LESSONS_FIELDS_DATA_TYPE,
  TABLES,
  TChapterTableField,
  TLessonTableField,
  TTable,
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

  const [activeTables, setActiveTables] =
    React.useState<Record<string, initSqlJs.QueryExecResult[]>>();

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
        const query =
          `${CREATE_LESSON_TABLE_QUERY}${DATA_TO_INSERT_TO_LESSON_TABLE_QUERY}${CREATE_CHAPTERS_TABLE_QUERY}${DATA_TO_INSERT_TO_CHAPTER_TABLE_QUERY}` as const;

        db.run(query);

        const tablesWitData = Object.values(TABLES).reduce(
          (acc: Record<string, initSqlJs.QueryExecResult[]>, curr) => {
            const res = db.exec(`SELECT * FROM ${curr}`);

            acc = { ...acc, [curr]: res };

            return acc;
          },

          {}
        );

        setActiveTables(tablesWitData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [db]);

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

  const getFieldDataTypeForChapter = (
    table: TTable,
    fieldName: TChapterTableField | TLessonTableField
  ) => {
    switch (table) {
      case "chapters":
        return (
          <span className="course-name">
            [{CHAPTER_FIELDS_WITH_DATA_TYPE[fieldName]}]
          </span>
        );

      case "lessons":
        return (
          <span className="course-name">
            [{LESSONS_FIELDS_DATA_TYPE[fieldName]}]
          </span>
        );

      default:
        break;
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
        {Object.values(TABLES).map((table, chapterIdx) => {
          return (
            <React.Fragment key={table}>
              <div>
                <div>
                  <h4>{table}</h4>
                </div>

                <ol className="fields">
                  {FIELDS_BY_TABLE[table].map((field) => {
                    return (
                      <li className="field" key={field}>
                        <span style={{ fontSize: 14 }} className="lesson-name">
                          {field}
                        </span>
                        {getFieldDataTypeForChapter(table, field)}
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

        {queryResult.result?.map((result) => (
          <table>
            <thead>
              <tr>
                {result.columns.map((column) => (
                  <th>{column}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {result.values.map((value) => (
                <tr>
                  {value.map((rowValue) => (
                    <td key={rowValue?.toString()}>{rowValue}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>

      <div id="table-container">
        {Object.keys(activeTables ?? {}).map((tableName) => (
          <table className="chapter-table" key={tableName}>
            <caption>
              <span style={{ fontFamily: "EuclidCircularA-Regular" }}>
                Chapter:
              </span>
              <span style={{ marginLeft: 8 }}> {tableName}</span>
            </caption>
            <thead>
              <tr>
                {activeTables?.[tableName][0].columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {activeTables?.[tableName][0].values.map((row) => (
                <tr>
                  {row.map((rowValue) => (
                    <td key={rowValue?.toString()}>{rowValue}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </main>
  );
}

export default App;
