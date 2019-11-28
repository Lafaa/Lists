import { Directive, Renderer, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSelfFocus]'
})
export class SelfFocusDirective {
  @Input('appSelfFocus') active = true;
  constructor(public renderer: Renderer, public elementRef: ElementRef) { }

  ngOnInit() {
    if (this.active)
      this.elementRef.nativeElement.focus();
  }

}
