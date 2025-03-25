"use client";

import { useEffect } from "react";
import NextError from "next/error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    // <div>
    //   <h2>Something went wrong!</h2>
    //   <button onClick={() => reset()}>Try again</button>
    // </div>
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={200} />
      </body>
    </html>
  );
}
