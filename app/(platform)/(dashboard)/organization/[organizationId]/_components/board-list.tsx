import { Hint } from "@/components/hint";
import { HelpCircle, PlusCircle, User2 } from "lucide-react";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-neutral-700 text-lg">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-3 items-center justify-center hover:opacity-75 transition"
        >
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs">Create new board</span>
          <Hint
            description={`Free workspaces can have upto 5 open boards. For unlimited boards, upgrade this workspace.`}
            sideOffset={40}
          >
            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
      </div>
    </div>
  );
};
