import {Component, OnInit} from '@angular/core';
import {CityService} from '../services/city.service';
import {Page} from "../model/page";
import {City} from "../model/city";
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page = new Page();
  rows = new Array<City>();
  ColumnMode = ColumnMode;
  searchText: any;

  constructor(private userService: CityService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.setPage({offset: 0});
    this.userService.findAll(this.page).subscribe(
      data => {
        this.rows = data.body;
      }
    );
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.userService.findAll(this.page).subscribe(response => {
      this.rows = response.body;
      this.page.totalElements = response.headers.get('X-Total-Count');
    });
  }

  search() {
    if (this.searchText.length == 0) {
      this.userService.findAll(this.page).subscribe(response => {
        this.rows = response.body;
        this.page.totalElements = response.headers.get('X-Total-Count');
      });
    } else {
      this.userService.findByName(this.page, this.searchText).subscribe(response => {
        this.rows = response.body;
        this.page.totalElements = response.headers.get('X-Total-Count');
      });
    }
  }
}
