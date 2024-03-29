import { GITHUB_REPO_URL, VS_CODE_MARKETPLACE_URL } from '../../../shared/consts/externalURLs';
// import GithubCornerSVG from '../../../static/GithubCornerSVG';
import vscodeLogo from '../../../static/vscode-logo.png';
import githubLogo from '../../../static/github-logo.png';
import './logos.css';

export default function Logos() {
  return (
    <div>
      <a id="github-corner" className="logo" href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
        {/* <GithubCornerSVG /> */}
      </a>
      <div id="small-logos-container">
        <a href={VS_CODE_MARKETPLACE_URL} target="_blank" rel="noreferrer">
          <img id="vscode-logo" className="logo" src={vscodeLogo} alt="VSCode logo" />
        </a>
        <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
          <img id="github-logo" className="logo" src={githubLogo} alt="GitHub logo" />
        </a>
      </div>
    </div>
  );
}
