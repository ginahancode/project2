import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(passValue: string, matchingPassValue: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[passValue];
        const matchingPw = formGroup.controls[matchingPassValue];

        if (matchingPw.errors && !matchingPw.errors.confirmedvalidator) {
            matchingPw.setErrors({ confirmedvalidator: true});
        } else {
            matchingPw.setErrors(null);
        }
    }
}