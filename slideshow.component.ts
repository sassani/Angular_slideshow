import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ImageObj } from "./printslide/printslide.component";



@Component({
    selector: 'slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.css'],
    animations: [
        trigger('showContent', [
            state('inactive', style({
                opacity: 0,
                transform: 'translateX(-15%)'
            })),
            state('active', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            transition('inactive => active', animate('750ms ease-in')),
            transition('active => inactive', animate('1000ms ease-out'))
        ])
    ]
})
export class SlideshowComponent {
    slides: any;
    autoPlay: boolean = true;
    showArrows: boolean = true;
    currentElement: number = 0;
    slidesNumber: number = 0;
    intervalTime: number = 5000;
    intervalId: number = 0; 
    sliderSize:ImageObj;

    @Input('playInterval') set _intervalTime(ms: number) {
        if (ms == 0) {
            this.autoPlay = false;
        } else {
            this.autoPlay = true;
            this.intervalTime = ms;
            this.auto(this.intervalTime);
        }
    }
    
    @Input("slides") set _slides(s) {
        this.slides = s;
        this.slidesNumber = s.length;
        if (s.length)
            this.slides[0].state = "active";
    }

    @Input('showArrows') set _showArrows(b: boolean) {
        this.showArrows = b
    }

    constructor() {

     }
onload(){
    this.fillerStyles.height = this.sliderSize.height + 'px';
    this.fillerStyles.width = this.sliderSize.width + 'px';
}

    fillerStyles = {
        height: '0px',
        width: '0px'
    }
    
    setFillerStyle(imageSize) {
        if(imageSize){
        this.sliderSize = imageSize;
        this.fillerStyles.height = this.sliderSize.height + 'px';
        this.fillerStyles.width = imageSize.width + 'px';
        }
    }


    prev() {
        if (this.autoPlay) clearInterval(this.intervalId);
        this.backward();
        if (this.autoPlay) this.auto(this.intervalTime);
    }
    next() {
        if (this.autoPlay) clearInterval(this.intervalId);
        this.forWard();
        if (this.autoPlay) this.auto(this.intervalTime);
    }

    private backward() {
        this.currentElement = this.currentElement - 1;
        if (this.currentElement < 0) this.currentElement = this.slidesNumber - 1;
        var prev = this.currentElement == this.slidesNumber - 1 ? 0 : this.currentElement + 1;
        this.slides[prev].state = "inactive";
        this.slides[this.currentElement].state = "active";
    }

    private forWard() {
        this.currentElement = 1 + this.currentElement;
        if (this.currentElement >= this.slidesNumber) this.currentElement = 0;
        var prev = this.currentElement == 0 ? this.slidesNumber - 1 : this.currentElement - 1;
        this.slides[prev].state = "inactive";
        this.slides[this.currentElement].state = "active";
    }

    auto(ms) {
        this.autoPlay = true;
        this.intervalId = setInterval(this.forWard.bind(this), ms);
    }

}