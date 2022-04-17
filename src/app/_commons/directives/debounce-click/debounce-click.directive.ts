import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[debounce-click]'
})
export class DebounceClickDirectivce implements OnInit, OnDestroy  {
  @Input() debounceTime = 400;
  @Output() dClick = new EventEmitter();
  private clicks = new Subject();

  private stop$ = new Subject();

  constructor() { }
  ngOnInit() {
    this.clicks.pipe(
      takeUntil(this.stop$),
      debounceTime(this.debounceTime)
    ).subscribe(e => this.dClick.emit(e));
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);

  }
}





// <button debounce-click (dclick)="log()" [debounceTime]="700">Debounced Click</button>
