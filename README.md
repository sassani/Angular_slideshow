# Angular_slideshow
Lightweight Image Slider - Using Angular Animation

Instruction:
1- Add libraries to the app.module.ts :
	
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
	
	import { SlideshowComponent } from './slideshow/slideshow.component';
	import { PrintslideComponent, SafeHtmlPipe, ImageObj } from './slideshow/printslide/printslide.component';
	
	@NgModule({
	  declarations: [
		//...
		SlideshowComponent,
		PrintslideComponent,
		SafeHtmlPipe,
		//...
	  ],
	  imports: [
		//...
		BrowserAnimationsModule,
		//...
	  ],//...
	})
	
2-Using slider like this:
	a-	In .ts file (example: home.component.ts) prepare a list of image with title and subtitle. (If you don't have title or subtitle for your image, don't worry! This component handles it automatically).
				slides = [   
					{
					  imgSrc: "assets/home-images/jpg/baner1.jpg",
					  title:"Persian Rugs1",
					  subTitle:"Persian Rugs1",
					  state:"inactive"
					},
					{
					  imgSrc: "assets/home-images/jpg/baner2.jpg",
					  title:"Persian Rugs2",
					  state:"inactive"
					},
					{
					  imgSrc: "assets/home-images/jpg/baner3.jpg",
					  title:"Persian Rugs3",
					  state:"inactive"
					},
					{
					  imgSrc: "assets/home-images/jpg/baner4.jpg",
					  state:"inactive"
					},
				  ];

	b-	In .html file (example: home.component.html) use the slideshow like this:
				<div >
					<slideshow  [playInterval]="5000" [showArrows]="true" [slides]="slides"></slideshow>
				</div>
				
			Configuration:
			- playInterval (ms): Slideshow interval in milliseconds. If set to 0, slideshow will pause at slide #1
			- showArrows: for displaying Arrow keys
			- slides: an array of images data
					slide {
						imgSrc: string,
						title: string,
						subTitle: string
						state:"inactive"
						}

	

