import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'ws-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search = input<string>();
  searchChange = output<string>();

  suche = model.required<string>();
  searchStr = '';
}
