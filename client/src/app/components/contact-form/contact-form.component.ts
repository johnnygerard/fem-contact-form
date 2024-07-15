import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./contact-form.component.html",
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  ngForm = viewChild.required(FormGroupDirective);

  formControls = inject(FormBuilder).group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    query: ["", Validators.required],
    message: ["", Validators.required],
    consent: [false, Validators.requiredTrue],
  });

  readonly REQUIRED_ERROR_MSG = "This field is required";

  hasEmailError(): boolean {
    const control = this.formControls.controls.email;
    return control.hasError("email") && this.#shouldDisplayError(control);
  }

  hasRequiredError(control: FormControl): boolean {
    return control.hasError("required") && this.#shouldDisplayError(control);
  }

  #shouldDisplayError(control: FormControl): boolean {
    return control.touched || this.ngForm().submitted;
  }

  onSubmit(): void {
    if (this.ngForm().invalid) return;
  }
}
