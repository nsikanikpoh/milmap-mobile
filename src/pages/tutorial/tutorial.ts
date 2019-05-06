import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = false;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: "",
            description: "",
            image: 'assets/imgs/Slide1.jpg',
          },
          {
            title: "Actionaid NG Established the OneMilMapProject ",
            description: "",
            image: 'assets/imgs/Slide2.jpg',
          },
          {
            title: "Actionaid NG Established the OneMilMapProject ",
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/imgs/Slide3.jpg',
          },
          {
            title: "Actionaid NG Established the OneMilMapProject ",
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/imgs/Slide4.jpg',
          },
          {
            title: "Community Sponsorship",
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/imgs/Slide5.jpg',
          }
        ];
      });
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
