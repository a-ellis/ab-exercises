import { Component, Input } from '@angular/core';

@Component({
  selector: 'ab-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() pageTitle: string;

  /**
   * Having separate template and style files for a component of this size certainly isn't necessary.
   * Generally speaking, a component such as this would have a lot more going on that would warrant the separation of concerns.
   */
}
