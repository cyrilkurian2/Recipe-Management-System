
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RecipeService} from '../../recipe.service'; // Adjust the import according to your service's path
import { Router, RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: RecipeService, private router: Router) {
    this.userForm = this.fb.group<IuseForm>({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),
      confrimPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
       // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { fullName, email, password } = this.userForm.value;
      
      // Create user object for API
      const userData = {
        name: fullName,
        email: email,
        password: password
      };

      // Call addUser method from the UserService
      this.userService.addUser(userData).subscribe({
        next: (response: any) => {
          console.log('User registered successfully:', response);
          alert("User registered successfully");
          
          // Handle successful registration (e.g., navigate to login, show success message)
          this.router.navigate(['user/login']);
        },
        error: (error: any) => {
          console.error('Error during registration:', error);
          // Handle error (e.g., show error message)
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

interface IuseForm {
  fullName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confrimPassword: FormControl<string | null>;
}