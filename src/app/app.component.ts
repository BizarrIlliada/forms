import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion: 'pet' | 'teacher' = 'pet';
  questionAnswer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };
  submitted = false;

  // constructor(
  //   private formBuilder: FormBuilder
  // ) {}

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signupForm.setValue({
      userData: {
        usernameInput: suggestedName,
        emailInput: 'test@mail.com',
      },
      secretSelect: 'teacher',
      questionAnswer: 'Olena',
      gender: 'female',
    })

    // this.signupForm.form.patchValue({
    //   userData: {
    //     usernameInput: suggestedName,
    //   }
    // })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm);

      this.submitted = true;

      this.user.username = this.signupForm.value.userData.usernameInput;
      this.user.email = this.signupForm.value.userData.emailInput;
      this.user.secretQuestion = this.signupForm.value.secretSelect;
      this.user.answer = this.signupForm.value.questionAnswer;
      this.user.gender = this.signupForm.value.gender;

      this.signupForm.reset();
    } else {
      console.log('Form is invalid!');
    }
  }
}
