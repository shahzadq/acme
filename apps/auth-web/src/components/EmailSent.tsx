import { MailSearchIcon } from "@workspace/web-ui/components/Icons";

export const EmailSent = ({ email }: { email: string }) => (
  <div className="flex flex-col gap-y-4 rounded-lg border border-blue-500 bg-blue-500/5 p-8 text-sm">
    <MailSearchIcon className="text-blue-500" />
    <div className="flex flex-col gap-y-1">
      <span>
        We've sent a temporary link to <b className="text-blue-500">{email}</b>.
        Click it to continue.
      </span>
    </div>
    <span className="w-3/4 text-xs opacity-75">
      Remember to check your spam folder. You can close this page now.
    </span>
  </div>
);
