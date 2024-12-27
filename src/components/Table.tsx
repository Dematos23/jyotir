import { TableProps } from "@/types/table.types";

interface Data {
  id: String | undefined;
  [key: string]: any;
}
export default async function Table<T extends Data>({
  handleData,
  data,
  headers,
  thInRowHeaders,
  columnButton,
  columnButtonFunction,
}: TableProps<T>) {

  // const content = await handleData()
  return (
    <div className="fixed max-h-[calc(100vh-250px)] scrollbar-hide overflow-y-auto shadow-md rounded-lg m-8 table-width">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              {thInRowHeaders && thInRowHeaders.length > 0
                ? thInRowHeaders[0].head
                : null}
            </th>
            {headers.map((header) => (
              <th key={header.head} scope="col" className="px-6 py-3">
                {header.head}
              </th>
            ))}
            {columnButton ? <th scope="col" className="px-6 py-3"></th> : <></>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              {/* Primera Columna de las filas */}
              {thInRowHeaders ? (
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {thInRowHeaders.map((header) => {
                    const keys = Object.keys(item);
                    const value =
                      header.location !== undefined &&
                      header.location < keys.length
                        ? item[keys[header.location]]
                        : "No data";

                    return `${String(value)} `;
                  })}
                </th>
              ) : null}
              {headers.map((header, index) => {
                const keys = Object.keys(item);
                const value =
                  header.location !== undefined && header.location < keys.length
                    ? item[keys[header.location]]
                    : "";
                return (
                  <td key={index} className="px-6 py-4">
                    {String(value)}
                  </td>
                );
              })}

              {columnButton && columnButtonFunction ? (
                <td className="px-6 py-4">
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:cursor-pointer hover:underline"
                    onClick={() => columnButtonFunction(item)}
                  >
                    {columnButton}
                  </a>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
