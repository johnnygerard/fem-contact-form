import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: "./contact-form.component.html",
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent implements OnDestroy {
  ngForm = viewChild.required(FormGroupDirective);
  #http = inject(HttpClient);

  formControls = inject(FormBuilder).group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    query: ["", Validators.required],
    message: ["", Validators.required],
    consent: [false, Validators.requiredTrue],
  });

  readonly REQUIRED_ERROR_MSG = "This field is required";
  isSuccess = signal(false);
  #timeoutId = 0;

  ngOnDestroy(): void {
    window.clearTimeout(this.#timeoutId);
  }

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

    const formData = this.formControls.value;
    const payload = {
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      email: formData.email as string,
      query: parseInt(formData.query as string),
      message: formData.message as string,
    };

    this.#http
      .post<{
        publicUrl: string;
      }>("/api/contact-us", payload)
      .subscribe((response) => {
        window.console.log("Message sent:", response.publicUrl);
        this.isSuccess.set(true);
        this.ngForm().resetForm();

        const TTL = 5000;
        this.#timeoutId = window.setTimeout(() => {
          this.isSuccess.set(false);
        }, TTL);
      });
  }
}
