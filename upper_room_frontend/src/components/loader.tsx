import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LoaderProps {
  isLoadingDialogOpen: boolean;
  loaderMessage: string;
}

const Loader: React.FC<LoaderProps> = ({
  isLoadingDialogOpen,
  loaderMessage,
}) => {
  return (
    <Dialog open={isLoadingDialogOpen}>
      <DialogContent className="sm:max-w-sm text-center">
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="w-8 h-8 border-4 border-primary-100 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">{loaderMessage}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loader;
