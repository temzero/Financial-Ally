// icon:bike | Lucide https://lucide.dev/ | Lucide
import * as React from "react";

function IconBike(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M22 17.5 A3.5 3.5 0 0 1 18.5 21 A3.5 3.5 0 0 1 15 17.5 A3.5 3.5 0 0 1 22 17.5 z" />
      <path d="M9 17.5 A3.5 3.5 0 0 1 5.5 21 A3.5 3.5 0 0 1 2 17.5 A3.5 3.5 0 0 1 9 17.5 z" />
      <path d="M16 5 A1 1 0 0 1 15 6 A1 1 0 0 1 14 5 A1 1 0 0 1 16 5 z" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  );
}

export default IconBike;
