import GithubCornerSVG from '../../static/GithubCornerSVG';
import vscodeLogo from '../../static/vscode-logo.png';
import githubLogo from '../../static/github-logo.png';
import './headerLogos.css';

export default function HeaderLogos() {
  return (
    <div>
      <a id="github-corner" className="logo" href="https://github.com/OvidijusParsiunas/if-inverter" target="_blank" rel="noreferrer">
        {/* <GithubCornerSVG /> */}
      </a>
      <div id="small-logos-container">
        <a href="https://github.com/OvidijusParsiunas/if-inverter" target="_blank" rel="noreferrer">
          <img id="vscode-logo" className="logo" src={vscodeLogo} alt="VSCode logo" />
        </a>
        <a href="https://github.com/OvidijusParsiunas/if-inverter" target="_blank" rel="noreferrer">
          <img id="github-logo" className="logo" src={githubLogo} alt="GitHub logo" />
        </a>
      </div>
    </div>
  );
}
