import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StartLiveSessionPayload = {
  pastorName: string;
  title: string;
  visibility: "PUBLIC" | "PRIVATE";
  originalLanguage: string;
};

type StartLiveSessionDialogProps = {
  open: boolean;
  onClose: () => void;
  onStartLive: (payload: StartLiveSessionPayload) => void;
  isSubmitting?: boolean;
};

const StartLiveSessionDialog = ({
  open,
  onClose,
  onStartLive,
  isSubmitting = false,
}: StartLiveSessionDialogProps) => {
  const [pastorName, setPastorName] = useState("");
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [originalLanguage, setOriginalLanguage] = useState("en");

  const canSubmit =
    pastorName.trim() !== "" && title.trim() !== "" && originalLanguage !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;

    onStartLive({
      pastorName,
      title,
      visibility,
      originalLanguage,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40" />
        <DialogContent className="max-w-md w-full p-0 border-0 rounded-sm overflow-hidden">
          <DialogTitle className="sr-only">Start Live Sermon</DialogTitle>
          <DialogDescription className="sr-only">
            Enter sermon information to start a live session
          </DialogDescription>

          <div className="flex flex-col gap-4 p-5">
            <h2 className="text-lg font-semibold">Start Live Sermon</h2>

            {/* Pastor Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Pastor Name</label>
              <Input
                placeholder="e.g. Pastor Justin"
                value={pastorName}
                onChange={(e) => setPastorName(e.target.value)}
              />
            </div>

            {/* Sermon Title */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Sermon Title</label>
              <Input
                placeholder="e.g. Sunday Worship"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Visibility */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium">Visibility</label>
                <Select
                  value={visibility}
                  onValueChange={(v) =>
                    setVisibility(v as "PUBLIC" | "PRIVATE")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium">Original Language</label>
                <Select
                  value={originalLanguage}
                  onValueChange={setOriginalLanguage}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">Korean</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Starting..." : "Start Live"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default StartLiveSessionDialog;
