import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import { Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';

export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};

  const sortChange = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction =
        queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }

    router.get(route('task.index'), queryParams);
  };

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('task.index'), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.keyPress !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  };

  const deleteTask = (task) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    router.delete(route('task.destroy', task.id));
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
          {success}
        </div>
      )}
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
              Name
            </TableHeading>
            <TableHeading
              name="status"
              field={queryParams.sort_field}
              direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Status
            </TableHeading>
            <TableHeading
              name="created_at"
              field={queryParams.sort_field}
              direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Create Date
            </TableHeading>
            <TableHeading
              name="due_date"
              field={queryParams.sort_field}
              direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Due Date
            </TableHeading>
            <TableHeading>Created By</TableHeading>
            <TableHeading>Assigned To</TableHeading>
            <TableHeading>Actions</TableHeading>
          </tr>
        </thead>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">
              <TextInput
                className="w-full"
                placeholder="Task name"
                defaultValue={queryParams.name}
                onBlur={(event) =>
                  searchFieldChanged('name', event.target.value)
                }
                onKeyPress={(event) => onKeyPress('name', event)}
              />
            </th>
            <th className="px-3 py-2">
              <SelectInput
                className="w-full"
                defaultValue={queryParams.status}
                onChange={(event) => {
                  searchFieldChanged('status', event.target.value);
                }}
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task) => (
            <tr
              key={task.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <Link
                  href={route('task.show', task.id)}
                  className="hover:underline text-white"
                >
                  <span>{task.name}</span>
                  {!hideProjectColumn && (
                    <span>
                      <br />
                      <strong>Project:</strong> {task.project.name}
                    </span>
                  )}
                </Link>
              </td>
              <td
                className={
                  'px-2 py-1 text-white ' + TASK_STATUS_CLASS_MAP[task.status]
                }
              >
                {TASK_STATUS_TEXT_MAP[task.status]}
              </td>
              <td className="px-3 py-2">{task.created_at}</td>
              <td className="px-3 py-2">{task.due_date}</td>
              <td className="px-3 py-2">{task.createdBy.name}</td>
              <td className="px-3 py-2">{task.assignedUser.name}</td>
              <td className="px-3 py-2">
                <Link
                  href={route('task.edit', task.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTask(task)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
