import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../recipe.service'; // Adjust the import according to your service's path
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: RecipeService) {
    this.userForm = this.fb.group<IuseForm>({
      email: new FormControl(
        '',
        [Validators.required, ]
      ),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
    
      // Call the login method from the UserService
      this.userService.login({ email, password }).subscribe({
        next: (response) => {
          const userId = response.userId; // Assuming the API returns userId on successful login
          console.log('User logged in successfully:', userId);
          
          this.router.navigate(['/home-page']);
          console.log(this.userService.userId);
          console.log("Hi123") // Redirect on successful login
        },
        error: (error) => {
          console.error('Error during login:', error);
          alert('Invalid login credentials'); // Display error message for invalid login
        }
      });
    }
  }
}

interface IuseForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
