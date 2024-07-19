import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SvgCheckmarkComponent } from "../svg-checkmark/svg-checkmark.component";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [SvgCheckmarkComponent],
  templateUrl: "./toast.component.html",
  host: {
    class:
      "top-300 p-300 fixed left-1/2 w-[328px] -translate-x-1/2 rounded-md bg-gray-900 md:w-[450px]",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {}
