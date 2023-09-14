import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'attack helicopter', 'toad', ];
  signupForm: FormGroup;
  forbiddenUsername = ['Chris', 'Anna'];

  get hobbiesControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        age: new FormControl(null, [Validators.required, Validators.min(16)]),
        usernameInput: new FormControl(null, [Validators.minLength(2), Validators.required, this.forbiddenNamesValidator.bind(this)]),
        emailInput: new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmailsValidator),
      }),
      gender: new FormControl('toad'),
      hobbies: new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    })
  }
  
  onAddHobby() {
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }

  onSubmit() {
    console.log(this.signupForm);

    this.signupForm.reset();
  }

  forbiddenNamesValidator(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUsername.includes(control.value?.trim())) {
      return {
        forbiddenUsername: true,
      }
    } else {
      return null;
    }
  }

  forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null)
        }
      }, 3000);
    })
  }

  onSetForm() {
    this.signupForm.setValue({
      userData: {
        age: 18,
        usernameInput: 'Anna',
        emailInput: 'test@email.com',
      },

      gender: 'attack helicopter',
      hobbies: []
    })
  }

  onPatchForm() {
    this.signupForm.patchValue({
      hobbies: [],
      userData: {
        usernameInput: 'Chris',
      }
    })
  }
}
