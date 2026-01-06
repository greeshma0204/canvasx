function Header({ onExport }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>CanvasX</h1>
        <p>Visual Web Builder Studio</p>
      </div>

      <div className="header-actions">
        <button className="top-export" onClick={onExport}>Export</button>
      </div>
    </header>
  );
}

export default Header;