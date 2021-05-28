import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { ProductCategory } from '../../common/product-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: ProductCategory[];

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.connectionService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

}
