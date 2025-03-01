import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, task, projects, users }) {
  const { data, setData, put, errors, reset } = useForm({
    name: task.name || '',
    status: task.status || '',
    priority: task.priority || '',
    description: task.description || '',
    due_date: task.due_date || '',
    project_id: task.project.id || '',
    assigned_user_id: task.assignedUser.id || '',
  });

  const onSubmit = (event) => {
    event.preventDefault();
    put(route('task.update', task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit task: {task.name}
          </h2>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounder-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel htmlFor="project_id" value="Project" />
                <SelectInput
                  id="project_id"
                  name="project_id"
                  className="mt-1 block w-full"
                  onChange={(event) =>
                    setData('project_id', event.target.value)
                  }
                  defaultValue={data.project_id}
                >
                  <option value="">- Select Project -</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />
                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(event) => setData('name', event.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_description"
                  value="Task Description"
                />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(event) =>
                    setData('description', event.target.value)
                  }
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(event) => setData('due_date', event.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />
                <SelectInput
                  id="task_status"
                  name="status"
                  className="mt-1 block w-full"
                  onChange={(event) => setData('status', event.target.value)}
                  defaultValue={data.status}
                >
                  <option value="">- Select status -</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Priority" />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  className="mt-1 block w-full"
                  onChange={(event) => setData('priority', event.target.value)}
                  defaultValue={data.priority}
                >
                  <option value="">- Select priority -</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="assigned_user_id" value="Assigned User" />
                <SelectInput
                  id="assigned_user_id"
                  name="assigned_user_id"
                  className="mt-1 block w-full"
                  onChange={(event) =>
                    setData('assigned_user_id', event.target.value)
                  }
                  defaultValue={data.assigned_user_id}
                >
                  <option value="">- Select user -</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route('task.index')}
                  className="bg-gray-100 py-1 px-3 rounded shadow transition-all text-gray-800 hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
