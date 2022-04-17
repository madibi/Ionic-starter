import { OnInit, ElementRef, Renderer2, Input, Directive } from '@angular/core';

@Directive({ selector: '[focuMe]' })
export class FocusMeDirective implements OnInit {

    @Input('focuMe') isFocused: boolean;

    constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        if (this.isFocused) {
            this.hostElement.nativeElement.focus();
        }
    }
}

// http://www.angulartutorial.net/2018/03/angular-autofocus-for-input-box-angular.html
