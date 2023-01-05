import { MutableRefObject, useCallback, useEffect } from "react";

interface Props {
  targetRef: MutableRefObject<null | HTMLElement>;
  buttonRef: MutableRefObject<null | HTMLElement>;
  onClick: () => void;
}

export const useClickAway = ({ targetRef, buttonRef, onClick }: Props) => {
  const hadleClickEvent = useCallback(
    (e) => {
      if (!targetRef || !buttonRef) return;
      const { current: targetEl } = targetRef;
      const { current: buttonEl } = buttonRef;
      targetEl &&
        buttonEl &&
        !targetEl.contains(e.target) &&
        !buttonEl.contains(e.target) &&
        onClick();
    },
    [buttonRef, onClick, targetRef]
  );

  useEffect(() => {
    window.addEventListener("click", hadleClickEvent);

    return () => {
      window.removeEventListener("click", hadleClickEvent);
    };
  }, [hadleClickEvent]);
};
