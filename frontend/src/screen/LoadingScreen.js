import "../Styles/laoding.css";

function LoadingScreen() {
  return (
    <div className="body-spiner">
      <div class="cs-loader">
        <div class="cs-loader-inner">
          <label>●</label>
          <label>●</label>
          <label>●</label>
          <label>●</label>
          <label>●</label>
          <label>●</label>
        </div>
      </div>
    </div>
  );
  // return <div className="loading-box">LoadingScreen .....</div>;
}
export default LoadingScreen;
