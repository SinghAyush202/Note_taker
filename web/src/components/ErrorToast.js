import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function ErrorToast({ message }) {
    const [show, setShow] = useState(!!message);
    useEffect(() => setShow(!!message), [message]);
    if (!show || !message)
        return null;
    return (_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50", children: _jsx("div", { className: "bg-red-600 text-white px-4 py-2 rounded-lg shadow", children: message }) }));
}
