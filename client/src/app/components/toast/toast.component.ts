import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SvgCheckmarkComponent } from "../svg-checkmark/svg-checkmark.component";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [SvgCheckmarkComponent],
  templateUrl: "./toast.component.html",
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {}
