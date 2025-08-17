import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader, Plus } from "lucide-react";
import React from "react";

type SubmitButtonProps = {
  title: string;
  type?: string
  loadingTitle?: string;
  className?: string;
  loaderIcon?: any;
  buttonIcon?: any;
  loading?: boolean;
  showIcon: boolean;
};

const SubmitButton = ({
  title,
  loadingTitle,
  className,
  loaderIcon,
  buttonIcon,
  loading,
  showIcon
}: SubmitButtonProps) => {
  return (
    <Button
      title={title}
      className={cn(className)}
    >
      {loading ? (
        <>
          {loaderIcon ? loaderIcon : <Loader className="animate-spin" />}
          {loadingTitle ? loadingTitle : title}
        </>
      ) : (
        <>
          {showIcon && buttonIcon}  
          {title}
        </>
      )}
    </Button>
  );
}

export default SubmitButton