import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss'],
})
export class DailogComponent {
  hide = true;

  passwordForm!: FormGroup;

  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dailogRef: MatDialogRef<DailogComponent>
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      category: ['', Validators.required],
      app: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    console.log(
      '---------------------------------------------->',
      this.editData
    );

    if (this.editData) {
      this.actionButton = 'Update';
      this.passwordForm.controls['category'].setValue(this.editData.category);
      this.passwordForm.controls['app'].setValue(this.editData.app);
      this.passwordForm.controls['userName'].setValue(this.editData.userName);
      this.passwordForm.controls['password'].setValue(this.editData.password);
    }
  }

  addPassword() {
    console.log(this.passwordForm.value);

    if (!this.editData) {
      if (this.passwordForm.valid) {
        this.api.postPassword(this.passwordForm.value).subscribe({
          next: (res) => {
            alert('Password added');
            this.passwordForm.reset();
            this.dailogRef.close('Saved');
          },
          error: () => {
            alert('Error while adding password');
          },
        });
      }
    } else {
      this.updatePassword();
    }
  }

  updatePassword() {
    this.api
      .putPassword(this.passwordForm.value, this.editData.userId)
      .subscribe({
        next: (res) => {
          alert('Password updated');
          this.passwordForm.reset();
          this.dailogRef.close('Updated');
        },
        error: () => {
          alert('Error while updating');
        },
      });
  }
}
