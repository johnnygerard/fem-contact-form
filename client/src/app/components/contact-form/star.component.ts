import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-star",
  standalone: true,
  template: "*",
  host: {
    class: "ml-100 text-green-600",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarComponent {}
