import { useEffect, useState } from "react";
export default function ErrorToast({ message }: { message: string | null }) {
  const [show, setShow] = useState(!!message);
  useEffect(() => setShow(!!message), [message]);
  if (!show || !message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow">{message}</div>
    </div>
  );
}
