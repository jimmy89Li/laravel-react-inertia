import TableHeading from '@/Components/TableHeading';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
  auth,
  myTasks,
  totalPendingTasks,
  myPendingTasks,
  totalInProgressTasks,
  myInProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-amber-500 font-semibold text-2xl">
                Pending tasks
              </h3>
              <p className="mt-4 text-xl">
                <span>{myPendingTasks}</span>
                <span> / </span>
                <span>{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 font-semibold text-2xl">
                In Progress tasks
              </h3>
              <p className="mt-4 text-xl">
                <span>{myInProgressTasks}</span>
                <span> / </span>
                <span>{totalInProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-green-500 font-semibold text-2xl">
                Completed tasks
              </h3>
              <p className="mt-4 text-xl">
                <span>{myCompletedTasks}</span>
                <span> / </span>
                <span>{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-bold">My active tasks</h3>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <TableHeading id="id">ID</TableHeading>
                    <TableHeading id="name">Name</TableHeading>
                    <TableHeading id="name">Project name</TableHeading>
                    <TableHeading id="name">Status</TableHeading>
                    <TableHeading id="name">Due Date</TableHeading>
                  </tr>
                </thead>
                <tbody>
                  {myTasks.data.map((task) => (
                    <tr key={task.id}>
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route('task.show', task.id)}
                          className="text-white hover:underline"
                        >
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          href={route('project.show', task.project.id)}
                          className="text-white hover:underline"
                        >
                          {task.project.name}
                        </Link>
                      </td>
                      <td
                        className={
                          'px-2 py-1 text-white ' +
                          TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </td>
                      <td className="px-3 py-2">{task.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
