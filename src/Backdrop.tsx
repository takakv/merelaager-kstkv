import "./Backdrop.scss";

interface BackdropProps {
  isDimmed: boolean;
}

const Backdrop = ({ isDimmed }: BackdropProps) => {
  const classList = ["Backdrop"];
  if (isDimmed) classList.push("is-dimmed");

  return <div className={classList.join(" ")} />;
};

export default Backdrop;
