import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';

export default function Index({ auth, users, queryParams = null, success }) {
  queryParams = queryParams || {};

  const sortChange = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction =
        queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }

    router.get(route('user.index'), queryParams);
  };

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('user.index'), queryParams);
  };

  const onKeyPress = (name, event) => {
    if (event.key !== 'Enter') return;

    searchFieldChanged(name, event.target.value);
  };

  const deleteUser = (user) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    router.delete(route('user.destroy', user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>
          <Link
            href={route('user.create')}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounder-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <TableHeading>ID</TableHeading>
                    <TableHeading
                      name="name"
                      field={queryParams.sort_field}
                      direction={queryParams.sort_direction}
                      sortChange={sortChange}
                    >
                      User Name
                    </TableHeading>
                    <TableHeading
                      name="name"
                      field={queryParams.sort_field}
                      direction={queryParams.sort_direction}
                      sortChange={sortChange}
                    >
                      Email
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      field={queryParams.sort_field}
                      direction={queryParams.sort_direction}
                      sortChange={sortChange}
                    >
                      Create Date
                    </TableHeading>
                    <TableHeading>Actions</TableHeading>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2">
                      <TextInput
                        className="w-full"
                        placeholder="User name"
                        defaultValue={queryParams.name}
                        onBlur={(event) =>
                          searchFieldChanged('name', event.target.value)
                        }
                        onKeyPress={(event) => onKeyPress('name', event)}
                      />
                    </th>
                    <th className="px-3 py-2">
                      <TextInput
                        className="w-full"
                        placeholder="Email"
                        defaultValue={queryParams.email}
                        onBlur={(event) =>
                          searchFieldChanged('email', event.target.value)
                        }
                        onKeyPress={(event) => onKeyPress('email', event)}
                      />
                    </th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2 text-white hover:underline">
                        <Link href={route('user.show', user.id)}>
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2">{user.created_at}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route('user.edit', user.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteUser(user)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
