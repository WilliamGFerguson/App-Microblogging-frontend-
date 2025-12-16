import Swal from "sweetalert2";
import Toastify from 'toastify-js'
//fichier créé par AI

export function toastSuccess(text: string) {
  Toastify({ text, duration: 3000, gravity: "top", position: "right" }).showToast();
}
export function toastError(text: string) {
  Toastify({
    text,
    duration: 4500,
    gravity: "top",
    position: "right",
    backgroundColor: "#ef4444",
  }).showToast();
}
export function toastInfo(text: string) {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#3b82f6",
  }).showToast();
}

export async function confirmDialog(
  title: string,
  text?: string,
  confirmText = "Confirm",
  cancelText = "Cancel"
): Promise<boolean> {
  const res = await Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
  });
  return res.isConfirmed;
}

export async function promptDialog(
  title: string,
  defaultValue = "",
  confirmText = "Save"
): Promise<string | null> {
  const { value } = await Swal.fire({
    title,
    input: "text",
    inputValue: defaultValue,
    showCancelButton: true,
    confirmButtonText: confirmText,
    inputValidator: (v) => (!v?.trim() ? "Required field" : undefined),
  });
  return typeof value === "string" ? value : null;
}
