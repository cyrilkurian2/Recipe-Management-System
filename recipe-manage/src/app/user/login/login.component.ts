import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm: FormGroup;
  is_user = true;  // Temporary mock variable to simulate user authentication

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group<IuseForm>({
      email: new FormControl(
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]
      ),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);

      // Check if is_user is true, then redirect
      if (this.is_user) {
        this.router.navigate(['/home-page']);
      } else {
        alert('Invalid login credentials'); // Replace this with appropriate feedback
      }
    }
  }
}

interface IuseForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
