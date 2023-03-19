import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"];

function Container({ class: _class = "", ...props }: Props) {
  return (
    <div class={`max-w-[1920px] mx-auto lg:px-[112px] ${_class}`} {...props} />
  );
}

export default Container;
