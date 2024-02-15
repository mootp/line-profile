import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'line-profile';
  userProfile: any;

  constructor() {}

  ngOnInit(): void {
    this.initializeLineLiff();
  }
  async initializeLineLiff() {
    try {
      await liff.init({ liffId: '2003513662-WeVykQzK' });
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        this.getUserProfile();
      }
    } catch (err) {
      console.error('LIFF initialization failed', err);
    }
  }

  async getUserProfile() {
    try {
      const profile = await liff.getProfile();
      this.userProfile = {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
        email: liff.getDecodedIDToken()?.email,
      }
    } catch (err) {
      console.error('Error getting user profile', err);
    }
  }
}
