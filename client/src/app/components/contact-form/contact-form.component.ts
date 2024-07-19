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
import { ValidationMessageComponent } from "../validation-message.component";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, ValidationMessageComponent],
  templateUrl: "./contact-form.component.html",
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("toast", [
      transition(":enter", [
        style({
          top: "-155px",
        }),
        animate("300ms ease-out"),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("600ms ease-out", style({ opacity: 0 })),
      ]),
    ]),
    trigger("validationMessage", [
      transition(":enter", [style({ opacity: 0 }), animate("300ms ease-out")]),
    ]),
  ],
})
export class ContactFormComponent implements OnDestroy {
  ngForm = viewChild.required(FormGroupDirective);
  #http = inject(HttpClient);

  fg = inject(FormBuilder).group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    query: ["", Validators.required],
    message: ["", Validators.required],
    consent: [false, Validators.requiredTrue],
  });

  isSuccess = signal(false);
  #timeoutId = 0;

  ngOnDestroy(): void {
    window.clearTimeout(this.#timeoutId);
  }

  hasVisibleErrors(control: FormControl, errorCode?: string): boolean {
    const shouldDisplayErrors = this.ngForm().submitted || control.touched;

    return (
      shouldDisplayErrors &&
      (errorCode ? control.hasError(errorCode) : control.invalid)
    );
  }

  onSubmit(): void {
    if (this.ngForm().invalid) return;

    const formData = this.fg.value;
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

  isSubmissionDisabled(): boolean {
    return this.ngForm().submitted && (this.ngForm().invalid ?? false);
  }
}
