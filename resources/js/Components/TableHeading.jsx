import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function TableHeading({
  name = null,
  field,
  direction,
  children,
  sortChange = () => {},
}) {
  return (
    <th onClick={(e) => sortChange(name)} className="px-3 py-2">
      <div
        className={
          'flex items-center justify-between gap-1 ' +
          (name ? 'cursor-pointer' : '')
        }
      >
        <div className={field === name ? 'text-white' : ''}>{children}</div>
        {name && (
          <div>
            <ChevronUpIcon
              className={
                'w-4 ' +
                (field === name && direction === 'asc' ? 'text-white' : '')
              }
            />
            <ChevronDownIcon
              className={
                'w-4 -mt-2 ' +
                (field === name && direction === 'desc' ? 'text-white' : '')
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
