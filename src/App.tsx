import * as React from "react";

import Editor, { Monaco } from "@monaco-editor/react";

import initSqlJs, { Database } from "sql.js";

import "./App.css";
import {
  CHAPTERS,
  CREATE_CHAPTERS_TABLE_QUERY,
  CREATE_LESSON_TABLE_QUERY,
  DATA_TO_INSERT_TO_CHAPTER_TABLE_QUERY,
  DATA_TO_INSERT_TO_LESSON_TABLE_QUERY,
} from "./consts";
import { TTableInfo } from "./interface";

function App() {
  const [userQuery, setUserQuery] = React.useState<string | undefined>(
    `SELECT * FROM lessons;`
  );

  const [queryResult, setQueryResult] = React.useState<{
    result: initSqlJs.QueryExecResult[] | null;
    error: string | null;
  }>({
    result: null,
    error: null,
  });

  const [activeTables, setActiveTables] =
    React.useState<Record<string, initSqlJs.QueryExecResult[]>>();

  const activeTableNames = Object.keys(activeTables ?? {});

  const [db, setDb] = React.useState<Database>();

  const [error, setError] = React.useState<string>();

  const [tableInfo, setTableInfo] = React.useState<TTableInfo[]>();

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
          `${CREATE_CHAPTERS_TABLE_QUERY}${DATA_TO_INSERT_TO_CHAPTER_TABLE_QUERY}${CREATE_LESSON_TABLE_QUERY}${DATA_TO_INSERT_TO_LESSON_TABLE_QUERY}` as const;

        db.run(query);
      }
    } catch (error) {
      console.error(error);
    }
  }, [db]);

  React.useEffect(() => {
    if (db !== undefined) {
      const tablesResult = db.exec(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
      );

      const tableNames = tablesResult[0] ? tablesResult[0].values.flat() : [];

      let newTables = structuredClone(activeTables);

      const tables = tableNames.map((tableName): TTableInfo => {
        const allDataOfTheTable = db.exec(`SELECT * FROM ${tableName}`);

        newTables = { ...newTables, [tableName]: allDataOfTheTable };

        const result = db.exec(`PRAGMA table_info(${tableName})`);

        return {
          fieldsWithType: result[0].values.map((col) => ({
            dataType: col[2]?.toString() ?? "",
            fieldName: col[1]?.toString() ?? "",
          })),

          tableName: tableName?.toString() ?? "",
        };
      });

      setActiveTables(newTables);

      setTableInfo(tables);
    }
  }, [queryResult, db]);

  const handleQueryRun = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (db === undefined || userQuery === undefined) {
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

  const handleEditorWillMount = (monaco: Monaco) => {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.editor.defineTheme("greyTheme", {
      base: "vs-dark", // or 'vs' for light mode
      inherit: true,
      rules: [
        { background: "2E2E2E" }, // Grey background color
        { token: "", foreground: "D4D4D4" }, // Light grey text color
      ],
      colors: {
        "editor.background": "#2E2E2E", // Editor background color
        "editor.foreground": "#D4D4D4", // Default text color
        "editorLineNumber.foreground": "#5A5A5A", // Line numbers color
        "editorCursor.foreground": "#FFFFFF", // Cursor color
        "editor.selectionBackground": "#4B4B4B", // Selection background color
        "editor.lineHighlightBackground": "#333333", // Current line highlight color
        "editorIndentGuide.background": "#404040", // Indentation guide color
        "editorIndentGuide.activeBackground": "#606060", // Active indentation guide color
      },
    });
  };

  const renderOutputContainer = (
    result: initSqlJs.QueryExecResult[] | null,
    error: string | null
  ) => {
    if (error === null) {
      return <p style={{ color: "red" }}>{queryResult.error}</p>;
    }

    if (result === null) {
      return <p>Your output will be displayed here.</p>;
    }

    return result.map((result, resultIdx) => (
      <table key={`table-of-query-result-${resultIdx}`}>
        <thead>
          <tr>
            {result.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {result.values.map((value, queryResultTBodyIdx) => (
            <tr
              key={`query-result-body-row-${resultIdx}-${queryResultTBodyIdx}`}
            >
              {value.map((rowValue) => (
                <td key={rowValue?.toString()}>{rowValue}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ));
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
        {tableInfo?.map((table, chapterIdx) => {
          return (
            <React.Fragment key={table.tableName}>
              <div>
                <div>
                  <h4>{table.tableName}</h4>
                </div>

                <ol className="fields">
                  {table.fieldsWithType.map((field) => {
                    return (
                      <li className="field" key={field.fieldName}>
                        <span style={{ fontSize: 14 }} className="lesson-name">
                          {field.fieldName}
                        </span>

                        <span className="course-name">[{field.dataType}]</span>
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
          {/* <input
            id="query-input"
            value={userQuery}
            placeholder="Write your query"
            onChange={({ target: { value } }) => {
              setUserQuery(value);
            }}
          /> */}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span />
            <button type="submit" className="query-run-button">
              Run
            </button>
          </div>

          <hr />

          <Editor
            height={"50vh"}
            language="sql"
            defaultValue={userQuery}
            onChange={(value) => {
              setUserQuery(value);
            }}
            className="editor-container"
            options={{ fontSize: 14 }}
            beforeMount={handleEditorWillMount}
            theme="greyTheme"
          />

          <hr />
        </form>

        {renderOutputContainer(
          structuredClone(queryResult.result),
          queryResult.error
        )}
      </div>

      <div id="table-container">
        {activeTableNames.map((tableName, tableIdx) => {
          if (activeTables?.[tableName].length === 0) return null;

          return (
            <React.Fragment key={tableName}>
              <table className="chapter-table">
                <caption>
                  <span style={{ fontFamily: "EuclidCircularA-Regular" }}>
                    Table:
                  </span>
                  <span style={{ marginLeft: 8 }}> {tableName}</span>
                </caption>
                <thead>
                  <tr>
                    {activeTables?.[tableName][0]?.columns.map((column) => (
                      <th key={`${tableName}-${column}`}>{column}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {activeTables?.[tableName][0]?.values.map((row, idx) => (
                    <tr
                      key={`${tableName}-${tableIdx}-availbleTable-row-${idx}`}
                    >
                      {row.map((rowValue, rowValueIdx) => (
                        <td
                          key={`${tableName}-${rowValueIdx}-${rowValue?.toString()}`}
                        >
                          {rowValue}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {activeTableNames.length - 1 !== tableIdx && (
                <div>
                  <hr />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default App;
