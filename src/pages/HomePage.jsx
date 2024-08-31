import Loading from "../components/Loading";
import GetData from "../hooks/GetData";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Destructure the data and loading states correctly using the custom hook
  const [data, loading] = GetData("http://localhost:5000/");

  return (
    <>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          {!loading ? (
            <tbody>
              {data.map((e) => (
                <tr
                  key={e.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {e.id}
                  </th>
                  <td className='px-6 py-4'>{e.name}</td>
                  <td className='px-6 py-4'>{e.email}</td>
                  <td>
                    <Link to={`${e.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <Loading />
          )}
        </table>
      </div>
    </>
  );
}
