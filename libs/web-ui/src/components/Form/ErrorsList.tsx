import { TriangleAlertIcon } from "@workspace/web-ui/components/Icons";

export const FormErrorsList = ({ errors }: { errors: string[] }) => (
  <>
    {errors.length > 0 && (
      <ul className="flex flex-col gap-y-2">
        {errors.map((error, i) => (
          <li
            key={i}
            className="flex flex-row items-center gap-x-2 text-sm text-red-500"
          >
            <TriangleAlertIcon className="size-4" />
            <span>{error}</span>
          </li>
        ))}
      </ul>
    )}
  </>
);
