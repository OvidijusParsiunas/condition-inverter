import GithubCornerSVG from '../../static/GithubCornerSVG';
import vscode from '../../static/vscode-logo.png';
import logo from '../../static/github-logo.png';
import './headerLogos.css';

export default function HeaderLogos() {
  return (
    <div>
      <a id="github-corner" href="https://github.com/OvidijusParsiunas/if-inverter">
        {/* <GithubCornerSVG /> */}
      </a>
      <div id="small-logos-container">
        <img id="vscode-logo" src={vscode} alt="Logo" />
        <img id="github-logo" src={logo} alt="Logo" />
      </div>
    </div>
  );
}
