import { Routes } from "@angular/router";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ContactFormComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];
