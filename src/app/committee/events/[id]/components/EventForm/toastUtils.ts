import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Id, toast } from "react-toastify";

type UpdateToastT = {
  responseBody: {
    message: string;
    id?: number;
  };
  status: number;
  redirectUrl: string;
  setBlockSubmit: Dispatch<SetStateAction<boolean>>;
  ref: MutableRefObject<Id | null>;
  router: AppRouterInstance;
};

export function updateToast({
  responseBody,
  status,
  redirectUrl,
  setBlockSubmit,
  ref,
  router,
}: UpdateToastT) {
  let toastType = toast.TYPE.INFO;

  switch (status) {
    case 200:
      toastType = toast.TYPE.SUCCESS;
      break;
    case 500:
    default:
      toastType = toast.TYPE.ERROR;
      break;
  }

  if (ref.current) {
    toast.update(ref.current, {
      type: toastType,
      render: responseBody.message,
      autoClose: 5000,
      isLoading: false,
    });

    toast.onChange((payload) => {
      if (payload.status === "removed" && payload.id == ref.current) {
        if (payload.type === toast.TYPE.SUCCESS) {
          router.push(redirectUrl);
        }
        setBlockSubmit(false);
      }
    });
  }
}

export function updateGeneralErrorToast(ref: MutableRefObject<Id | null>) {
  if (ref.current) {
    toast.update(ref.current, {
      type: toast.TYPE.ERROR,
      render: "Something went wrong",
      autoClose: 5000,
      isLoading: false,
    });
  }
}
