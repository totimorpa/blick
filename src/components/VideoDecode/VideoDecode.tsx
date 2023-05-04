import { BarcodeScanner } from "dynamsoft-javascript-barcode";
import React from "react";
import "./VideoDecode.css";

let overlay: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

function initOverlay(ol: HTMLCanvasElement): void {
  overlay = ol;
  context = overlay.getContext("2d");
}

function updateOverlay(width: number, height: number): void {
  if (overlay) {
    overlay.width = width;
    overlay.height = height;
    clearOverlay();
  }
}

function clearOverlay(): void {
  if (context) {
    context.clearRect(0, 0, 10000, 10000);
    context.strokeStyle = "#ff0000";
    context.lineWidth = 5;
  }
}

function drawOverlay(
  localization: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    x4: number;
    y4: number;
  },
  text: string
): void {
  if (context) {
    context.beginPath();
    context.moveTo(localization.x1, localization.y1);
    context.lineTo(localization.x2, localization.y2);
    context.lineTo(localization.x3, localization.y3);
    context.lineTo(localization.x4, localization.y4);
    context.lineTo(localization.x1, localization.y1);
    context.stroke();

    context.font = "18px Verdana";
    context.fillStyle = "#ff0000";
    let x: number[] = [
      localization.x1,
      localization.x2,
      localization.x3,
      localization.x4,
    ];
    let y: number[] = [
      localization.y1,
      localization.y2,
      localization.y3,
      localization.y4,
    ];
    x.sort(function (a: number, b: number): number {
      return a - b;
    });
    y.sort(function (a: number, b: number): number {
      return b - a;
    });
    let left = x[0];
    let top = y[0];
    context.fillText(text, left, top + 50);
  }
}

class VideoDecode extends React.Component {
  pScanner: Promise<BarcodeScanner> | null = null;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  async componentDidMount() {
    try {
      await BarcodeScanner.loadWasm();
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      // Should judge if scanner is destroyed after 'await', as in development React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (scanner.isContextDestroyed()) return;
      await scanner.setUIElement(this.elRef.current!);
      // Should judge if scanner is destroyed after 'await', as in development React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (scanner.isContextDestroyed()) return;
      scanner.onFrameRead = (results) => {
        for (let result of results) {
          console.log(result.barcodeText);
        }
      };

      await scanner.open();
    } catch (ex: any) {
      if (ex.message.indexOf("network connection error")) {
        let customMsg =
          "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        console.log(customMsg);
        alert(customMsg);
      }
      throw ex;
    }
  }
  async componentWillUnmount() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      console.log("BarcodeScanner Component Unmount");
    }
  }
  shouldComponentUpdate() {
    // Never update UI after mount, dbrjs sdk use native way to bind event, update will remove it.
    return false;
  }
  render() {
    return (
      <div ref={this.elRef} className="component-barcode-scanner">
        <svg className="dce-bg-loading" viewBox="0 0 1792 1792">
          <path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"></path>
        </svg>
        <svg className="dce-bg-camera" viewBox="0 0 2048 1792">
          <path d="M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"></path>
        </svg>
        <div id="videoview">
          <div className="dce-video-container" id="videoContainer"></div>
          <canvas id="overlay"></canvas>
        </div>
        <div className="dce-scanarea"></div>
        <div className="div-select-container">
          <select className="dce-sel-camera"></select>
          <select className="dce-sel-resolution"></select>
        </div>
      </div>
    );
  }
}

export default VideoDecode;
