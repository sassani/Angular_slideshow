import { Router, NavigationStart, NavigationEnd, ResolveEnd } from '@angular/router';
import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser'
import { Pipe, Component, Input, PipeTransform, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from "@angular/core";


@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer, router: Router) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

export interface ImageObj {
  height: number;
  width: number;
};

@Component({
  selector: "printslide",
  styleUrls: ['./printslide.component.css'],
  template: `
    <body 
    (window:resize)=reShape() 
    (window:load)=reShape()>
      <div id="container">  
        <img id="image" #imageElement [src]="meta.imgSrc"/>
        <h2 
        id="title"
        *ngIf="meta.title"
        [ngStyle]="txtStyle">{{meta.title}}
          <br/>
          <h3 id="sub-title"
          *ngIf="meta.subTitle">{{meta.subTitle}}</h3>
        </h2> 
      </div> 
    </body>                
`
})
export class PrintslideComponent implements AfterViewInit {

  @ViewChild('imageElement') imageElement: ElementRef;
  @Input("meta") meta: {
    imgSrc: string,
    title: string,
    subTitle: string
  };

  @Output() imageSize: EventEmitter<ImageObj> = new EventEmitter<ImageObj>(true);


  txtStyle = {
    'top': '0px'
  }
  constructor() { }

  ngAfterViewInit() {
    this.reShape();
  }

  reShape() {
    var newImage: ImageObj;
    newImage = {
      height: this.imageElement.nativeElement.height,
      width: this.imageElement.nativeElement.width
    }
    //pass image size to the parent (slideshow.component)...
    this.imageSize.emit(newImage);
    //offset the title from top...
    this.txtStyle.top = newImage.height * 0.1 + "px";
  }

}

