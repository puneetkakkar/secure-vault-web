import { Spinner } from "@heroui/spinner";

export const LoadingPageSpinner = () => {
  return (
    <div className="flex items-center justify-center mt-16 mx-6 py-4 px-1 sm:px-6 lg:px-8 h-[80vh]">
      <Spinner
        classNames={{ wrapper: "w-24 h-24" }}
        variant="dots"
        color="primary"
      />
    </div>
  );
};
