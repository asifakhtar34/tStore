import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output () filterValues = new EventEmitter<any>();
  filterTshirt!: UntypedFormGroup;
  colours: Array<string> = ['Red', 'Green', 'Blue'];
  gender: Array<string> = ['Men', 'Woman'];
  prices: Array<any> = [
    { displayName: '0 - Rs 250', value: [0, 250] },
    { displayName: 'Rs 251 - Rs 450', value: [251, 450] },
    { displayName: 'Rs 450', value: [450, 450] },
  ];
  types: Array<string> = ['Polo', 'Hoodie', 'Basic'];

  constructor(private fb: UntypedFormBuilder) {
    this.filterTshirt = this.fb.group({
      colour: this.fb.array([]),
      gender: this.fb.array([]),
      price: this.fb.array([]),
      type: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  onChange(event: Event, formArrayName: string, value: any){
    let isChecked = (<HTMLInputElement>event.target).checked;
    let formControl = <UntypedFormArray>this.filterTshirt.controls[formArrayName];
    if(isChecked){
      formControl.push(new UntypedFormControl(value));
    } else {
      let index = formControl.controls.findIndex((x) => x.value == value);
      formControl.removeAt(index);
    }
    console.log(this.filterTshirt.value)
    this.filterValues.emit(this.filterTshirt.value)
  }

  reset(){
    this.filterTshirt.reset();
    ['colour', 'gender', 'price', 'type'].forEach(control=>{
      let fC = <FormArray<any>>this.filterTshirt.controls[control]
      this.filterTshirt.controls[control].value.forEach((val: string) => {
        let index = fC.controls.findIndex((x:any) => x.value == val);
        fC.removeAt(index);
      });

    })
    console.log(this.filterTshirt.value)
    this.filterValues.emit(this.filterTshirt.value)
  }
}
