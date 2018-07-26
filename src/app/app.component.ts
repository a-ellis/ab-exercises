import { Component } from '@angular/core';

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * A possible feature would be to subscribe to the Router from the AppComponent to gain
   * access to page titles in the RouterConfig and pass them along (in this case, to the nav component)
   */
}
