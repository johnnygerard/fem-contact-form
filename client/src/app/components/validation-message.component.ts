import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-validation-message",
  standalone: true,
  template: `{{ content() }}`,
  host: {
    class: "block text-red",
    "@fadeIn": "",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {
  content = input("This field is required");
}
