import "./ProgressBar.css";
export default function ProgressBar() {
  return (
    <div className="progress" aria-hidden="true">
      <div className="progress__bar" id="progressBar" />
    </div>
  );
}
