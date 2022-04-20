import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ],
  styleUrls: ['./date-picker.component.scss']
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() label: string;
  @Input() subLabel: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() formControlName: string;
  @Input() initialVal: string = '';
  @Input() icon: string = 'event';
  @Input() img_icon: string = '/assets/images/icons/calendar-input-icon.png';
  @Input() info: boolean = false;
  @Input() infoTitle: string = 'Your title here';
  @Input() maxDate: any = null;
  @Input() minDate: any = null;
  @Input() labelTop: boolean = false;

  @ViewChild('picker') picker: any;
  isTouched:boolean = false;

  control: AbstractControl;

  onChange: (value: any) => {};
  onTouched: () => {};

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
  ) { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onTouch(event: any){
    if(this.required && !event.target.value){
      this.isTouched = true;
    } else {
      this.isTouched = false;
    }
  }

  writeValue(value: any) {
    this.initialVal = value;
    this.keyevents.emit(value);
    this.control.updateValueAndValidity();
  }

  onValueChanged(event: any){
    this.writeValue(event.target.value);
    this.onChange(event.target.value);
  }

  ngOnInit(): void {
    this.control = this.formControlName ? this.controlContainer?.control.get(this.formControlName) : this.controlContainer?.control;
  }

}
