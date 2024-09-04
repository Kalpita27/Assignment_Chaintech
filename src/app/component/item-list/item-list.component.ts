import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit{
  items: any[] = [];
  filteredItems: any[] = [];
  sortField = 'login';
  filterField = 'login';
  searchQuery = '';

  filterOptions = [
    { value: 'login', viewValue: 'Login' },
    { value: 'id', viewValue: 'ID' }
  ];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.filteredItems = data;
    });
  }

  sortItems(field: string): void {
    this.sortField = field;
    this.filteredItems.sort((a, b) =>
      a[field].localeCompare(b[field])
    );
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      item[this.filterField].toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
